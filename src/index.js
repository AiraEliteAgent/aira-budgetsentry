/**
 * BudgetSentry Main Logic
 * Manages usage, limits, and coordinates between Interceptor and Notifier.
 */

const { Notifier } = require('./notifier');

class BudgetSentry {
  constructor() {
    this.limit = parseFloat(process.env.BUDGET_LIMIT || '50.00');
    this.spent = 0.00; // Mock current usage for now
    this.notifier = new Notifier();
  }

  async getUsage() {
    return {
      spent: this.spent.toFixed(2),
      limit: this.limit.toFixed(2),
      percent: ((this.spent / this.limit) * 100).toFixed(1)
    };
  }

  async checkSpend(cost) {
    const nextTotal = this.spent + cost;
    const usagePercent = (nextTotal / this.limit) * 100;

    // Proactive reporting feature requested by Sếp
    // Alerts the human if we're hitting 80% or higher before the next spend
    if (usagePercent >= 80) {
      await this.notifier.sendProactiveAlert(nextTotal, this.limit);
    }

    if (nextTotal > this.limit) {
      return false; // Spend blocked
    }

    this.spent = nextTotal; // In a real app, this would update a database or cloud storage
    return true;
  }
}

module.exports = { BudgetSentry };
