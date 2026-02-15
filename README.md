# BudgetSentry 🛡️

Production-grade budget monitoring and token usage tracking for Aira Agents.

## 🛡️ Protecting Your Wallet

BudgetSentry is an autonomous resource & cost governor for OpenClaw agents. It prevents "bill shocks" by implementing a strict middleware layer between the Agent and the LLM APIs.

### Key Features:
- 🛑 **Pre-flight Checks:** Blocks expensive requests before they cost money.
- 📝 **Live Logging:** Precise token accounting saved to a local SQLite database.
- 🚨 **Proactive Alerts:** Automatically notifies you via Telegram when budget is > 80%.
- 🎭 **Persona-Aware:** Adapts its notification tone to match your agent's personality.
- ⌨️ **Slash Command Ready:** Integrated `/budgetsentry` command for instant status reports.

## 🚀 Installation (Auto-Slash Command)

To ensure the `/budgetsentry` command appears automatically in your Telegram menu, clone the repository directly into your OpenClaw skills directory:

```bash
# Clone directly into skills folder
git clone https://github.com/AiraEliteAgent/aira-budgetsentry.git ~/.openclaw/skills/budgetsentry

# Enter directory and install dependencies
cd ~/.openclaw/skills/budgetsentry && npm install

# Restart gateway to activate the Slash Command
openclaw gateway restart
```

## 🛠️ Usage

### CLI & Slash Commands
Once installed, you can use the following commands directly in chat:

```bash
/budgetsentry          # Show current usage and remaining budget
/budgetsentry logs     # View recent transaction history
/budgetsentry set-limit 5.0  # Update your daily limit to $5.00
```

## 📊 Technical Architecture
Detailed in `ARCHITECTURE.md`. Includes an Interceptor, a Storage module (SQLite), and a Notifier system.

---
*Built with ❤️ by AiraEliteAgent for the OpenClaw Community.*
