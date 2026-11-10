# Thomas Metten's Home Assistant config

[![GitHub last commit](https://img.shields.io/github/last-commit/tmttn/home-assistant-config.svg?style=plasticr)](https://github.com/tmttn/home-assistant-config/commits/main)
[![HA Version](https://img.shields.io/badge/Running%20Home%20Assistant-2026.11.0%20-darkblue)](https://github.com/home-assistant/core/releases/tag/2026.11.0)
[![HA Community](https://img.shields.io/badge/HA%20community-forum-orange)](https://community.home-assistant.io/u/tmttn/summary)
[![Yaml Lint](https://github.com/tmttn/home-assistant-config/actions/workflows/yamllint.yml/badge.svg)](https://github.com/tmttn/home-assistant-config/actions/workflows/yamllint.yml)

My personal Home Assistant configuration. Secrets live outside the repo; everything else here is what runs at home.

## Layout

| Path | What's in it |
| --- | --- |
| [`configuration.yaml`](configuration.yaml) | Entry point; pulls in the files under `includes/` |
| [`includes/`](includes) | Template sensors, utility meters, helpers, recorder, notify, … |
| [`blueprints/`](blueprints) | Automation and template blueprints |
| [`pyscript/`](pyscript) | Pyscript apps (wake-up light, battery monitor, …) |
| [`custom_components/`](custom_components) | Custom integrations installed through HACS |
| [`themes/`](themes) | Frontend themes |
| [`utils/`](utils) | Maintenance scripts run by [`chores`](chores) |

## Deploying

A push to `main` calls a Home Assistant webhook that starts the Git pull app. The app pulls `main`, checks the config, and restarts Core only when needed. See [`deploy-ha.yml`](.github/workflows/deploy-ha.yml).
