const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const logFile = '/home/aira/.openclaw/agents/main/sessions/7c9f4b65-0c69-454a-8e8b-df1ad1ae4aba.jsonl';
const stateFile = path.join(__dirname, '.watcher_state');

function sync() {
  if (!fs.existsSync(logFile)) return;

  const data = fs.readFileSync(logFile, 'utf8');
  const lines = data.split('\n').filter(l => l.trim() !== '');
  
  let lastProcessedLine = 0;
  if (fs.existsSync(stateFile)) {
    lastProcessedLine = parseInt(fs.readFileSync(stateFile, 'utf8')) || 0;
  }

  let totalIn = 0, totalOut = 0;
  
  for (let i = lastProcessedLine; i < lines.length; i++) {
    try {
      const json = JSON.parse(lines[i]);
      if (json.stats) {
        totalIn += json.stats.tokensIn || 0;
        totalOut += json.stats.tokensOut || 0;
      }
    } catch(e) {}
  }

  if (totalIn > 0) {
    const cmd = `node ${path.join(__dirname, '../../bin/budgetsentry')} log-usage gemini-3-pro ${totalIn} ${totalOut}`;
    exec(cmd, (err) => {
       if (!err) {
         fs.writeFileSync(stateFile, lines.length.toString());
         console.log(`✅ Synced: ${totalIn} in, ${totalOut} out. Total lines: ${lines.length}`);
       } else {
         console.error('Sync failed:', err.message);
       }
    });
  } else {
    console.log('No new tokens found.');
  }
}

sync();
