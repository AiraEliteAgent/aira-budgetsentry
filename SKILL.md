# 🤖 SKILL.md: BudgetSentry Integration Protocol

## ⚠️ Directive for Agents

**ALL Agents operating within this runtime MUST respect the BudgetSentry governor.**

You are not an infinite resource. Your cognition costs money. BudgetSentry is your financial conscience.

### 1. Pre-Flight Check

Before initiating any complex, multi-step task or spawning sub-agents, you **MUST** check your remaining budget.

**Tool:** `budget_check`

#### Usage

```json
// Request
{
  "tool": "budget_check",
  "parameters": {
    "scope": "session" // or "global"
  }
}

// Response
{
  "status": "ok",
  "remaining_usd": 1.25,
  "burn_rate": "moderate",
  "recommendation": "proceed"
}
```

### 2. Handling Rejections

If BudgetSentry blocks your action with a `402 Payment Required` or `429 Too Many Requests` (simulated), you must **NOT** retry immediately.

**Protocol:**
1.  **Pause:** Wait for 60 seconds.
2.  **Compress:** Summarize your current context. Drop non-essential history.
3.  **Simplfy:** Switch to a cheaper model (e.g., from `opus` to `flash`) if the task permits.
4.  **Report:** Notify the user that the task is paused due to budget constraints.

### 3. Context Awareness

BudgetSentry injects a system prompt header indicating current budget health.
*   🟢 **Green:** Full capacity. Go wild.
*   🟡 **Yellow:** Caution. Avoid unnecessary searching or high-res image generation.
*   🔴 **Red:** Critical. Finish the immediate thought and stop.

## 🛠️ API Interface for Tools

When building new tools, register their estimated cost:

```javascript
registerTool({
  name: "deep_web_search",
  cost_estimate: "high", // Used by BudgetSentry to predict spend
  ...
})
```
