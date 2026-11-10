#!/usr/bin/env python3

#  _   _ ____  ____    _  _____ _____   ____  _____    _    ____  __  __ _____
# | | | |  _ \|  _ \  / \|_   _| ____| |  _ \| ____|  / \  |  _ \|  \/  | ____|
# | | | | |_) | | | |/ _ \ | | |  _|   | |_) |  _|   / _ \ | | | | |\/| |  _|
# | |_| |  __/| |_| / ___ \| | | |___  |  _ <| |___ / ___ \| |_| | |  | | |___
#  \___/|_|   |____/_/   \_\_| |_____| |_| \_\_____/_/   \_\____/|_|  |_|_____|
#
# - from github.com/tmttn/home-assistant-config

# Run this script from the main repo root!
# It keeps the "Running Home Assistant" badge in README.md in sync with
# .HA_VERSION.

import urllib.parse


def modify_version(lines):
    with open(".HA_VERSION") as f:
        version = f.read().strip()
    msg = f"Running Home Assistant-{version} -darkblue"
    url_part = urllib.parse.quote(msg)
    ha_url = f"https://github.com/home-assistant/core/releases/tag/{version}"
    pattern = "[![HA Version]"
    new_lines = []
    for line in lines:
        if line.startswith(pattern):
            line = f"{pattern}(https://img.shields.io/badge/{url_part})]({ha_url})\n"
        new_lines.append(line)
    return new_lines


with open("README.md") as f:
    lines = f.readlines()

lines = modify_version(lines)

with open("README.md", "w") as f:
    f.write("".join(lines))
