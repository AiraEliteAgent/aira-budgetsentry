const pricing = require('../constants/pricing');
const Storage = require('./Storage');
const notifier = require('../utils/Notifier');

class Interceptor {
  constructor(dbPath) {
    this.storage = new Storage(dbPath);
    this.isInitialized = false;
  }

  async init() {
    if (!this.isInitialized) {
      await this.storage.init();
      this.isInitialized = true;
    }
  }

  /**
   * Calculates the cost of a request based on the model and tokens.
   */
  calculateCost(model, tokens_in, tokens_out) {
    const rates = pricing[model] || pricing['gemini-1.5-flash']; // Default to flash if unknown
    const cost_in = (tokens_in / 1000) * rates.input;
    const cost_out = (tokens_out / 1000) * rates.output;
    return cost_in + cost_out;
  }

  /**
   * Checks if the predicted cost is within the remaining daily budget.
   * This protects Sếp's wallet from runaway costs or unintended high-usage scripts.
   */
  async canSpend(predictedCost = 0) {
    await this.init();
    const todaySpend = await this.storage.getTodaySpend();
    const limit = await this.storage.getDailyLimit();

    if (todaySpend + predictedCost > limit) {
      await notifier.notifyLimitReached(todaySpend, limit);
      return false;
    }

    // Optional: Warning at 80%
    if (todaySpend < limit * 0.8 && (todaySpend + predictedCost) >= limit * 0.8) {
      await notifier.notifyWarning(todaySpend + predictedCost, limit);
    }

    return true;
  }

  /**
   * Logs the actual token usage and updates the budget.
   * Ensures transparency and accountability for every cent spent on LLMs.
   */
  async logSpend(model, tokens_in, tokens_out) {
    await this.init();
    const cost = this.calculateCost(model, tokens_in, tokens_out);
    await this.storage.logUsage(model, tokens_in, tokens_out, cost);
    return cost;
  }

  async getStatus() {
    await this.init();
    const spent = await this.storage.getTodaySpend();
    const limit = await this.storage.getDailyLimit();
    return {
      spent,
      limit,
      remaining: Math.max(0, limit - spent),
      percent: (spent / limit) * 100
    };
  }
}

module.exports = Interceptor;
