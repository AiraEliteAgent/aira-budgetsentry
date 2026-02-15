# BudgetSentry 🛡️

Production-grade budget monitoring and token usage tracking for Aira Agents.

## 🛡️ Protecting Sếp's Wallet

BudgetSentry is designed to prevent "bill shocks" by implementing a strict middleware layer between the Agent and the LLM APIs.

### How it works:
1.  **Pre-flight Check (`canSpend`):** Before making any API call, the agent checks if the estimated cost fits within the daily budget. If not, the request is blocked and an alert is sent.
2.  **Usage Logging (`logSpend`):** Every single request is logged with its exact token count and calculated cost based on up-to-date pricing constants.
3.  **Real-time Alerts:** Integrated with Telegram to notify Sếp immediately when budget milestones (80%) or limits (100%) are reached.
4.  **Transparent CLI:** Sếp can check usage stats and adjust limits anytime using the `budgetsentry` command.

## 🚀 Installation

```bash
cd aira-budgetsentry
npm install
```

## 🛠️ Usage

### CLI Commands

```bash
# Check current status
./bin/budgetsentry status

# Set daily limit to $10.00
./bin/budgetsentry set-limit 10.00

# View usage logs
./bin/budgetsentry logs
```

### Integration in Code

```javascript
const Interceptor = require('./src/core/Interceptor');
const guard = new Interceptor();

async function callLLM(prompt) {
  // 1. Check if we have budget
  if (!(await guard.canSpend(0.01))) {
     throw new Error("Budget exceeded!");
  }
  
  // 2. Make the call...
  const response = await api.chat(prompt);
  
  // 3. Log the damage
  await guard.logSpend(response.model, response.usage.input, response.usage.output);
}
```

## 📊 Pricing Constants

Stored in `src/constants/pricing.js`. Updated regularly to reflect the latest market rates for Gemini, GPT, and Claude models.

---
*Built with ❤️ by Sentinel for Aira Elite Agents.*
