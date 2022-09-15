# Thomas Metten's Home Assistant config files
Based on Bas Nijholt's config files.

[![GitHub stars](https://img.shields.io/github/stars/tmttn/home-assistant-config.svg?style=plasticr)](https://github.com/tmttn/home-assistant-config/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/tmttn/home-assistant-config.svg?style=plasticr)](https://github.com/tmttn/home-assistant-config/commits/master)
[![HA Version](https://img.shields.io/badge/Running%20Home%20Asssistant-2022.9.4%20-darkblue)](https://github.com/home-assistant/core/releases/tag/2022.9.4)
[![HA Community](https://img.shields.io/badge/HA%20community-forum-orange)](https://community.home-assistant.io/u/tmttn/summary)
[![Yaml Lint](https://github.com/tmttn/home-assistant-config/actions/workflows/yamllint.yml/badge.svg)](https://github.com/tmttn/home-assistant-config/actions/workflows/yamllint.yml)

Using [iOS Light and Dark Mode Themes](https://github.com/basnijholt/lovelace-ios-themes).

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
- [Let's Encrypt](https://github.com/home-assistant/hassio-addons/tree/master/letsencrypt) version 4.12.0 by @home-assistant
- [MariaDB](https://github.com/home-assistant/hassio-addons/tree/master/mariadb) version 2.4.0 by @home-assistant
<!-- end-addons -->

<!-- start-automations -->
# Automations - Table of Content
1. [Adaptive lighting 🌄🌇](#adaptive-lighting-) (3 automations)
1. [Alarm clock ⏰](#alarm-clock-) (1 automations)
1. [Apple Watch ⌚](#apple-watch-) (9 automations)
1. [Arriving 👞](#arriving-) (1 automations)
1. [Candy 🍬🍭🍫](#candy-) (2 automations)
1. [Climate 🔥🥶](#climate-) (7 automations)
1. [Control switches 🎛](#control-switches-) (6 automations)
1. [Cube ∛](#cube-) (2 automations)
1. [Curtains 🪟🪟](#curtains-) (2 automations)
1. [Doorbell 🚪🔔](#doorbell-) (1 automations)
1. [Electric vehicle 🚗⚡️](#electric-vehicle-) (6 automations)
1. [Frontend 👨‍💻](#frontend-) (3 automations)
1. [Leaving 👞](#leaving-) (3 automations)
1. [Light 💡](#light-) (24 automations)
1. [Lovelace 👨‍💻](#lovelace-) (1 automations)
1. [Medication 💊](#medication-) (6 automations)
1. [Music 🎵](#music-) (2 automations)
1. [Plant 🌱](#plant-) (2 automations)
1. [Security 👮🚨](#security-) (4 automations)
1. [Night mode 🌕🌑](#night-mode-) (6 automations)
1. [Solar ☀️](#solar-) (1 automations)
1. [System 🖥](#system-) (4 automations)
1. [Utilities 🧺👚🍽](#utilities-) (7 automations)
1. [Vacation mode 🏝](#vacation-mode-) (2 automations)
1. [Vacuum 🧹](#vacuum-) (12 automations)
1. [Work 💼](#work-) (3 automations)


⚠️ Total number of automations: **120** ⚠️

## [Adaptive lighting 🌄🌇](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/adaptive_lighting.yaml)
### [Turn on and off switches](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/adaptive_lighting.yaml#L11)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)

### [Reset manual_control after 1 hour](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/adaptive_lighting.yaml#L61)


### [Notify manual_control](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/adaptive_lighting.yaml#L86)


[^ toc](#automations---table-of-content)


## [Alarm clock ⏰](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/alarm_clock.yaml)
### [Wake up](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/alarm_clock.yaml#L11)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L50)
  - [input_boolean.wake_up_light](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L67)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)
  - [sensor.ten_minutes_before_alarm](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L277)

[^ toc](#automations---table-of-content)


## [Apple Watch ⌚](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml)
### [Minimal lights bedroom](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml#L12)


### [Set sleep mode](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml#L27)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)

### [Set lights](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml#L71)

  *which uses:*
  - [script.cozy_lights_bedroom](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L55)
  - [script.cozy_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L28)
  - [script.turn_on_lights](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L382)
  - [script.white_lights_bedroom](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L111)
  - [script.white_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L97)

### [Temperature report](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml#L236)

  *which uses:*
  - [sensor.temperature_bathroom](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L338)
  - [sensor.temperature_bedroom](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L333)
  - [sensor.temperature_bedroom_marthe](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L348)
  - [sensor.temperature_kitchen](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L343)
  - [sensor.temperature_living_room](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L328)
  - [sensor.temperature_storage](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L353)

### [Send vacuum cleaner](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml#L259)

  *which uses:*
  - [script.vacuum_command](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L330)

### [Movie time](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml#L326)


### [Reset adaptive lighting](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml#L346)

  *which uses:*
  - [script.reset_adaptive_lighting](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L396)

### [Set temperature](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml#L356)


### [Where is other person?](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/apple_watch.yaml#L423)


[^ toc](#automations---table-of-content)


## [Arriving 👞](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/arriving.yaml)
### [Switch music from iPhone to speakers if no one is home](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/arriving.yaml#L13)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L22)

[^ toc](#automations---table-of-content)


## [Candy 🍬🍭🍫](https://github.com/tmttn/home-assistant-config/blob/d8cd2056ebaa27d3f8183af31eb8d38dd9235763/automations/candy.yaml)
### [Marthe candy button pressed](https://github.com/tmttn/home-assistant-config/blob/d8cd2056ebaa27d3f8183af31eb8d38dd9235763/automations/candy.yaml#L11)

  *which uses:*
  - [input_boolean.marthe_candy](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L59)

### [Reset input_boolean Marthe candy at midnight](https://github.com/tmttn/home-assistant-config/blob/d8cd2056ebaa27d3f8183af31eb8d38dd9235763/automations/candy.yaml#L75)

  *which uses:*
  - [input_boolean.marthe_candy](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L59)

[^ toc](#automations---table-of-content)


## [Climate 🔥🥶](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/automations/climate.yaml)
### [Turn on the heating 30 min before waking up](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/automations/climate.yaml#L11)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L50)
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L44)
  - [script.set_moderate_temperature](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L243)
  - [sensor.half_hour_before_alarm](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L268)

### [Increase the heating for the afternoon](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/automations/climate.yaml#L30)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L44)
  - [script.set_high_temperature](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L257)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L223)

### [Turn on the heating when going home](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/automations/climate.yaml#L46)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L44)
  - [input_number.temperature_high](https://github.com/tmttn/home-assistant-config/blob/b41ab6d693c223d1bb72368ee6a10a0322c82db8/includes/input_numbers.yaml#L28)
  - [script.set_high_temperature](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L257)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L223)

### [Turn off the heating at 23:00](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/automations/climate.yaml#L72)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L44)
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/b41ab6d693c223d1bb72368ee6a10a0322c82db8/includes/input_numbers.yaml#L12)
  - [script.set_high_temperature](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L257)
  - [script.set_low_temperature](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L229)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L223)

### [Warning when heating on and back door open](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/automations/climate.yaml#L106)

  *which uses:*
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/b41ab6d693c223d1bb72368ee6a10a0322c82db8/includes/input_numbers.yaml#L12)

### [Warning when heating on and living room door open](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/automations/climate.yaml#L151)

  *which uses:*
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/b41ab6d693c223d1bb72368ee6a10a0322c82db8/includes/input_numbers.yaml#L12)

### [Warning when heating on and storage door open](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/automations/climate.yaml#L196)

  *which uses:*
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/b41ab6d693c223d1bb72368ee6a10a0322c82db8/includes/input_numbers.yaml#L12)

[^ toc](#automations---table-of-content)


## [Control switches 🎛](https://github.com/tmttn/home-assistant-config/blob/3ff86a7b33de48888b5b358acd16db6870d946d4/automations/control_switches.yaml)
### [Living room Philips Hue dimmer switch](https://github.com/tmttn/home-assistant-config/blob/3ff86a7b33de48888b5b358acd16db6870d946d4/automations/control_switches.yaml#L12)

  *which uses:*
  - [input_select.last_script_living_room](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L26)
  - [script.decrease_brightness](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L160)
  - [script.increase_brightness](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L139)
  - [script.next_colors](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L216)
  - [script.white_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L97)

### [Back door Aqara Wireless Mini Switch](https://github.com/tmttn/home-assistant-config/blob/3ff86a7b33de48888b5b358acd16db6870d946d4/automations/control_switches.yaml#L60)

  *which uses:*
  - [script.arriving](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L277)
  - [script.set_low_temperature](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L229)
  - [script.start_spotify_playlist_of_nearest_person](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L11)
  - [script.turn_off_everything_non_automatic](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L183)

### [Bedroom wall switch](https://github.com/tmttn/home-assistant-config/blob/3ff86a7b33de48888b5b358acd16db6870d946d4/automations/control_switches.yaml#L90)


### [Bathroom wall switch](https://github.com/tmttn/home-assistant-config/blob/3ff86a7b33de48888b5b358acd16db6870d946d4/automations/control_switches.yaml#L107)


### [Guest bedroom Aqara Wireless Mini Switch 2](https://github.com/tmttn/home-assistant-config/blob/3ff86a7b33de48888b5b358acd16db6870d946d4/automations/control_switches.yaml#L129)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)
  - [script.turn_off_everything_non_automatic](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L183)

### [Guest bedroom Aqara Wireless Mini Switch](https://github.com/tmttn/home-assistant-config/blob/3ff86a7b33de48888b5b358acd16db6870d946d4/automations/control_switches.yaml#L129)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)
  - [script.turn_off_everything_non_automatic](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L183)

[^ toc](#automations---table-of-content)


## [Cube ∛](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/cube.yaml)
### [Perform operation](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/cube.yaml#L12)

  *which uses:*
  - [input_select.cube_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L19)
  - [script.start_spotify_playlist_of_nearest_person](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L11)

### [Rotate the cube](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/cube.yaml#L78)

  *which uses:*
  - [input_select.cube_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L19)

[^ toc](#automations---table-of-content)


## [Curtains 🪟🪟](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/curtains.yaml)
### [Open the screens](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/curtains.yaml#L11)


### [Close the screens](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/curtains.yaml#L28)


[^ toc](#automations---table-of-content)


## [Doorbell 🚪🔔](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/doorbell.yaml)
### [The doorbell has been pressed](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/doorbell.yaml#L11)


[^ toc](#automations---table-of-content)


## [Electric vehicle 🚗⚡️](https://github.com/tmttn/home-assistant-config/blob/4d186be2da1204e086c26875a47121a01164e3a1/automations/ev.yaml)
### [Polling interval to 60](https://github.com/tmttn/home-assistant-config/blob/4d186be2da1204e086c26875a47121a01164e3a1/automations/ev.yaml#L11)

  

  *which uses:*
  - [script.electric_vehicle_polling_interval_to_60](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L416)

### [Polling interval to default](https://github.com/tmttn/home-assistant-config/blob/4d186be2da1204e086c26875a47121a01164e3a1/automations/ev.yaml#L27)

  

  *which uses:*
  - [script.electric_vehicle_polling_interval_to_default](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L424)

### [Start charging at total solar](https://github.com/tmttn/home-assistant-config/blob/4d186be2da1204e086c26875a47121a01164e3a1/automations/ev.yaml#L43)

  

  *which uses:*
  - [input_boolean.optimal_electric_vehicle_charging](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L62)

### [Check total solar on plugin](https://github.com/tmttn/home-assistant-config/blob/4d186be2da1204e086c26875a47121a01164e3a1/automations/ev.yaml#L75)

  

  *which uses:*
  - [input_boolean.optimal_electric_vehicle_charging](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L62)

### [Update charge rate every minute](https://github.com/tmttn/home-assistant-config/blob/4d186be2da1204e086c26875a47121a01164e3a1/automations/ev.yaml#L103)

  

  *which uses:*
  - [input_boolean.optimal_electric_vehicle_charging](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L62)
  - [script.electric_vehicle_charging_set_amps_link_to_excess_solar](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L432)

### [Stop charging](https://github.com/tmttn/home-assistant-config/blob/4d186be2da1204e086c26875a47121a01164e3a1/automations/ev.yaml#L124)

  

  *which uses:*
  - [input_boolean.optimal_electric_vehicle_charging](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L62)

[^ toc](#automations---table-of-content)


## [Frontend 👨‍💻](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/frontend.yaml)
### [Turn on dark mode](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/frontend.yaml#L11)

  *which uses:*
  - [input_boolean.dark_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L33)

### [Turn on light mode](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/frontend.yaml#L23)

  *which uses:*
  - [input_boolean.dark_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L33)

### [Change theme](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/frontend.yaml#L35)

  *which uses:*
  - [input_boolean.dark_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L33)
  - [input_boolean.theme_alternative](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L36)
  - [input_select.theme](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L47)

[^ toc](#automations---table-of-content)


## [Leaving 👞](https://github.com/tmttn/home-assistant-config/blob/afd0637c7835d95b37036413311cfd571fbc2317/automations/leaving.yaml)
### [Automatically turn off everything](https://github.com/tmttn/home-assistant-config/blob/afd0637c7835d95b37036413311cfd571fbc2317/automations/leaving.yaml#L12)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L22)
  - [script.leaving](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L271)
  - [binary_sensor.anything_on](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L208)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L223)
  - [binary_sensor.someone_in_the_house_in_last_hour](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L51)

### [Ask to turn off everything](https://github.com/tmttn/home-assistant-config/blob/afd0637c7835d95b37036413311cfd571fbc2317/automations/leaving.yaml#L42)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L22)
  - [binary_sensor.anything_on](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L208)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L223)

### [Turn off everything after notification](https://github.com/tmttn/home-assistant-config/blob/afd0637c7835d95b37036413311cfd571fbc2317/automations/leaving.yaml#L77)

  *which uses:*
  - [script.leaving](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L271)

[^ toc](#automations---table-of-content)


## [Light 💡](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml)
### [Turn on living room](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L35)

  *which uses:*
  - [binary_sensor.activity_in_living_room](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L66)

### [Turn on cozy lights at sunset](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L45)

  *which uses:*
  - [script.cozy_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L28)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

### [Turn off living room](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L59)

  *which uses:*
  - [binary_sensor.activity_in_living_room](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L66)

### [Toggle kitchen ceiling](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L75)

  *which uses:*
  - [binary_sensor.activity_in_kitchen](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L83)

### [Toggle bathroom](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L102)

  *which uses:*
  - [binary_sensor.activity_in_bathroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L58)

### [Toggle toilet](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L120)

  *which uses:*
  - [binary_sensor.activity_in_toilet](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L76)

### [Automatically turn on the bedroom](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L146)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L38)
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L25)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)
  - [script.turn_on_lights](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L382)
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L109)

### [Automatically turn off the bedroom](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L177)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L38)
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L25)
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L109)

### [Turn off bedroom lights auto switch](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L201)

  *which uses:*
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L25)

### [Turn on automatic_bedroom_lights switch](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L232)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L38)

### [Turn off bedroom after 2 hours of inactivity](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L241)

  *which uses:*
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L109)

### [Automatically turn on the guest bedroom](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L261)

  *which uses:*
  - [input_boolean.automatic_guest_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L41)
  - [input_boolean.guest_bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L29)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)
  - [script.turn_on_lights](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L382)
  - [binary_sensor.activity_in_guest_bedroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L119)

### [Automatically turn off the guest bedroom](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L292)

  *which uses:*
  - [input_boolean.automatic_guest_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L41)
  - [input_boolean.guest_bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L29)
  - [binary_sensor.activity_in_guest_bedroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L119)

### [Turn off guest bedroom lights auto switch](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L316)

  *which uses:*
  - [input_boolean.guest_bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L29)

### [Turn on automatic_guest_bedroom_lights switch](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L343)

  *which uses:*
  - [input_boolean.automatic_guest_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L41)

### [Turn off guest bedroom after 2 hours of inactivity](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L352)

  *which uses:*
  - [binary_sensor.activity_in_guest_bedroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L119)

### [Turn on outside lights](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L372)


### [Turn off outside lights](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L388)


### [Turn on the outside lights when arriving](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L403)

  *which uses:*
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L223)

### [Turn off toilet (extra check)](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L437)

  In case the other automation failed

  *which uses:*
  - [binary_sensor.activity_in_toilet](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L76)

### [Turn off bathroom (extra check)](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L454)

  In case the other automation failed

  *which uses:*
  - [binary_sensor.activity_in_bathroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L58)

### [Turn off kitchen (extra check)](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L471)

  In case the other automation failed

  *which uses:*
  - [binary_sensor.activity_in_kitchen](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L83)

### [Turn off bedroom (extra check)](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L488)

  In case the other automation failed

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L38)
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L25)
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L109)

### [Turn off guest bedroom (extra check)](https://github.com/tmttn/home-assistant-config/blob/fe7781766c4d055de11f2270b9574dbbcf0ab00a/automations/light.yaml#L510)

  In case the other automation failed

  *which uses:*
  - [input_boolean.automatic_guest_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L41)
  - [input_boolean.guest_bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L29)
  - [binary_sensor.activity_in_guest_bedroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L119)

[^ toc](#automations---table-of-content)


## [Lovelace 👨‍💻](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/lovelace.yaml)
### [Convert lovelace.json to lovelace-ui.yaml](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/lovelace.yaml#L11)

  *which uses:*
  - [shell_command.chores](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/includes/shell_commands.yaml#L13)
  - [shell_command.convert_lovelace](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/includes/shell_commands.yaml#L11)

[^ toc](#automations---table-of-content)


## [Medication 💊](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/medication.yaml)
### [Marthe vitamin button pressed](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/medication.yaml#L11)

  *which uses:*
  - [input_boolean.marthe_vitamins](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L53)

### [Tom medication button pressed](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/medication.yaml#L47)

  *which uses:*
  - [input_boolean.tom_medication](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L56)

### [Marthe vitamin reminder](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/medication.yaml#L83)

  *which uses:*
  - [input_boolean.marthe_vitamins](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L53)

### [Tom medication reminder](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/medication.yaml#L108)

  *which uses:*
  - [input_boolean.tom_medication](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L56)

### [Reset input_boolean Marthe vitamins at midnight](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/medication.yaml#L133)

  *which uses:*
  - [input_boolean.marthe_vitamins](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L53)

### [Reset input_boolean Tom medication at midnight](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/medication.yaml#L146)

  *which uses:*
  - [input_boolean.tom_medication](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L56)

[^ toc](#automations---table-of-content)


## [Music 🎵](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/music.yaml)
### [Start playlist](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/music.yaml#L11)

  *which uses:*
  - [input_boolean.start_the_music](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L12)
  - [script.start_spotify_playlist_of_nearest_person](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L11)

### [Switch music from iPhone to speakers if coming home](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/music.yaml#L27)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L22)

[^ toc](#automations---table-of-content)


## [Plant 🌱](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/plant.yaml)
### [Problem with Calathea Medaillon](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/plant.yaml#L11)

  *which uses:*
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L19)

### [Problem with Peperomia Glabella](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/plant.yaml#L34)

  *which uses:*
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L19)

[^ toc](#automations---table-of-content)


## [Security 👮🚨](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/security.yaml)
### [Motion detected but we are not home](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/security.yaml#L11)

  *which uses:*
  - [binary_sensor.motion_detected](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L32)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

### [Front door has been open for more than 5 minutes](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/security.yaml#L49)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L22)

### [Back door has been open for more than 5 minutes](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/security.yaml#L67)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L22)

### [No one is home but high power usage](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/security.yaml#L85)

  *which uses:*
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L19)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L223)

[^ toc](#automations---table-of-content)


## [Night mode 🌕🌑](https://github.com/tmttn/home-assistant-config/blob/7f472b1061ad523d60d864cb6274f180a8060a60/automations/sleep_mode.yaml)
### [Automatically turn off when alarm turns off or at 7AM](https://github.com/tmttn/home-assistant-config/blob/7f472b1061ad523d60d864cb6274f180a8060a60/automations/sleep_mode.yaml#L12)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L50)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)

### [Turn off automatic bedroom lights](https://github.com/tmttn/home-assistant-config/blob/7f472b1061ad523d60d864cb6274f180a8060a60/automations/sleep_mode.yaml#L31)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L38)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)

### [Turn off automatic guest bedroom lights](https://github.com/tmttn/home-assistant-config/blob/7f472b1061ad523d60d864cb6274f180a8060a60/automations/sleep_mode.yaml#L41)

  *which uses:*
  - [input_boolean.automatic_guest_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L41)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)

### [Set low temperature when sleep mode turns on](https://github.com/tmttn/home-assistant-config/blob/7f472b1061ad523d60d864cb6274f180a8060a60/automations/sleep_mode.yaml#L51)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)
  - [script.set_low_temperature](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L229)

### [Go from half to total sleeping mode](https://github.com/tmttn/home-assistant-config/blob/7f472b1061ad523d60d864cb6274f180a8060a60/automations/sleep_mode.yaml#L60)

  When it is half sleeping mode and there is no activity in the house for more than an hour go to total sleeping mode.


  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)
  - [binary_sensor.activity_outside_bedroom](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L126)

### [Set sleeping mode in the living room](https://github.com/tmttn/home-assistant-config/blob/7f472b1061ad523d60d864cb6274f180a8060a60/automations/sleep_mode.yaml#L84)

  Set the living room lights to sleep mode only when no-one is there anymore.


  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/38e456cba91ebfcbb9513c6ebcb6e24b456701ea/includes/input_selects.yaml#L11)
  - [binary_sensor.activity_in_living_room](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L66)

[^ toc](#automations---table-of-content)


## [Solar ☀️](https://github.com/tmttn/home-assistant-config/blob/482f3eee62e47b0ae3ef82098aab93e6e863c845/automations/solar.yaml)
### [Grid export too high](https://github.com/tmttn/home-assistant-config/blob/482f3eee62e47b0ae3ef82098aab93e6e863c845/automations/solar.yaml#L11)

  *which uses:*
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L19)
  - [sensor.nearest_iphone_notify](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L256)

[^ toc](#automations---table-of-content)


## [System 🖥](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/system.yaml)
### [Warning about high CPU usage](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/system.yaml#L11)


### [Update DNS](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/system.yaml#L25)

  Update the DNS at Gandi to point my domain to my Home Assistant instance.

  *which uses:*
  - [script.update_dns](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L283)

### [Run chores](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/system.yaml#L34)

  Run shell and Python scripts in utils folder.

  *which uses:*
  - [shell_command.chores](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/includes/shell_commands.yaml#L13)

### [Battery level low](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/system.yaml#L42)


[^ toc](#automations---table-of-content)


## [Utilities 🧺👚🍽](https://github.com/tmttn/home-assistant-config/blob/8956c4a0533327b790bfe940009325d42877a613/automations/utilities.yaml)
### [Turn on espresso machine 10 minutes before waking up](https://github.com/tmttn/home-assistant-config/blob/8956c4a0533327b790bfe940009325d42877a613/automations/utilities.yaml#L13)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L50)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L19)
  - [sensor.half_hour_before_alarm](https://github.com/tmttn/home-assistant-config/blob/aaaa4085cb90a78244f20fdeed31fe9cfba58a22/includes/sensors.yaml#L268)

### [Washing machine, dishwasher,tumble dryer or espresso machine started or finished](https://github.com/tmttn/home-assistant-config/blob/8956c4a0533327b790bfe940009325d42877a613/automations/utilities.yaml#L30)

  *which uses:*
  - [binary_sensor.dishwasher](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L151)
  - [binary_sensor.espresso_machine](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L164)
  - [binary_sensor.tumble_dryer](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L177)
  - [binary_sensor.washing_machine](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L138)

### [Washing machine notification](https://github.com/tmttn/home-assistant-config/blob/8956c4a0533327b790bfe940009325d42877a613/automations/utilities.yaml#L52)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L292)
  - [binary_sensor.washing_machine](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L138)

### [Dishwasher notification](https://github.com/tmttn/home-assistant-config/blob/8956c4a0533327b790bfe940009325d42877a613/automations/utilities.yaml#L65)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L292)
  - [binary_sensor.dishwasher](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L151)

### [Tumble dryer notification](https://github.com/tmttn/home-assistant-config/blob/8956c4a0533327b790bfe940009325d42877a613/automations/utilities.yaml#L78)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L292)
  - [binary_sensor.tumble_dryer](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L177)

### [Espresso machine notification](https://github.com/tmttn/home-assistant-config/blob/8956c4a0533327b790bfe940009325d42877a613/automations/utilities.yaml#L91)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/6fbc37e4848dd3fd6a15a5a6178e3ad0904f158c/scripts.yaml#L292)
  - [binary_sensor.espresso_machine](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L164)

### [Toggle espresso machine on/off](https://github.com/tmttn/home-assistant-config/blob/8956c4a0533327b790bfe940009325d42877a613/automations/utilities.yaml#L104)


[^ toc](#automations---table-of-content)


## [Vacation mode 🏝](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/vacation_mode.yaml)
### [Auto turn on](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/vacation_mode.yaml#L11)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L22)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L19)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

### [Auto turn off](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/vacation_mode.yaml#L32)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L22)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L19)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

[^ toc](#automations---table-of-content)


## [Vacuum 🧹](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml)
### [Started cleaning](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L11)


### [Stopped cleaning](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L24)

  *which uses:*
  - [input_boolean.cleaned_today](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L16)

### [Reminder notification](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L41)

  *which uses:*
  - [binary_sensor.vacuum_day](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L216)

### [Cleanup if nobody is home](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L56)

  *which uses:*
  - [input_boolean.cleaned_today](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L16)
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L22)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L19)
  - [binary_sensor.vacuum_day](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L216)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b7f53da6358ab0c08b149ed1918a811a74d644ae/includes/groups.yaml#L11)

### [Reset cleaned today](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L92)

  *which uses:*
  - [input_boolean.cleaned_today](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L16)

### [Reset to standard mode](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L102)


### [Bin is full](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L114)


### [Water reservoir empty](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L132)


### [Sensors need cleaning](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L179)


### [Main brush needs replacing](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L196)


### [Side brush needs replacing](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L213)


### [Air filter needs replacing](https://github.com/tmttn/home-assistant-config/blob/28d58de86b6c5ab1c647fec4b4ed452365c37ad8/automations/vacuum.yaml#L230)


[^ toc](#automations---table-of-content)


## [Work 💼](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/work.yaml)
### [Go home notification](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/work.yaml#L11)

  *which uses:*
  - [input_boolean.work_hour_notification_sent](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L47)
  - [binary_sensor.worked_enough_today](https://github.com/tmttn/home-assistant-config/blob/03cc151436c6eeac42e8a4a327895b09cabda73d/includes/binary_sensors.yaml#L190)

### [Reset input_boolean at midnight](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/work.yaml#L33)

  *which uses:*
  - [input_boolean.work_hour_notification_sent](https://github.com/tmttn/home-assistant-config/blob/6e36f4589a0ba47491db8d6d3149a76a8638643c/includes/input_booleans.yaml#L47)

### [Tom left work notification for Tanja](https://github.com/tmttn/home-assistant-config/blob/a01261ff225ba473e8ee9a80a4bdcc04fe402662/automations/work.yaml#L46)


[^ toc](#automations---table-of-content)


<!-- end-automations -->
