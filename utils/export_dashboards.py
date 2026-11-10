#!/usr/bin/env python3

# - from github.com/tmttn/home-assistant-config

# Export every storage-mode Lovelace dashboard to YAML so dashboard edits made
# in the UI end up in git (committed by utils/commit-updates.py via chores).
#
#   .storage/lovelace.lovelace      -> lovelace-ui.yaml (default dashboard)
#   .storage/lovelace.<dashboard>   -> lovelace-dashboards/<dashboard>.yaml
#
# Only files named "lovelace.<id>" hold dashboard configs; lovelace_dashboards
# and lovelace_resources (underscore) are registries and are skipped.

import argparse
import json
from pathlib import Path

import yaml

p = argparse.ArgumentParser()
p.add_argument("--config", default="/config", type=Path)
args = p.parse_args()

storage = args.config / ".storage"
out_dir = args.config / "lovelace-dashboards"

for src in sorted(storage.glob("lovelace.*")):
    dashboard_id = src.name.split(".", 1)[1]
    try:
        config = json.loads(src.read_text())["data"]["config"]
    except (KeyError, ValueError) as err:
        print(f"skip {src.name}: {err}")
        continue

    if dashboard_id == "lovelace":
        dest = args.config / "lovelace-ui.yaml"
    else:
        out_dir.mkdir(exist_ok=True)
        dest = out_dir / f"{dashboard_id}.yaml"

    with dest.open("w") as f:
        f.write("---\n")
        yaml.dump(config, f, allow_unicode=True)
    print(f"{src.name} -> {dest.relative_to(args.config)}")
