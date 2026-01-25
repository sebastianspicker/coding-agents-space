import ts from "typescript";
import { Node, SourceFile } from "ts-morph";
import { Finding, Range, Severity } from "../types.js";
import { LIMITS } from "./limits.js";

export function severityFromTsCategory(cat: ts.DiagnosticCategory): Severity {
  switch (cat) {
    case ts.DiagnosticCategory.Error:
      return "error";
    case ts.DiagnosticCategory.Warning:
      return "warn";
    default:
      return "info";
  }
}

export function rangeFromPos(sf: SourceFile, start: number, length: number): Range {
  const s = sf.getLineAndColumnAtPos(start);
  const e = sf.getLineAndColumnAtPos(start + Math.max(0, length));
  return { startLine: s.line, startCol: s.column, endLine: e.line, endCol: e.column };
}

export function estimateCyclomaticComplexity(fn: Node): number {
  let c = 1;
  fn.forEachDescendant((d) => {
    const k = d.getKind();
    // Branching / boolean complexity (approx)
    if (
      k === ts.SyntaxKind.IfStatement ||
      k === ts.SyntaxKind.ForStatement ||
      k === ts.SyntaxKind.ForInStatement ||
      k === ts.SyntaxKind.ForOfStatement ||
      k === ts.SyntaxKind.WhileStatement ||
      k === ts.SyntaxKind.DoStatement ||
      k === ts.SyntaxKind.CaseClause ||
      k === ts.SyntaxKind.CatchClause ||
      k === ts.SyntaxKind.ConditionalExpression
    ) {
      c += 1;
    } else if (k === ts.SyntaxKind.BinaryExpression) {
      const be = d.compilerNode as ts.BinaryExpression;
      const op = be.operatorToken.kind;
      if (op === ts.SyntaxKind.AmpersandAmpersandToken || op === ts.SyntaxKind.BarBarToken) c += 1;
    }
  });
  return c;
}

export function findAnyHotspots(sf: SourceFile, maxFindings = 120): Finding[] {
  const findings: Finding[] = [];
  const checker = sf.getProject().getTypeChecker();

  // We only check "interesting" nodes to keep it fast.
  const nodes = sf.getDescendants();
  for (const n of nodes) {
    if (findings.length >= maxFindings) break;

    const k = n.getKind();
    const isDecl =
      k === ts.SyntaxKind.VariableDeclaration ||
      k === ts.SyntaxKind.Parameter ||
      k === ts.SyntaxKind.PropertyDeclaration ||
      k === ts.SyntaxKind.PropertySignature ||
      k === ts.SyntaxKind.FunctionDeclaration ||
      k === ts.SyntaxKind.MethodDeclaration;

    if (!isDecl) continue;

    try {
      const t = checker.getTypeAtLocation(n);
      if (t.isAny()) {
        const filePath = sf.getFilePath();
        const start = n.getStart();
        const len = Math.max(1, n.getWidth());
        findings.push({
          kind: "recommendation",
          severity: "warn",
          message: "Any-hotspot: consider tightening types here (avoid `any` where possible).",
          file: filePath,
          range: {
            ...rangeFromPos(sf, start, len)
          },
          ruleId: "any-hotspot",
          confidence: 0.7
        });
      }
    } catch {
      // ignore type resolution edge cases
    }
  }
  return findings;
}

export function findComplexityHotspots(sf: SourceFile, threshold: number, maxFindings = 80): { findings: Finding[]; count: number } {
  const findings: Finding[] = [];
  let count = 0;

  const fns = [
    ...sf.getFunctions(),
    ...sf.getDescendantsOfKind(ts.SyntaxKind.MethodDeclaration),
    ...sf.getDescendantsOfKind(ts.SyntaxKind.ArrowFunction)
  ];

  for (const fn of fns) {
    if (findings.length >= maxFindings) break;
    const c = estimateCyclomaticComplexity(fn);
    if (c >= threshold) {
      count += 1;
      const start = fn.getStart();
      const len = Math.max(1, fn.getWidth());
      findings.push({
        kind: "recommendation",
        severity: "warn",
        message: `Complexity hotspot: estimated cyclomatic complexity ${c}. Consider splitting / simplifying.`,
        file: sf.getFilePath(),
        range: rangeFromPos(sf, start, len),
        ruleId: "complexity-hotspot",
        confidence: 0.65
      });
    }
  }

  return { findings, count };
}

export function findPerfHotspots(sf: SourceFile, maxFindings = 120): Finding[] {
  const findings: Finding[] = [];
  const loops = sf.getDescendants().filter((d) => {
    const k = d.getKind();
    return (
      k === ts.SyntaxKind.ForStatement ||
      k === ts.SyntaxKind.ForOfStatement ||
      k === ts.SyntaxKind.ForInStatement ||
      k === ts.SyntaxKind.WhileStatement ||
      k === ts.SyntaxKind.DoStatement
    );
  });

  for (const loop of loops) {
    if (findings.length >= maxFindings) break;

    // Search for allocations/costly patterns inside loops (heuristic)
    const inner = loop.getDescendants();
    let allocs = 0;
    let arrayMethods = 0;

    for (const d of inner) {
      const k = d.getKind();
      if (k === ts.SyntaxKind.NewExpression || k === ts.SyntaxKind.ObjectLiteralExpression || k === ts.SyntaxKind.ArrayLiteralExpression) {
        allocs += 1;
      } else if (k === ts.SyntaxKind.CallExpression) {
        const txt = d.getText();
        if (txt.includes(".map(") || txt.includes(".filter(") || txt.includes(".reduce(") || txt.includes(".flatMap(")) arrayMethods += 1;
      }
      if (allocs + arrayMethods >= 6) break;
    }

    if (allocs >= 3 || arrayMethods >= 2) {
      findings.push({
        kind: "recommendation",
        severity: "info",
        message:
          "Performance hint: loop contains multiple allocations / array transforms. In hot paths (numerics/simulations), reduce GC pressure (reuse buffers, prefer TypedArrays, avoid map/filter in tight loops).",
        file: sf.getFilePath(),
        range: rangeFromPos(sf, loop.getStart(), Math.max(1, loop.getWidth())),
        ruleId: "perf-loop-allocations",
        confidence: 0.55
      });
    }
  }

  return findings;
}
