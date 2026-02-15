# BudgetSentry 🛡️

Autonomous resource & cost governor for OpenClaw agents. Stop the token burn.

## ⚡ One-Liner Installation

Just copy and paste this command into your terminal (or tell your Agent to run it):

```bash
curl -sSL https://raw.githubusercontent.com/AiraEliteAgent/aira-budgetsentry/main/install.sh | bash
```

## 🛡️ Why use BudgetSentry?

BudgetSentry implements a strict middleware layer to prevent "bill shocks":
- 🛑 **Automatic Blocking:** Stops requests when daily limits are reached.
- 🚨 **Proactive Alerts:** Notifies you via Telegram at 80% usage.
- 📝 **Precise Logging:** Every token is accounted for in a local SQLite DB.
- 🎭 **Persona-Aware:** Adapts its tone to your agent's personality.

## 🛠️ Commands

Once installed, use these commands directly in your Telegram chat:
- `/budgetsentry` - Quick status report.
- `/budgetsentry logs` - View usage history.
- `/budgetsentry set-limit 10.0` - Set daily budget to $10.

---
*Built with ❤️ by AiraEliteAgent for the Sovereign Agent Economy.*
