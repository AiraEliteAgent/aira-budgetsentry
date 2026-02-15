const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const sessionsDir = path.join(process.env.HOME, '.openclaw/agents/main/sessions');
const stateFile = path.join(__dirname, '.watcher_state');

function getLatestLogFile() {
  if (!fs.existsSync(sessionsDir)) return null;
  const files = fs.readdirSync(sessionsDir)
    .filter(f => f.endsWith('.jsonl') && f !== 'sessions.json')
    .map(f => ({ name: f, time: fs.statSync(path.join(sessionsDir, f)).mtime.getTime() }))
    .sort((a, b) => b.time - a.time);
  
  return files.length > 0 ? path.join(sessionsDir, files[0].name) : null;
}

function sync() {
  const logFile = getLatestLogFile();
  if (!logFile) {
    console.log('No session logs found.');
    return;
  }

  const data = fs.readFileSync(logFile, 'utf8');
  const lines = data.split('\n').filter(l => l.trim() !== '');
  
  let lastProcessedLine = 0;
  if (fs.existsSync(stateFile)) {
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    // If the file has changed (different session), reset pointer
    if (state.file === logFile) {
      lastProcessedLine = state.line || 0;
    }
  }

  let totalIn = 0, totalOut = 0;
  for (let i = lastProcessedLine; i < lines.length; i++) {
    try {
      const json = JSON.parse(lines[i]);
      if (json.message && json.message.usage) {
        totalIn += json.message.usage.input || 0;
        totalOut += json.message.usage.output || 0;
      }
    } catch(e) {}
  }

  if (totalIn > 0) {
    const cmd = `node ${path.join(__dirname, '../../bin/budgetsentry')} log-usage gemini-3-pro ${totalIn} ${totalOut}`;
    exec(cmd, (err) => {
       if (!err) {
         fs.writeFileSync(stateFile, JSON.stringify({ file: logFile, line: lines.length }));
         console.log(`✅ Synced from ${path.basename(logFile)}: ${totalIn} in, ${totalOut} out.`);
       }
    });
  } else {
    console.log(`No new tokens in ${path.basename(logFile)}.`);
  }
}

sync();
