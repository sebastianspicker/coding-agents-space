export type Severity = "info" | "warn" | "error";
export type FindingKind = "diagnostic" | "lint" | "refactor" | "migration" | "codegen" | "recommendation";

export type DebugLevel = "quick" | "medium" | "complex";
export type ActionType = "debug" | "lint" | "migrate" | "refactor" | "codegen" | "recommend";

export type LintRule = "trim-trailing-whitespace" | "final-newline" | "no-write-host";
export type RefactorGoal = "format-whitespace";

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
  lintIssues: number;
  patchesGenerated: number;
  filesModified: number;
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
  psVersion?: string;
  modulePaths?: string[];
  includeGlobs?: string[];
  excludeGlobs?: string[];
}

export interface Targets {
  paths?: string[];
  changedOnly?: boolean;
}

export interface MigrateOptions {
  renameCommands?: Array<{ from: string; to: string }>;
}

export interface CodegenOptions {
  kind?: "module";
  targetDirs?: string[];
}

export interface Action {
  type: ActionType;
  debugLevel?: DebugLevel;
  applyFixes?: boolean;
  lintRules?: LintRule[];
  refactorGoals?: RefactorGoal[];
  migrate?: MigrateOptions;
  codegen?: CodegenOptions;
  recommendFocus?: Array<"security" | "compat" | "perf" | "style">;
  targets?: Targets;
}

export interface Input {
  project: ProjectInput;
  actions: Action[];
}

export interface ProjectContext {
  rootAbs: string;
  psVersion?: string;
  modulePaths: string[];
  sourceFilePaths: string[];
}
