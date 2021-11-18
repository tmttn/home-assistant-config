#!/bin/bash
#                                 _ _                           _
#    ___ ___  _ __ ___  _ __ ___ (_) |_      _ __ ___  __ _  __| |_ __ ___   ___
#   / __/ _ \| '_ ` _ \| '_ ` _ \| | __|____| '__/ _ \/ _` |/ _` | '_ ` _ \ / _ \
#  | (_| (_) | | | | | | | | | | | | ||_____| | |  __/ (_| | (_| | | | | | |  __/
#   \___\___/|_| |_| |_|_| |_| |_|_|\__|    |_|  \___|\__,_|\__,_|_| |_| |_|\___|
#
#- from github.com/tmttn/home-assistant-config
if [[ `git status --porcelain` ]]; then
  git commit -m "update automatically generated part of README.md ✏️" README.md
  git commit -am "update automatically generated ascii art 🎨"
  git push
fi