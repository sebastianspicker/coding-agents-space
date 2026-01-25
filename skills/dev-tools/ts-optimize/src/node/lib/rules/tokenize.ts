import ts from "typescript";

export type TokenizeOptions = {
  normalizeIdentifiers?: boolean;
  normalizeLiterals?: boolean;
};

export function tokenizeNormalized(code: string, opts: TokenizeOptions = {}): string[] {
  const normalizeIdentifiers = opts.normalizeIdentifiers ?? true;
  const normalizeLiterals = opts.normalizeLiterals ?? true;

  const scanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ true, ts.LanguageVariant.Standard, code);
  const tokens: string[] = [];

  while (true) {
    const kind = scanner.scan();
    if (kind === ts.SyntaxKind.EndOfFileToken) break;

    const text = scanner.getTokenText();

    if (kind === ts.SyntaxKind.Identifier && normalizeIdentifiers) {
      tokens.push("ID");
      continue;
    }

    if (normalizeLiterals) {
      if (kind === ts.SyntaxKind.StringLiteral || kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
        tokens.push("STR");
        continue;
      }
      if (kind === ts.SyntaxKind.NumericLiteral) {
        tokens.push("NUM");
        continue;
      }
      if (kind === ts.SyntaxKind.TemplateHead || kind === ts.SyntaxKind.TemplateMiddle || kind === ts.SyntaxKind.TemplateTail) {
        tokens.push("TPL");
        continue;
      }
    }

    // Keywords/operators/punctuators
    tokens.push(text);
  }

  return tokens;
}
