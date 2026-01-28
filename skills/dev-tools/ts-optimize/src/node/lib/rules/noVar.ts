import ts from "typescript";
import { Finding } from "../../types.js";

export function findNoVarFindings(filePath: string, sourceText: string): Finding[] {
  if (filePath.endsWith(".d.ts")) return [];
  const sf = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);
  const findings: Finding[] = [];

  const visit = (node: ts.Node) => {
    if (ts.isVariableStatement(node)) {
      const declList = node.declarationList;
      // In modern TS, "var" is represented by not being block-scoped (let/const are block-scoped).
      if ((declList.flags & ts.NodeFlags.BlockScoped) === 0) {
        findings.push({
          kind: "lint",
          severity: "warn",
          message: "no-var: prefer 'let' or 'const' over 'var' for predictable scoping.",
          file: filePath,
          range: rangeFromPosFromTs(sf, declList.getStart(sf), declList.getWidth()),
          ruleId: "no-var",
          confidence: 0.6
        });
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sf);
  return findings;
}

function rangeFromPosFromTs(sf: ts.SourceFile, start: number, length: number) {
  const s = sf.getLineAndCharacterOfPosition(start);
  const e = sf.getLineAndCharacterOfPosition(start + Math.max(0, length));
  return {
    startLine: s.line + 1,
    startCol: s.character + 1,
    endLine: e.line + 1,
    endCol: e.character + 1
  };
}
