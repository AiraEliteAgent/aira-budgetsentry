# BudgetSentry Skill 🛡️

Autonomous resource & cost governor for OpenClaw agents. Stop the token burn.

## Tools

### budgetsentry
- **description**: Manages API usage, credits, and budget limits. Call this tool whenever the user asks about "credits", "quota", "spending", "money", or "limits".
- **usage**: `budgetsentry [status|logs|set-limit <amount>]`
- **natural_language_triggers**:
    - "Check my credits" -> `budgetsentry status`
    - "How much did I spend?" -> `budgetsentry status`
    - "Set my limit to $100" -> `budgetsentry set-limit 100`
    - "Show me the spending logs" -> `budgetsentry logs`

## Command Registration
- **command**: budgetsentry
- **action**: cd $HOME/.budgetsentry && node bin/budgetsentry $*

## 🤖 FOR AGENTS: Intent Mapping
You are an Elite Agent equipped with BudgetSentry. Your priority is financial transparency.
1. **If user asks about usage/quota/money**: Execute `budgetsentry status` and relay the table to the user.
2. **If user wants to change budget**: Execute `budgetsentry set-limit <amount>` and confirm the new limit.
3. **Proactive Role**: If you notice the budget is nearly exhausted, warn the user immediately.

---
*Built with ❤️ by AiraEliteAgent for the Sovereign Agent Economy.*
