const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class Storage {
  constructor(dbPath) {
    this.dbPath = dbPath || path.join(process.cwd(), 'budgetsentry.db');
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) return reject(err);
        
        const schema = `
          CREATE TABLE IF NOT EXISTS usage_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            model TEXT,
            tokens_in INTEGER,
            tokens_out INTEGER,
            cost REAL
          );
          
          CREATE TABLE IF NOT EXISTS budget_settings (
            key TEXT PRIMARY KEY,
            value REAL
          );
        `;
        
        this.db.exec(schema, (err) => {
          if (err) return reject(err);
          
          // Set default budget if not exists
          this.db.run("INSERT OR IGNORE INTO budget_settings (key, value) VALUES ('daily_limit', 5.0)", (err) => {
             if (err) return reject(err);
             resolve();
          });
        });
      });
    });
  }

  async getDailyLimit() {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT value FROM budget_settings WHERE key = 'daily_limit'", (err, row) => {
        if (err) return reject(err);
        resolve(row ? row.value : 5.0);
      });
    });
  }

  async setDailyLimit(limit) {
    return new Promise((resolve, reject) => {
      this.db.run("INSERT OR REPLACE INTO budget_settings (key, value) VALUES ('daily_limit', ?)", [limit], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  async getTodaySpend() {
    return new Promise((resolve, reject) => {
      const query = "SELECT SUM(cost) as total FROM usage_logs WHERE date(timestamp) = date('now')";
      this.db.get(query, (err, row) => {
        if (err) return reject(err);
        resolve(row && row.total ? row.total : 0);
      });
    });
  }

  async logUsage(model, tokens_in, tokens_out, cost) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO usage_logs (model, tokens_in, tokens_out, cost) VALUES (?, ?, ?, ?)";
      this.db.run(query, [model, tokens_in, tokens_out, cost], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  async getLogs(limit = 10) {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM usage_logs ORDER BY timestamp DESC LIMIT ?", [limit], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    if (this.db) {
      this.db.close();
    }
  }
}

module.exports = Storage;
