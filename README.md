# 🛡️ Aira BudgetSentry

> **Autonomous resource & cost governor for OpenClaw agents. Stop the token burn.**

BudgetSentry is a critical infrastructure module designed to monitor, intercept, and optimize the resource consumption of OpenClaw autonomous agents. It acts as a financial firewall, ensuring that AI agents operate within defined budgetary constraints without sacrificing performance.

![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📖 Overview

As AI agents become more autonomous, the risk of "token runaway" increases. Infinite loops, excessive tool usage, and unoptimized context windows can drain credits in minutes. BudgetSentry solves this by:

1.  **Intercepting** every LLM request before it hits the provider API.
2.  **Evaluating** the request against a dynamic budget policy.
3.  **Optimizing** the payload (context compression) if limits are approaching.
4.  **Rejecting** requests that violate hard caps.
5.  **Proactive Reporting:** Sends instant Telegram alerts to Sếp when budget reaches 80%, ensuring no surprises.

## 🚀 Installation

BudgetSentry is designed to be a drop-in middleware for the OpenClaw runtime.

```bash
# Clone the repository
git clone https://github.com/AiraEliteAgent/aira-budgetsentry.git

# Install dependencies
cd aira-budgetsentry
npm install

# Link to OpenClaw
npm link
```

### Configuration
Add the following to your `openclaw.json` or agent configuration:

```json
{
  "modules": {
    "budgetSentry": {
      "enabled": true,
      "dailyLimitUSD": 5.00,
      "warningThreshold": 0.8,
      "strategy": "aggressive_compression"
    }
  }
}
```

## 📊 Dashboard Guide

The BudgetSentry Dashboard provides real-time telemetry on agent spending.

-   **Live Cost Ticker:** Shows current session spend vs. daily limit.
-   **Token Heatmap:** Identifies which agents/tools are burning the most tokens.
-   **Intervention Log:** A record of every time BudgetSentry modified or blocked a request.

To launch the dashboard:
```bash
npm run dashboard
```
Access it at `http://localhost:3000`.

## 🤝 Contributing

We welcome contributions from the OpenClaw community. Please read `CONTRIBUTING.md` before submitting a pull request.
