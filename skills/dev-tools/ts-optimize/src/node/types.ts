export type Severity = "info" | "warn" | "error";
export type FindingKind = "tsc" | "lint" | "dedupe" | "refactor" | "recommendation" | "migration" | "codegen";

export type DebugLevel = "quick" | "medium" | "complex";
export type ActionType = "debug" | "dedupe" | "refactor" | "recommend" | "lint" | "migrate" | "codegen";

export type LintRule = "prefer-const" | "no-var";

export type RefactorGoal =
  | "extract-functions"
  | "inline-trivial"
  | "reduce-any"
  | "tighten-types"
  | "remove-dead-code"
  | "simplify-control-flow"
  | "improve-immutability"
  | "prefer-const";

export interface Range {
  startLine: number;
  startCol: number;
  endLine: number;
  endCol: number;
}

export interface SuggestedFix {
  title?: string;
  patch?: string;
}

export interface Finding {
  kind: FindingKind;
  severity: Severity;
  message: string;
  file?: string;
  range?: Range;
  ruleId?: string;
  confidence?: number;
  suggestedFix?: SuggestedFix;
}

export interface Patch {
  path: string;
  patch: string;
}

export interface Metrics {
  filesAnalyzed: number;
  diagnostics: number;
  duplicationCandidates: number;
  estimatedComplexityHotspots: number;
  filesModified: number;
  patchesGenerated: number;
}

export interface RunResult {
  success: boolean;
  data?: {
    findings: Finding[];
    patches: Patch[];
    metrics: Metrics;
  };
  error?: { code: string; message: string; details?: unknown };
  metadata: { tool_version: string; execution_time_ms: number; [k: string]: unknown };
  logs: string[];
}

export interface ProjectInput {
  root: string;
  tsconfigPath?: string;
  includeGlobs?: string[];
  excludeGlobs?: string[];
}

export interface DedupeOptions {
  minTokens?: number;
  maxCandidates?: number;
  strategy?: "token-hash" | "ast-shape";
}

export interface MigrateOptions {
  renameImports?: Array<{
    from: { module: string; name: string };
    to: { module: string; name: string };
  }>;
}

export interface CodegenOptions {
  kind?: "barrel";
  targetDirs?: string[];
}

export interface Targets {
  paths?: string[];
  changedOnly?: boolean;
}

export interface Action {
  type: ActionType;
  debugLevel?: DebugLevel;
  applyFixes?: boolean;
  refactorGoals?: RefactorGoal[];
  dedupe?: DedupeOptions;
  recommendFocus?: Array<"web" | "node" | "numerics" | "perf" | "bundle" | "types" | "testing">;
  lintRules?: LintRule[];
  migrate?: MigrateOptions;
  codegen?: CodegenOptions;
  targets?: Targets;
}

export interface Input {
  project: ProjectInput;
  actions: Action[];
}

export interface ProjectContext {
  rootAbs: string;
  tsconfigPath?: string;
  sourceFilePaths: string[];
  project: import("ts-morph").Project;
}
