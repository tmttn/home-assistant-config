#!/usr/bin/env python3

#  _   _ ____  ____    _  _____ _____   ____  _____    _    ____  __  __ _____
# | | | |  _ \|  _ \  / \|_   _| ____| |  _ \| ____|  / \  |  _ \|  \/  | ____|
# | | | | |_) | | | |/ _ \ | | |  _|   | |_) |  _|   / _ \ | | | | |\/| |  _|
# | |_| |  __/| |_| / ___ \| | | |___  |  _ <| |___ / ___ \| |_| | |  | | |___
#  \___/|_|   |____/_/   \_\_| |_____| |_| \_\_____/_/   \_\____/|_|  |_|_____|
#
# - from github.com/tmttn/home-assistant-config

# Run this script from the main repo root!
# It updates the table of devices.
# This code relies on the way I have structured my files.

import functools
import json
import re
import subprocess
import urllib.parse
from contextlib import suppress
from pathlib import Path

import yaml

from _readme_tables import html_table

URL = "https://github.com/tmttn/home-assistant-config/blob/{commit_hash}/{fname}"


@functools.lru_cache()
def git_revision_hash():
    """Get the git hash to save with data to ensure reproducibility."""
    git_output = subprocess.check_output(["git", "rev-parse", "HEAD"])
    return git_output.decode("utf-8").replace("\n", "")


@functools.lru_cache()
def git_latest_edit_hash(fname):
    """Get the git hash to save with data to ensure reproducibility."""
    git_output = subprocess.check_output(
        ["git", "rev-list", "-1", "master", str(fname)]
    )
    return git_output.decode("utf-8").replace("\n", "")

def remove_text(content, start, end):
    do_append = True
    new = []
    for line in content:
        if end in line:
            do_append = not do_append
        if do_append:
            new.append(line)
        if start in line:
            do_append = not do_append
    return new

def modify_lines(to_insert, lines, tag):
    MARKDOWN_COMMENT = "<!-- {} -->"
    start = MARKDOWN_COMMENT.format(f"start-{tag}")
    end = MARKDOWN_COMMENT.format(f"end-{tag}")
    new_lines = remove_text(lines, start, end)
    i = next((i for (i, line) in enumerate(new_lines) if start in line)) + 1
    return new_lines[:i] + [s + "\n" for s in to_insert] + new_lines[i:]


def modify_version(lines):
    with open(".HA_VERSION") as f:
        version = f.read()
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


def get_addons():
    """Get the git hash to save with data to ensure reproducibility."""
    try:
        output = subprocess.check_output(["ha", "addons", "--raw-json"])
    except FileNotFoundError:
        # the 'ha' program isn't available in the host image, I can only
        # run it from the 'SSH & Web Terminal' Add-on.
        return None
    raw = output.decode("utf-8")
    addons = json.loads(raw)["data"]
    installed_addons = [addon for addon in addons["addons"] if addon["installed"]]
    return installed_addons


def get_addon_line(addon):
    name = addon["name"]
    url = addon["url"]
    try:
        by = addon["url"].split("github.com/")[1].split("/")[0]
    except IndexError:
        by = "home-assistant.io"
    version = addon["version"]
    return by, f"- [{name}]({url}) version {version} by @{by}"


def get_addon_lines():
    installed_addons = get_addons()
    if installed_addons is None:
        return None
    addons = {get_addon_line(addon) for addon in installed_addons}
    _, addons = zip(*sorted(addons))
    return addons

text = []

# List addons
addons = get_addon_lines()

# Modify README.md
with open("README.md") as f:
    lines = f.readlines()

lines = modify_version(lines)
lines = modify_lines(html_table.split("\n"), lines, "table")
if addons is not None:
    # Only works when running from the 'SSH & Web Terminal' Add-on
    lines = modify_lines(addons, lines, "addons")

with open("README.md", "w") as f:
    f.write("".join(lines))
