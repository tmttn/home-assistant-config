# Thomas Metten's Home Assistant config files
Based on Bas Nijholt's config files.

[![GitHub stars](https://img.shields.io/github/stars/tmttn/home-assistant-config.svg?style=plasticr)](https://github.com/tmttn/home-assistant-config/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/tmttn/home-assistant-config.svg?style=plasticr)](https://github.com/tmttn/home-assistant-config/commits/master)
[![HA Version](https://img.shields.io/badge/Running%20Home%20Asssistant-2021.12.2%20-darkblue)](https://github.com/home-assistant/core/releases/tag/2021.12.2)
[![HA Community](https://img.shields.io/badge/HA%20community-forum-orange)](https://community.home-assistant.io/u/tmttn/summary)
[![Yaml Lint](https://github.com/tmttn/home-assistant-config/actions/workflows/yamllint.yml/badge.svg)](https://github.com/tmttn/home-assistant-config/actions/workflows/yamllint.yml)

Using [iOS Light and Dark Mode Themes](https://github.com/basnijholt/lovelace-ios-themes).

[Girlfriend guide ❤️](guide.md).

## Table of content

- [My devices](#my-devices)
- [Supervisor add-ons](#supervisor-add-ons)
- [All my automations](#automations---table-of-content)

## Cool AppDaemon apps

- [Sunrise emulator app](appdaemon/apps/wake_up_light.py) 🌅
- [Wake up with Spotify app](appdaemon/apps/wake_up_with_spotify.py) that slowly ramps the volume 📢
- [Low Battery level notifications 🔋](appdaemon/apps/battery_monitor.py)

## My devices

<!-- start-table -->

<table>
    <thead>
        <tr>
            <th>Switches 🎚</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>TP-Link HS110</td>
            <td>3</td>
            <td>36.99</td>
            <td>110.97</td>
        </tr>
        <tr>
            <td>Philips Hue Plug</td>
            <td>1</td>
            <td>29.95</td>
            <td>29.95</td>
        </tr>
        <tr>
            <td>Philips Hue Dimmer switch</td>
            <td>2</td>
            <td>19.1</td>
            <td>38.2</td>
        </tr>
        <tr>
            <td>Philips Hue Wall Switch</td>
            <td>2</td>
            <td>38.3</td>
            <td>76.6</td>
        </tr>
        <tr>
            <td>Hombli Smart Plug Outside</td>
            <td>3</td>
            <td>23.2</td>
            <td>69.6</td>
        </tr>
        <tr>
            <td>Tuya Smart Curtain Switch Wifi</td>
            <td>1</td>
            <td>49.0</td>
            <td>49.0</td>
        </tr>
        <tr>
            <td>Ring Video Doorbell 2</td>
            <td>1</td>
            <td>149.0</td>
            <td>149.0</td>
        </tr>
        <tr>
            <td>Xiaomi Aqara Magic Cube</td>
            <td>1</td>
            <td>16.95</td>
            <td>16.95</td>
        </tr>
        <tr>
            <td>Xiaomi Aqara Single Button</td>
            <td>5</td>
            <td>15.54</td>
            <td>77.7</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>617.97</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Sensors 🌡</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Philips Hue Motion Sensor</td>
            <td>2</td>
            <td>41.99</td>
            <td>83.98</td>
        </tr>
        <tr>
            <td>Xiaomi Aqara Temperature Sensor</td>
            <td>3</td>
            <td>13.5</td>
            <td>40.5</td>
        </tr>
        <tr>
            <td>Xiaomi Aqara Motion Sensor</td>
            <td>4</td>
            <td>13.5</td>
            <td>54.0</td>
        </tr>
        <tr>
            <td>Xiaomi Mi Flora</td>
            <td>2</td>
            <td>17.95</td>
            <td>35.91</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>214.39</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Vacuum 🧹</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Xiaomi Mi Roborock S7</td>
            <td>1</td>
            <td>569.0</td>
            <td>569.0</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>569.0</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Media player 📺🔈</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Samsung LED-LCD UE65JU7000</td>
            <td>1</td>
            <td>nan</td>
            <td>nan</td>
        </tr>
        <tr>
            <td>Nvidia Shield TV Pro</td>
            <td>1</td>
            <td>199.99</td>
            <td>199.99</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>199.99</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Lights 💡</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Philips Hue E27 White and Color Ambiance</td>
            <td>5</td>
            <td>49.99</td>
            <td>249.95</td>
        </tr>
        <tr>
            <td>Philips Hue E27 White</td>
            <td>2</td>
            <td>69.77</td>
            <td>139.54</td>
        </tr>
        <tr>
            <td>Philips Hue E14 White Ambiance</td>
            <td>2</td>
            <td>20.23</td>
            <td>40.46</td>
        </tr>
        <tr>
            <td>Philips Hue GU10 White Ambiance</td>
            <td>12</td>
            <td>24.99</td>
            <td>299.88</td>
        </tr>
        <tr>
            <td>Philips Hue Lightstrip Plus</td>
            <td>1</td>
            <td>79.99</td>
            <td>79.99</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>809.82</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Hubs 🌎</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>ConBee II</td>
            <td>1</td>
            <td>41.9</td>
            <td>41.9</td>
        </tr>
        <tr>
            <td>Hue Bridge</td>
            <td>1</td>
            <td>50.99</td>
            <td>50.99</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>92.89</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Server 🖥</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Shuttle Barebone SH67H7</td>
            <td>1</td>
            <td>210.0</td>
            <td>210.0</td>
        </tr>
        <tr>
            <td>Intel Core i7 - 3770k (3,50 GHz)</td>
            <td>1</td>
            <td>300.0</td>
            <td>300.0</td>
        </tr>
        <tr>
            <td>Intel 530 2,5" Retail 180GB</td>
            <td>1</td>
            <td>115.0</td>
            <td>115.0</td>
        </tr>
        <tr>
            <td>Kingston valueram 8Gb, DDR3, PC12800</td>
            <td>2</td>
            <td>50.0</td>
            <td>100.0</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>725.0</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Device tracker 🔍</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>iPhone 11 Pro Max with the iOS app</td>
            <td>1</td>
            <td>nan</td>
            <td>nan</td>
        </tr>
        <tr>
            <td>iPhone XR with the iOS app</td>
            <td>1</td>
            <td>nan</td>
            <td>nan</td>
        </tr>
        <tr>
            <td>Apple Watch First Generation</td>
            <td>1</td>
            <td>nan</td>
            <td>nan</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Google hardware 🧿</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Google Home</td>
            <td>1</td>
            <td>150.0</td>
            <td>150.0</td>
        </tr>
        <tr>
            <td>Google Home Mini</td>
            <td>1</td>
            <td>50.0</td>
            <td>50.0</td>
        </tr>
        <tr>
            <td>Google Nest Hub Max</td>
            <td>1</td>
            <td>302.0</td>
            <td>302.0</td>
        </tr>
        <tr>
            <td>Google Wifi</td>
            <td>3</td>
            <td>99.67</td>
            <td>299.0</td>
        </tr>
        <tr>
            <td>Google Nest Wifi</td>
            <td>1</td>
            <td>129.0</td>
            <td>129.0</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>930.0</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>HVAC 🌡❄️🎛</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Honeywell wireless OpenTherm-module</td>
            <td>1</td>
            <td>92.99</td>
            <td>92.99</td>
        </tr>
        <tr>
            <td>Honeywell Round Wireless</td>
            <td>2</td>
            <td>81.99</td>
            <td>163.98</td>
        </tr>
        <tr>
            <td>Honeywell Evohome HR92 Radiator valve</td>
            <td>7</td>
            <td>61.95</td>
            <td>433.65</td>
        </tr>
        <tr>
            <td>Honeywell Evohome starterkit with 4 valves</td>
            <td>1</td>
            <td>449.0</td>
            <td>449.0</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>1139.62</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Security 🚨🔐</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Ring Alarm security set</td>
            <td>1</td>
            <td>329.0</td>
            <td>329.0</td>
        </tr>
        <tr>
            <td>Ring Spotlight Cam Solar</td>
            <td>2</td>
            <td>219.5</td>
            <td>439.0</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>768.0</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Other</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>DEBO JT ESP32 module</td>
            <td>1</td>
            <td>18.69</td>
            <td>18.69</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>18.69</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    <thead>
        <tr>
            <th>Total</th>
            <th></th>
            <th></th>
            <th>€6085.37</th>
        </tr>
    </thead>
</table>
<!-- end-table -->

# Supervisor add-ons

I run a [Supervised install](https://www.home-assistant.io/getting-started/) with the following add-ons:

<!-- start-addons -->

- [AppDaemon 4](https://github.com/hassio-addons/addon-appdaemon) version 0.7.0 by @hassio-addons
- [Glances](https://github.com/hassio-addons/addon-glances) version 0.13.0 by @hassio-addons
- [Grafana](https://github.com/hassio-addons/addon-grafana) version 7.2.0 by @hassio-addons
- [InfluxDB](https://github.com/hassio-addons/addon-influxdb) version 4.2.1 by @hassio-addons
- [Log Viewer](https://github.com/hassio-addons/addon-log-viewer) version 0.12.0 by @hassio-addons
- [SSH & Web Terminal](https://github.com/hassio-addons/addon-ssh) version 9.0.1 by @hassio-addons
- [phpMyAdmin](https://github.com/hassio-addons/addon-phpmyadmin) version 0.5.0 by @hassio-addons
- [File editor](https://github.com/home-assistant/hassio-addons/tree/master/configurator) version 5.3.3 by @home-assistant
- [Let's Encrypt](https://github.com/home-assistant/hassio-addons/tree/master/letsencrypt) version 4.11.0 by @home-assistant
- [MariaDB](https://github.com/home-assistant/hassio-addons/tree/master/mariadb) version 2.4.0 by @home-assistant
<!-- end-addons -->

<!-- start-automations -->
# Automations - Table of Content
1. [Adaptive lighting 🌄🌇](#adaptive-lighting-) (3 automations)
1. [Alarm clock ⏰](#alarm-clock-) (1 automations)
1. [Apple Watch ⌚](#apple-watch-) (9 automations)
1. [Arriving 👞](#arriving-) (1 automations)
1. [Climate 🔥🥶](#climate-) (10 automations)
1. [Control switches 🎛](#control-switches-) (2 automations)
1. [Cube ∛](#cube-) (2 automations)
1. [Curtains 🪟🪟](#curtains-) (2 automations)
1. [Doorbell 🚪🔔](#doorbell-) (1 automations)
1. [Frontend 👨‍💻](#frontend-) (3 automations)
1. [Leaving 👞](#leaving-) (3 automations)
1. [Light 💡](#light-) (18 automations)
1. [Lovelace 👨‍💻](#lovelace-) (1 automations)
1. [Music 🎵](#music-) (2 automations)
1. [Plant 🌱](#plant-) (2 automations)
1. [Security 👮🚨](#security-) (3 automations)
1. [Night mode 🌕🌑](#night-mode-) (5 automations)
1. [System 🖥](#system-) (4 automations)
1. [Utilities 🧺👚🍽](#utilities-) (6 automations)
1. [Vacation mode 🏝](#vacation-mode-) (2 automations)
1. [Vacuum 🧹](#vacuum-) (6 automations)
1. [Work 💼](#work-) (3 automations)


⚠️ Total number of automations: **89** ⚠️

## [Adaptive lighting 🌄🌇](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/adaptive_lighting.yaml)
### [Turn on and off switches](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/adaptive_lighting.yaml#L11)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L11)

### [Reset manual_control after 1 hour](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/adaptive_lighting.yaml#L60)


### [Notify manual_control](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/adaptive_lighting.yaml#L84)


[^ toc](#automations---table-of-content)


## [Alarm clock ⏰](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/automations/alarm_clock.yaml)
### [Wake up](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/automations/alarm_clock.yaml#L11)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L43)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L11)
  - [sensor.ten_minutes_before_alarm](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/sensors.yaml#L229)

[^ toc](#automations---table-of-content)


## [Apple Watch ⌚](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml)
### [Minimal lights bedroom](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml#L12)


### [Set sleep mode](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml#L26)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L11)

### [Set lights](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml#L56)

  *which uses:*
  - [script.cozy_lights_bedroom](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L55)
  - [script.cozy_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L28)
  - [script.turn_on_lights](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L363)
  - [script.white_lights_bedroom](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L90)
  - [script.white_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L76)

### [Temperature report](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml#L146)

  *which uses:*
  - [sensor.temperature_bathroom](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/sensors.yaml#L309)
  - [sensor.temperature_bedroom](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/sensors.yaml#L305)
  - [sensor.temperature_bedroom_marthe](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/sensors.yaml#L317)
  - [sensor.temperature_kitchen](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/sensors.yaml#L313)
  - [sensor.temperature_living_room](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/sensors.yaml#L301)
  - [sensor.temperature_storage](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/sensors.yaml#L321)

### [Send vacuum cleaner](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml#L168)

  *which uses:*
  - [script.vacuum_command](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L311)

### [Movie time](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml#L197)


### [Reset adaptive lighting](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml#L216)

  *which uses:*
  - [script.reset_adaptive_lighting](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L377)

### [Set temperature](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml#L225)


### [Where is other person?](https://github.com/tmttn/home-assistant-config/blob/5cba5bda4e1fa87688ce21f72ed3704a3bfdc93f/automations/apple_watch.yaml#L255)


[^ toc](#automations---table-of-content)


## [Arriving 👞](https://github.com/tmttn/home-assistant-config/blob/1915f0e3168bede00e0a4d4aa6366c2f913e7e3c/automations/arriving.yaml)
### [Switch music from iPhone to speakers if no one is home](https://github.com/tmttn/home-assistant-config/blob/1915f0e3168bede00e0a4d4aa6366c2f913e7e3c/automations/arriving.yaml#L13)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L22)

[^ toc](#automations---table-of-content)


## [Climate 🔥🥶](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml)
### [Turn on the bathroom heating in the early morning](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L12)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L37)
  - [input_number.temperature_moderate](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L20)
  - [script.set_moderate_temperature_bathroom](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L200)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L192)

### [Turn off the bathroom heating in the morning](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L31)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L37)
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L12)
  - [script.set_low_temperature_bathroom](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L191)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L192)

### [Turn on the heating 30 min before waking up](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L49)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L43)
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L37)
  - [script.set_moderate_temperature](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L224)
  - [sensor.half_hour_before_alarm](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/sensors.yaml#L221)

### [Increase the heating for the afternoon](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L67)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L37)
  - [script.set_high_temperature](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L238)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L192)

### [Turn on the heating when going home](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L82)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L37)
  - [input_number.temperature_high](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L28)
  - [script.set_high_temperature](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L238)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L192)

### [Turn off the heating at 23:00](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L107)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L37)
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L12)
  - [script.set_low_temperature](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L210)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L192)

### [Turn on heating again after notification](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L128)

  *which uses:*
  - [script.set_high_temperature](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L238)

### [Warning when heating on and back door open](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L137)

  *which uses:*
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L12)

### [Warning when heating on and living room door open](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L181)

  *which uses:*
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L12)

### [Warning when heating on and storage door open](https://github.com/tmttn/home-assistant-config/blob/96f77150a72eb9d36028f1a9abc46f8fdac5e448/automations/climate.yaml#L225)

  *which uses:*
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L12)

[^ toc](#automations---table-of-content)


## [Control switches 🎛](https://github.com/tmttn/home-assistant-config/blob/0c4389a498d6b56e7bd11291edf3cd412484aeaa/automations/control_switches.yaml)
### [Living room Philips Hue dimmer switch](https://github.com/tmttn/home-assistant-config/blob/0c4389a498d6b56e7bd11291edf3cd412484aeaa/automations/control_switches.yaml#L12)

  *which uses:*
  - [input_select.last_script_living_room](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L26)
  - [script.decrease_brightness](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L125)
  - [script.increase_brightness](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L104)
  - [script.next_colors](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L178)
  - [script.white_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L76)

### [Back door Aqara Wireless Mini Switch](https://github.com/tmttn/home-assistant-config/blob/0c4389a498d6b56e7bd11291edf3cd412484aeaa/automations/control_switches.yaml#L55)

  *which uses:*
  - [script.arriving](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L258)
  - [script.set_low_temperature](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L210)
  - [script.start_spotify_playlist_of_nearest_person](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L11)
  - [script.turn_off_everything_non_automatic](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L146)

[^ toc](#automations---table-of-content)


## [Cube ∛](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/automations/cube.yaml)
### [Perform operation](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/automations/cube.yaml#L12)

  *which uses:*
  - [input_select.cube_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L19)
  - [script.start_spotify_playlist_of_nearest_person](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L11)

### [Rotate the cube](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/automations/cube.yaml#L73)

  *which uses:*
  - [input_select.cube_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L19)

[^ toc](#automations---table-of-content)


## [Curtains 🪟🪟](https://github.com/tmttn/home-assistant-config/blob/ee81a7db1f858a5df9cb616700efb1f4bea8777c/automations/curtains.yaml)
### [Open the screens](https://github.com/tmttn/home-assistant-config/blob/ee81a7db1f858a5df9cb616700efb1f4bea8777c/automations/curtains.yaml#L11)


### [Close the screens](https://github.com/tmttn/home-assistant-config/blob/ee81a7db1f858a5df9cb616700efb1f4bea8777c/automations/curtains.yaml#L40)


[^ toc](#automations---table-of-content)


## [Doorbell 🚪🔔](https://github.com/tmttn/home-assistant-config/blob/d045bed077e97dacb4c15f450898b7fd2f8f4faa/automations/doorbell.yaml)
### [The doorbell has been pressed](https://github.com/tmttn/home-assistant-config/blob/d045bed077e97dacb4c15f450898b7fd2f8f4faa/automations/doorbell.yaml#L11)


[^ toc](#automations---table-of-content)


## [Frontend 👨‍💻](https://github.com/tmttn/home-assistant-config/blob/3c726d44bdbeb63d604ea12e03c6ba2cda5d05dd/automations/frontend.yaml)
### [Turn on dark mode](https://github.com/tmttn/home-assistant-config/blob/3c726d44bdbeb63d604ea12e03c6ba2cda5d05dd/automations/frontend.yaml#L11)

  *which uses:*
  - [input_boolean.dark_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L29)

### [Turn on light mode](https://github.com/tmttn/home-assistant-config/blob/3c726d44bdbeb63d604ea12e03c6ba2cda5d05dd/automations/frontend.yaml#L22)

  *which uses:*
  - [input_boolean.dark_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L29)

### [Change theme](https://github.com/tmttn/home-assistant-config/blob/3c726d44bdbeb63d604ea12e03c6ba2cda5d05dd/automations/frontend.yaml#L33)

  *which uses:*
  - [input_boolean.dark_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L29)
  - [input_boolean.theme_alternative](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L32)
  - [input_select.theme](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L40)

[^ toc](#automations---table-of-content)


## [Leaving 👞](https://github.com/tmttn/home-assistant-config/blob/968319fa18169c998fb9c939323ff2110f48d3dd/automations/leaving.yaml)
### [Automatically turn off everything](https://github.com/tmttn/home-assistant-config/blob/968319fa18169c998fb9c939323ff2110f48d3dd/automations/leaving.yaml#L12)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L22)
  - [script.leaving](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L252)
  - [binary_sensor.anything_on](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L179)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L192)
  - [binary_sensor.someone_in_the_house_in_last_hour](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L46)

### [Ask to turn off everything](https://github.com/tmttn/home-assistant-config/blob/968319fa18169c998fb9c939323ff2110f48d3dd/automations/leaving.yaml#L40)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L22)
  - [binary_sensor.anything_on](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L179)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L192)

### [Turn off everything after notification](https://github.com/tmttn/home-assistant-config/blob/968319fa18169c998fb9c939323ff2110f48d3dd/automations/leaving.yaml#L70)

  *which uses:*
  - [script.leaving](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L252)

[^ toc](#automations---table-of-content)


## [Light 💡](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml)
### [Turn on living room](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L35)

  *which uses:*
  - [binary_sensor.activity_in_living_room](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L59)

### [Turn on cozy lights at sunset](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L44)

  *which uses:*
  - [script.cozy_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L28)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

### [Turn off living room](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L57)

  *which uses:*
  - [binary_sensor.activity_in_living_room](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L59)

### [Toggle kitchen ceiling](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L72)

  *which uses:*
  - [binary_sensor.activity_in_kitchen](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L74)

### [Toggle bathroom](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L98)

  *which uses:*
  - [binary_sensor.activity_in_bathroom](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L52)

### [Toggle toilet](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L114)

  *which uses:*
  - [binary_sensor.activity_in_toilet](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L68)

### [Automatically turn on the bedroom](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L139)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L34)
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L25)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L11)
  - [script.turn_on_lights](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L363)
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L97)

### [Automatically turn off the bedroom](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L169)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L34)
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L25)
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L97)

### [Turn off bedroom lights auto switch](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L192)

  *which uses:*
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L25)

### [Turn on automatic_bedroom_lights switch](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L218)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L34)

### [Turn off bedroom after 2 hours of inactivity](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L226)

  *which uses:*
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L97)

### [Turn on outside lights](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L245)


### [Turn off outside lights](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L260)


### [Turn on the outside lights when arriving](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L274)

  *which uses:*
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L192)

### [Turn off toilet (extra check)](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L302)

  In case the other automation failed

  *which uses:*
  - [binary_sensor.activity_in_toilet](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L68)

### [Turn off bathroom (extra check)](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L318)

  In case the other automation failed

  *which uses:*
  - [binary_sensor.activity_in_bathroom](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L52)

### [Turn off kitchen (extra check)](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L334)

  In case the other automation failed

  *which uses:*
  - [binary_sensor.activity_in_kitchen](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L74)

### [Turn off bedroom (extra check)](https://github.com/tmttn/home-assistant-config/blob/7cfeec20a808cc806d64a40b073e565a9f5bcf57/automations/light.yaml#L350)

  In case the other automation failed

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L34)
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L25)
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L97)

[^ toc](#automations---table-of-content)


## [Lovelace 👨‍💻](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/lovelace.yaml)
### [Convert lovelace.json to lovelace-ui.yaml](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/lovelace.yaml#L11)

  *which uses:*
  - [shell_command.chores](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/includes/shell_commands.yaml#L13)
  - [shell_command.convert_lovelace](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/includes/shell_commands.yaml#L11)

[^ toc](#automations---table-of-content)


## [Music 🎵](https://github.com/tmttn/home-assistant-config/blob/1915f0e3168bede00e0a4d4aa6366c2f913e7e3c/automations/music.yaml)
### [Start playlist](https://github.com/tmttn/home-assistant-config/blob/1915f0e3168bede00e0a4d4aa6366c2f913e7e3c/automations/music.yaml#L11)

  *which uses:*
  - [input_boolean.start_the_music](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L12)
  - [script.start_spotify_playlist_of_nearest_person](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L11)

### [Switch music from iPhone to speakers if coming home](https://github.com/tmttn/home-assistant-config/blob/1915f0e3168bede00e0a4d4aa6366c2f913e7e3c/automations/music.yaml#L26)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L22)

[^ toc](#automations---table-of-content)


## [Plant 🌱](https://github.com/tmttn/home-assistant-config/blob/709126aebfdc60a6b4eae945d3940be2b755c774/automations/plant.yaml)
### [Problem with Calathea Medaillon](https://github.com/tmttn/home-assistant-config/blob/709126aebfdc60a6b4eae945d3940be2b755c774/automations/plant.yaml#L11)


### [Problem with Euphorbia Pulcherrima](https://github.com/tmttn/home-assistant-config/blob/709126aebfdc60a6b4eae945d3940be2b755c774/automations/plant.yaml#L29)


[^ toc](#automations---table-of-content)


## [Security 👮🚨](https://github.com/tmttn/home-assistant-config/blob/80042ae3a754ee8f9fa9c34309b3d7068e0f5ed3/automations/security.yaml)
### [Motion detected but we are not home](https://github.com/tmttn/home-assistant-config/blob/80042ae3a754ee8f9fa9c34309b3d7068e0f5ed3/automations/security.yaml#L11)

  *which uses:*
  - [binary_sensor.motion_detected](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L30)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

### [Front door has been open for more than 5 minutes](https://github.com/tmttn/home-assistant-config/blob/80042ae3a754ee8f9fa9c34309b3d7068e0f5ed3/automations/security.yaml#L44)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L22)

### [Back door has been open for more than 5 minutes](https://github.com/tmttn/home-assistant-config/blob/80042ae3a754ee8f9fa9c34309b3d7068e0f5ed3/automations/security.yaml#L61)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L22)

[^ toc](#automations---table-of-content)


## [Night mode 🌕🌑](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml)
### [Automatically turn off when alarm turns off or at 7AM](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L12)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L43)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L11)

### [Turn off automatic bedroom lights](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L30)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L34)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L11)

### [Set low temperature when sleep mode turns on](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L39)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L11)
  - [script.set_low_temperature](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L210)

### [Go from half to total sleeping mode](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L47)

  When it is half sleeping mode and there is no activity in the house for more than an hour go to total sleeping mode.


  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L11)
  - [binary_sensor.activity_outside_bedroom](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L106)

### [Set sleeping mode in the living room](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L70)

  Set the living room lights to sleep mode only when no-one is there anymore.


  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/f62f2cbc1ac3d955f0070b211129b03ccff80ed5/includes/input_selects.yaml#L11)
  - [binary_sensor.activity_in_living_room](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L59)

[^ toc](#automations---table-of-content)


## [System 🖥](https://github.com/tmttn/home-assistant-config/blob/5f07fc792640d96bbcfcfadb0b62165ac32ed678/automations/system.yaml)
### [Warning about high CPU usage](https://github.com/tmttn/home-assistant-config/blob/5f07fc792640d96bbcfcfadb0b62165ac32ed678/automations/system.yaml#L11)


### [Update DNS](https://github.com/tmttn/home-assistant-config/blob/5f07fc792640d96bbcfcfadb0b62165ac32ed678/automations/system.yaml#L24)

  Update the DNS at Gandi to point my domain to my Home Assistant instance.

  *which uses:*
  - [script.update_dns](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L264)

### [Run chores](https://github.com/tmttn/home-assistant-config/blob/5f07fc792640d96bbcfcfadb0b62165ac32ed678/automations/system.yaml#L32)

  Run shell and Python scripts in utils folder.

  *which uses:*
  - [shell_command.chores](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/includes/shell_commands.yaml#L13)

### [Battery level low](https://github.com/tmttn/home-assistant-config/blob/5f07fc792640d96bbcfcfadb0b62165ac32ed678/automations/system.yaml#L40)


[^ toc](#automations---table-of-content)


## [Utilities 🧺👚🍽](https://github.com/tmttn/home-assistant-config/blob/2158ee959673fdf68867d0b5251a6db183844106/automations/utilities.yaml)
### [Turn on espresso machine 10 minutes before waking up](https://github.com/tmttn/home-assistant-config/blob/2158ee959673fdf68867d0b5251a6db183844106/automations/utilities.yaml#L13)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L43)
  - [sensor.half_hour_before_alarm](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/sensors.yaml#L221)

### [Washing machine, dishwasher,tumble dryer or espresso machine started or finished](https://github.com/tmttn/home-assistant-config/blob/2158ee959673fdf68867d0b5251a6db183844106/automations/utilities.yaml#L26)

  *which uses:*
  - [binary_sensor.dishwasher](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L129)
  - [binary_sensor.espresso_machine](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L141)
  - [binary_sensor.tumble_dryer](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L153)
  - [binary_sensor.washing_machine](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L117)

### [Washing machine notification](https://github.com/tmttn/home-assistant-config/blob/2158ee959673fdf68867d0b5251a6db183844106/automations/utilities.yaml#L47)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L273)
  - [binary_sensor.washing_machine](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L117)

### [Dishwasher notification](https://github.com/tmttn/home-assistant-config/blob/2158ee959673fdf68867d0b5251a6db183844106/automations/utilities.yaml#L59)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L273)
  - [binary_sensor.dishwasher](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L129)

### [Tumble dryer notification](https://github.com/tmttn/home-assistant-config/blob/2158ee959673fdf68867d0b5251a6db183844106/automations/utilities.yaml#L71)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L273)
  - [binary_sensor.tumble_dryer](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L153)

### [Espresso machine notification](https://github.com/tmttn/home-assistant-config/blob/2158ee959673fdf68867d0b5251a6db183844106/automations/utilities.yaml#L83)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/e7a9319220d8dafd4ab6f269eac9ece32c1f4e2c/scripts.yaml#L273)
  - [binary_sensor.espresso_machine](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L141)

[^ toc](#automations---table-of-content)


## [Vacation mode 🏝](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/vacation_mode.yaml)
### [Auto turn on](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/vacation_mode.yaml#L11)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L22)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L19)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

### [Auto turn off](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/vacation_mode.yaml#L31)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L22)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L19)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

[^ toc](#automations---table-of-content)


## [Vacuum 🧹](https://github.com/tmttn/home-assistant-config/blob/3b5071aff6730e662e670656f190d804a8e4b1a8/automations/vacuum.yaml)
### [Started cleaning](https://github.com/tmttn/home-assistant-config/blob/3b5071aff6730e662e670656f190d804a8e4b1a8/automations/vacuum.yaml#L11)


### [Stopped cleaning](https://github.com/tmttn/home-assistant-config/blob/3b5071aff6730e662e670656f190d804a8e4b1a8/automations/vacuum.yaml#L23)

  *which uses:*
  - [input_boolean.cleaned_today](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L16)

### [Reminder notification](https://github.com/tmttn/home-assistant-config/blob/3b5071aff6730e662e670656f190d804a8e4b1a8/automations/vacuum.yaml#L37)

  *which uses:*
  - [binary_sensor.vacuum_day](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L186)

### [Cleanup if nobody is home](https://github.com/tmttn/home-assistant-config/blob/3b5071aff6730e662e670656f190d804a8e4b1a8/automations/vacuum.yaml#L51)

  *which uses:*
  - [input_boolean.cleaned_today](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L16)
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L22)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L19)
  - [binary_sensor.vacuum_day](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L186)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

### [Reset cleaned today](https://github.com/tmttn/home-assistant-config/blob/3b5071aff6730e662e670656f190d804a8e4b1a8/automations/vacuum.yaml#L86)

  *which uses:*
  - [input_boolean.cleaned_today](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L16)

### [Reset to standard mode](https://github.com/tmttn/home-assistant-config/blob/3b5071aff6730e662e670656f190d804a8e4b1a8/automations/vacuum.yaml#L95)


[^ toc](#automations---table-of-content)


## [Work 💼](https://github.com/tmttn/home-assistant-config/blob/a2dd2ab7acd889c8a0d251b9b111eca40da482b1/automations/work.yaml)
### [Go home notification](https://github.com/tmttn/home-assistant-config/blob/a2dd2ab7acd889c8a0d251b9b111eca40da482b1/automations/work.yaml#L11)

  *which uses:*
  - [input_boolean.work_hour_notification_sent](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L40)
  - [binary_sensor.worked_enough_today](https://github.com/tmttn/home-assistant-config/blob/270f0cf6c6fb65f0aea907646edddbc07d3a56c5/includes/binary_sensors.yaml#L165)

### [Reset input_boolean at midnight](https://github.com/tmttn/home-assistant-config/blob/a2dd2ab7acd889c8a0d251b9b111eca40da482b1/automations/work.yaml#L32)

  *which uses:*
  - [input_boolean.work_hour_notification_sent](https://github.com/tmttn/home-assistant-config/blob/73c8e0dcc0f5162a43d32b08615b5625e32afebb/includes/input_booleans.yaml#L40)

### [Tom left work notification for Tanja](https://github.com/tmttn/home-assistant-config/blob/a2dd2ab7acd889c8a0d251b9b111eca40da482b1/automations/work.yaml#L44)


[^ toc](#automations---table-of-content)


<!-- end-automations -->
