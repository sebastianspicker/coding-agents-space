// Soft limits to keep the skill fast and predictable in sandboxes.
export const LIMITS = {
  MAX_FILES_HEURISTICS: 400,
  MAX_FINDINGS_PER_CATEGORY: 250,
  MAX_DEDUPE_CANDIDATES_DEFAULT: 800,
  MAX_TOKENS_PER_CANDIDATE: 2000
} as const;
