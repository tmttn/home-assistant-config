#!/bin/bash
#                                 _ _                           _
#    ___ ___  _ __ ___  _ __ ___ (_) |_      _ __ ___  __ _  __| |_ __ ___   ___
#   / __/ _ \| '_ ` _ \| '_ ` _ \| | __|____| '__/ _ \/ _` |/ _` | '_ ` _ \ / _ \
#  | (_| (_) | | | | | | | | | | | | ||_____| | |  __/ (_| | (_| | | | | | |  __/
#   \___\___/|_| |_| |_|_| |_| |_|_|\__|    |_|  \___|\__,_|\__,_|_| |_| |_|\___|
#
#- from github.com/tmttn/home-assistant-config
# Commit README.md if it has changes
if git diff --quiet README.md 2>/dev/null; then
  : # No changes to README.md
else
  git add README.md
  git commit -m "update automatically generated part of README.md ✏️"
fi

# Commit any other tracked file changes (ascii art headers, etc.)
if ! git diff --quiet 2>/dev/null; then
  git commit -am "update automatically generated ascii art 🎨"
fi
