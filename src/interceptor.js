/**
 * BudgetSentry Interceptor Middleware
 * Intercepts spend requests and checks them against the budget before executing.
 */

const { BudgetSentry } = require('./index');

class Interceptor {
  constructor(options = {}) {
    this.sentry = new BudgetSentry();
    this.options = options;
  }

  /**
   * Middleware for an generic AI call.
   * Checks the estimated cost before allowing the request to proceed.
   */
  async intercept(costEstimate, next) {
    console.log(`[Interceptor] Pre-flight: Estimating cost of $${costEstimate.toFixed(4)}...`);

    const isAllowed = await this.sentry.checkSpend(costEstimate);

    if (isAllowed) {
      console.log(`[Interceptor] ALLOWED. Proceeding with spend...`);
      try {
        const result = await next(); // Execute the actual API call
        // In a real project, we'd also update usage after the actual cost is known
        return result;
      } catch (err) {
        console.error(`[Interceptor] Error during execution:`, err.message);
        throw err;
      }
    } else {
      console.error(`[Interceptor] BLOCKED: Adding $${costEstimate.toFixed(4)} would exceed safety budget limit.`);
      throw new Error(`BudgetExceeded: Spend request of $${costEstimate.toFixed(4)} was blocked by BudgetSentry.`);
    }
  }
}

module.exports = { Interceptor };
