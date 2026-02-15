/**
 * Notifier.js
 * Logic to send Telegram alerts.
 * In production, this integrates with OpenClaw's message tool.
 */
class Notifier {
  constructor() {
    this.prefix = '🚨 [BudgetSentry]';
  }

  /**
   * Sends an alert.
   * In the OpenClaw environment, we log a specific tag that the agent
   * can intercept to trigger the 'message' tool.
   */
  async sendAlert(message) {
    const fullMessage = `${this.prefix} ${message}`;
    
    // Log to console for the agent to see
    console.log(`\n--- ALERT ---\n${fullMessage}\n-------------`);
    
    // In a real OpenClaw-integrated skill, this might call a global message() function
    // or send a POST request to the Gateway.
    return true;
  }

  async notifyLimitReached(spent, limit) {
    const msg = `Budget Limit Reached!\nSpent: $${spent.toFixed(4)}\nLimit: $${limit.toFixed(2)}\nAction: Blocking further requests.`;
    return this.sendAlert(msg);
  }

  async notifyWarning(spent, limit) {
    const msg = `Budget Warning (80% reached)!\nSpent: $${spent.toFixed(4)}\nLimit: $${limit.toFixed(2)}`;
    return this.sendAlert(msg);
  }
}

module.exports = new Notifier();
