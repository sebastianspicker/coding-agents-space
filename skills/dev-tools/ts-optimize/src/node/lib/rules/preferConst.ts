import ts from "typescript";
import { TextEdit } from "../edits.js";

function isIdentifier(node: ts.Node): node is ts.Identifier {
  return node.kind === ts.SyntaxKind.Identifier;
}

function isReassignment(node: ts.Node, name: string): boolean {
  // x = ..., x += ..., x ??= ...
  if (ts.isBinaryExpression(node)) {
    const op = node.operatorToken.kind;
    if (
      op >= ts.SyntaxKind.FirstAssignment &&
      op <= ts.SyntaxKind.LastAssignment &&
      isIdentifier(node.left) &&
      node.left.text === name
    ) {
      return true;
    }
  }
  // ++x / x++ / --x / x--
  if (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) {
    const op = node.operator;
    if ((op === ts.SyntaxKind.PlusPlusToken || op === ts.SyntaxKind.MinusMinusToken) && isIdentifier(node.operand) && node.operand.text === name) {
      return true;
    }
  }
  return false;
}

function statementIsForInitializer(declList: ts.VariableDeclarationList): boolean {
  const p = declList.parent;
  return ts.isForStatement(p) || ts.isForOfStatement(p) || ts.isForInStatement(p);
}

export function preferConstEdits(filePath: string, sourceText: string): { edits: TextEdit[]; changedStatements: number } {
  const scriptKind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, /*setParentNodes*/ true, scriptKind);

  const edits: TextEdit[] = [];
  let changedStatements = 0;

  // Traverse variable statements
  function visit(node: ts.Node) {
    if (ts.isVariableStatement(node)) {
      const declList = node.declarationList;
      if (!(declList.flags & ts.NodeFlags.Let)) return;
      if (statementIsForInitializer(declList)) return;

      // Skip destructuring; only simple identifiers with initializers
      const decls = declList.declarations;
      if (decls.length === 0) return;

      const names: string[] = [];
      for (const d of decls) {
        if (!ts.isIdentifier(d.name)) return;
        if (!d.initializer) return;
        names.push(d.name.text);
      }

      // Conservative: only convert if none of the vars are reassigned in the whole file.
      // (Safe-enough baseline for v0.2; can be scope-aware later.)
      for (const nm of names) {
        let reassigned = false;
        const walk = (n: ts.Node) => {
          if (reassigned) return;
          if (isReassignment(n, nm)) {
            reassigned = true;
            return;
          }
          ts.forEachChild(n, walk);
        };
        ts.forEachChild(sf, walk);
        if (reassigned) return;
      }

      // Replace the "let" keyword at the start of declaration list.
      const start = declList.getStart(sf);
      const head = sourceText.slice(start, start + 3);
      if (head !== "let") return;

      edits.push({ start, end: start + 3, newText: "const" });
      changedStatements += 1;
    }

    ts.forEachChild(node, visit);
  }

  visit(sf);
  return { edits, changedStatements };
}

// applyEdits lives in lib/edits.ts for reuse across rules.
