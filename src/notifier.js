/**
 * BudgetSentry Notifier Logic
 * Sends proactive alerts when usage is high (Requested by Sếp)
 */

const axios = require('axios');

class Notifier {
  constructor() {
    this.tgBotToken = process.env.TG_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
    this.tgChatId = process.env.TG_CHAT_ID || 'YOUR_CHAT_ID_HERE';
    this.hasSentAlert = false; // Prevents spamming multiple alerts at the same threshold
  }

  /**
   * Logic to send proactive alerts to Sếp via Telegram when budget is > 80%.
   * This ensures Sếp is never surprised by an AI cost spike.
   */
  async sendProactiveAlert(currentTotal, limit) {
    const percent = ((currentTotal / limit) * 100).toFixed(1);

    if (percent >= 80 && !this.hasSentAlert) {
      const messageText = `⚠️ <b>BudgetSentry Proactive Alert</b> ⚠️\n\n` +
                          `Sếp ơi! We're at <b>${percent}%</b> of our $${limit.toFixed(2)} budget.\n` +
                          `Total spent: $${currentTotal.toFixed(2)}\n\n` +
                          `I'm still running, but I'll block any further spend once we hit 100%.`;

      console.log(`[Notifier] Proactive alert for Sếp: ${percent}% of budget used. Sending Telegram message...`);

      try {
        if (this.tgBotToken !== 'YOUR_BOT_TOKEN_HERE' && this.tgChatId !== 'YOUR_CHAT_ID_HERE') {
          await axios.post(`https://api.telegram.org/bot${this.tgBotToken}/sendMessage`, {
            chat_id: this.tgChatId,
            text: messageText,
            parse_mode: 'HTML'
          });
          console.log(`[Notifier] Telegram alert sent successfully.`);
        } else {
          console.warn(`[Notifier] Skipping Telegram alert (No bot token or chat ID provided).`);
        }
      } catch (err) {
        console.error(`[Notifier] Failed to send Telegram alert:`, err.message);
      }

      this.hasSentAlert = true; // Block further alerts for this threshold
    }
  }
}

module.exports = { Notifier };
