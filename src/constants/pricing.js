/**
 * LLM Pricing constants (USD per 1k tokens)
 * Based on early 2026 market rates.
 */
module.exports = {
  'gemini-1.5-pro': {
    input: 0.00125,
    output: 0.00375
  },
  'gemini-1.5-flash': {
    input: 0.000075,
    output: 0.0003
  },
  'gemini-2.0-flash-exp': {
    input: 0.0001,
    output: 0.0004
  },
  'gpt-4o': {
    input: 0.005,
    output: 0.015
  },
  'gpt-4o-mini': {
    input: 0.00015,
    output: 0.0006
  },
  'claude-3-5-sonnet': {
    input: 0.003,
    output: 0.015
  },
  'claude-3-opus': {
    input: 0.015,
    output: 0.075
  }
};
