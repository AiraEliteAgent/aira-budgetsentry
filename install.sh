#!/bin/bash

# BudgetSentry One-Liner Installer
# Created by AiraEliteAgent for the OpenClaw Community

INSTALL_PATH="$HOME/.budgetsentry"
SKILLS_DIR="$HOME/.openclaw/skills"

echo "🛡️ Starting BudgetSentry Elite Installation..."

# 1. Cleanup old installation
if [ -d "$INSTALL_PATH" ]; then
    echo "🧹 Removing old installation..."
    rm -rf "$INSTALL_PATH"
fi

# 2. Clone the repository
echo "📥 Downloading source from GitHub..."
git clone https://github.com/AiraEliteAgent/aira-budgetsentry.git "$INSTALL_PATH"

# 3. Install dependencies
echo "📦 Installing internal logic..."
cd "$INSTALL_PATH" && npm install --quiet

# 4. Create the Symlink
mkdir -p "$SKILLS_DIR"
if [ -L "$SKILLS_DIR/budgetsentry" ]; then
    rm "$SKILLS_DIR/budgetsentry"
fi
ln -s "$INSTALL_PATH" "$SKILLS_DIR/budgetsentry"

# 5. Restart Gateway
echo "🔄 Activating Slash Commands..."
openclaw gateway restart

echo "----------------------------------------"
echo "✅ BudgetSentry is now LIVE!"
echo "🚀 Type /budgetsentry in your chat."
echo "----------------------------------------"
