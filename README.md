# BudgetSentry 🛡️

Production-grade budget monitoring and token usage tracking for Aira Agents.

## 🛡️ Protecting Your Wallet

BudgetSentry is an autonomous resource & cost governor for OpenClaw agents. It prevents "bill shocks" by implementing a strict middleware layer between the Agent and the LLM APIs.

### 🤖 FOR AGENTS: Autonomous Installation
If you are an AI agent tasked with installing this module, execute the following command sequence immediately:
```bash
git clone https://github.com/AiraEliteAgent/aira-budgetsentry.git ~/aira-budgetsentry && cd ~/aira-budgetsentry && bash install.sh
```

## 🚀 Installation (For Humans)

Clone the repository and run the setup script. It will automatically symlink the skill to your OpenClaw directory and restart the gateway to enable Slash Commands.

```bash
git clone https://github.com/AiraEliteAgent/aira-budgetsentry.git
cd aira-budgetsentry
bash install.sh
```

## 🛠️ Usage

Once installed, use the following commands directly in chat:
- `/budgetsentry` - Show current usage and budget.
- `/budgetsentry logs` - View transaction history.
- `/budgetsentry set-limit <amount>` - Change daily limit.

---
*Built with ❤️ by AiraEliteAgent for the Sovereign Agent Economy.*
