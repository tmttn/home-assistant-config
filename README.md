# Thomas Metten's Home Assistant config files
(Originally Bas Nijholt's config files, leaving quite some information in the readme for future reference)

[![GitHub stars](https://img.shields.io/github/stars/tmttn/home-assistant-config.svg?style=plasticr)](https://github.com/tmttn/home-assistant-config/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/tmttn/home-assistant-config.svg?style=plasticr)](https://github.com/tmttn/home-assistant-config/commits/master)
[![HA Version](https://img.shields.io/badge/Running%20Home%20Asssistant-2021.11.3%20-darkblue)](https://github.com/home-assistant/core/releases/tag/2021.11.3)
[![HA Community](https://img.shields.io/badge/HA%20community-forum-orange)](https://community.home-assistant.io/u/tmttn/summary)
[![Yaml Lint](https://github.com/tmttn/home-assistant-config/workflows/Yaml%20Lint/badge.svg)](https://github.com/tmttn/home-assistant-config/actions?query=workflow%3A%22Yaml+Lint%22)

![Lovelace UI](http://files.nijho.lt/ha-ui.gif)
<img src="https://github.com/tmttn/home-assistant-macbook-touch-bar/raw/master/example-real-life.jpg?s=400" width="700" alt="MacBook touchbar">

Using my [iOS Light and Dark Mode Themes](https://github.com/basnijholt/lovelace-ios-themes).

See also [my guide for my girlfriend ❤️](guide.md).

## Table of content

- [My devices](#my-devices)
- [Supervisor add-ons](#supervisor-add-ons)
- [All my automations](#automations---table-of-content)

## Noteworthy (useful) automations

See _all_ my automations and its dependencies [down the page](#automations---table-of-content)!

- [Alarm clock](#alarm-clock-) that uses the AppDaemon volume ramp and sunrise app ⏰
- [Automatic `lovelace.json` to `lovelace-ui.yaml` converter](#lovelace-) for version control 🤖
- [Controlling music and lights (hue and brightness) using the Xiaomi Aqara Magic Cube](#cube-) ∛
- [Controlling the lights using _Phillips Hue Dimmers_ the _Xiaomi Aqara Smart Switches_](#control-switches-) 🎛
- [Automated lights](#light-) 💡
- [Presence detection in different rooms based on various binary template sensors](includes/binary_sensors.yaml)
- [Robot vacuum automations](#vacuum-) 🧹
- [Arriving](#arriving-) and [leaving](#leaving-) automations
- [Notifications when the dishwasher or washing machine is done](#utilities-)
- [Time at work 📈 tracking and notifications to go home](#work-)
- Using [HA-Menu](https://github.com/codechimp-org/ha-menu) to control [my speakers on my iMac](#lsx-)
- Using [home-assistant-macbook-touch-bar](https://github.com/tmttn/home-assistant-macbook-touch-bar) to control HA on my MacBook Pro's Touch Bar 💻
- [Automatically switch Lovelace's theme between backgrounds and light/dark mode](#frontend-)
- [Sync volume TV ⇄ speakers 🔊](#media-player-)
- [Security notifications when the front door 🚪 has been open for too long or motion is detected when no one is home](#security-)

## Cool AppDaemon apps

- [Sunrise emulator app](appdaemon/apps/wake_up_light.py) 🌅
- [Wake up with Spotify app](appdaemon/apps/wake_up_with_spotify.py) that slowly ramps the volume 📢
- [Low Battery level notifications 🔋](appdaemon/apps/battery_monitor.py)

## Popular Reddit posts of features in this config

(Sorted from new to old)

- [Advanced control from my Apple Watch using single automations: setting lights, vacuum, temperature, sleep mode, and more!](https://www.reddit.com/r/homeassistant/comments/jdcal1/advanced_control_from_my_apple_watch_using_single/)
- [HA has it before Apple has even finished it, I present: Adaptive_lighting! flux/circadian_lighting fans (haters?) please try the new UI configurable component that stops automatically adjusting your lights when you make a manual change 🎉 (and many more new useful features!)](https://www.reddit.com/r/homeassistant/comments/jabhso/ha_has_it_before_apple_has_even_finished_it_i/)
- [Creating useful notifications using the new 'variables' and 'wait_for_trigger' features](https://www.reddit.com/r/homeassistant/comments/ixnr5z/creating_useful_notifications_using_the_new/)
- [Copying YAML from GitHub is easier than ever: my config's README now automatically lists all automations (and entities it uses) with links to the relevant parts in the YAML](https://www.reddit.com/r/homeassistant/comments/if2n1h/copying_yaml_from_github_is_easier_than_ever_my/)
- [Beautiful iOS dark and light mode inspired themes with easy background switch (that now also change the top header color!) [OC]](https://www.reddit.com/r/homeassistant/comments/h9ckpt/beautiful_ios_dark_and_light_mode_inspired_themes/)
- [Finally a good use for the touch bar on my Macbook Pro!](https://www.reddit.com/r/homeassistant/comments/gyd5wd/finally_a_good_use_for_the_touch_bar_on_my/)
- [100% control over my high fi speakers: a bidirectional synchronized equalizer](https://www.reddit.com/r/homeassistant/comments/gkjbfh/100_control_over_my_high_fi_speakers_a/)
- [COVID-19 forcing me to stay inside? Check out my "quarantine-o-meter" that displays how much time (in %) we've been inside.](https://www.reddit.com/r/homeassistant/comments/fqudzw/covid19_forcing_me_to_stay_inside_check_out_my/)
- [After a lot of love, a much-requested feature (+more!) for my iOS Dark Theme [OC]](https://www.reddit.com/r/homeassistant/comments/ex7mve/after_a_lot_of_love_a_muchrequested_feature_more/)
- [I can now sync the speaker volume using the menu bar of my iMac! [OC]](https://www.reddit.com/r/homeassistant/comments/eri64c/i_can_now_sync_the_speaker_volume_using_the_menu/)
- [I keep seeing my own theme on Reddit, so now it's my turn! [OC]](https://www.reddit.com/r/homeassistant/comments/enpeik/i_keep_seeing_my_own_theme_on_reddit_so_now_its/)

## Ideas?

- Notify us when the window is open and it is raining.
- Add budget keeper using the Bunq API

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
            <td>1</td>
            <td>35.84</td>
            <td>35.84</td>
        </tr>
        <tr>
            <td>Xiaomi Aqara Magic Cube</td>
            <td>1</td>
            <td>11.08</td>
            <td>11.08</td>
        </tr>
        <tr>
            <td>Xiaomi Aqara Single Button</td>
            <td>4</td>
            <td>14.35</td>
            <td>57.38</td>
        </tr>
        <tr>
            <td>Philips Hue Dimmer switch</td>
            <td>2</td>
            <td>16.61</td>
            <td>33.22</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>137.52</td>
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
            <td>Xiaomi Aqara Door Sensor</td>
            <td>4</td>
            <td>8.18</td>
            <td>32.71</td>
        </tr>
        <tr>
            <td>Xiaomi Aqara Temperature Sensor</td>
            <td>5</td>
            <td>9.15</td>
            <td>45.74</td>
        </tr>
        <tr>
            <td>Xiaomi Aqara Motion Sensor</td>
            <td>10</td>
            <td>9.79</td>
            <td>97.85</td>
        </tr>
        <tr>
            <td>Xiaomi Aqara Vibration Sensor</td>
            <td>1</td>
            <td>11.59</td>
            <td>11.59</td>
        </tr>
        <tr>
            <td>Xiaomi Mi Flora</td>
            <td>3</td>
            <td>15.54</td>
            <td>46.63</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>234.52</td>
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
            <td>Xiaomi Mi Roborock S5</td>
            <td>1</td>
            <td>294.31</td>
            <td>294.31</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>294.31</td>
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
            <td>KEF LS50 Wireless speakers</td>
            <td>1</td>
            <td>nan</td>
            <td>nan</td>
        </tr>
        <tr>
            <td>KEF LSX speakers</td>
            <td>1</td>
            <td>nan</td>
            <td>nan</td>
        </tr>
        <tr>
            <td>LG OLED 55 C9</td>
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
            <th>Lights 💡</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Philips Hue E27 White and Color</td>
            <td>12</td>
            <td>22.22</td>
            <td>266.7</td>
        </tr>
        <tr>
            <td>Philips Hue E14 White and Color</td>
            <td>2</td>
            <td>34.88</td>
            <td>69.77</td>
        </tr>
        <tr>
            <td>Philips Hue GU10 Ambient White</td>
            <td>5</td>
            <td>18.54</td>
            <td>92.7</td>
        </tr>
        <tr>
            <td>Philips Hue Go</td>
            <td>1</td>
            <td>57.05</td>
            <td>57.05</td>
        </tr>
        <tr>
            <td>Philips Hue LED strip 2m</td>
            <td>2</td>
            <td>43.2</td>
            <td>86.39</td>
        </tr>
        <tr>
            <td>Philips Hue LED strip 1m</td>
            <td>1</td>
            <td>13.84</td>
            <td>13.84</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>586.45</td>
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
            <td>39.95</td>
            <td>39.95</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>39.95</td>
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
            <td>Intel NUC Kit NUC8i3BEH</td>
            <td>1</td>
            <td>278.3</td>
            <td>278.3</td>
        </tr>
        <tr>
            <td>8 GB Crucial CT8G4SFS824A DDR4</td>
            <td>2</td>
            <td>25.52</td>
            <td>51.04</td>
        </tr>
        <tr>
            <td>Samsung 970 EVO M.2 500GB</td>
            <td>1</td>
            <td>94.99</td>
            <td>94.99</td>
        </tr>
        <tr>
            <td>Raspberry Pi 4, 4GB RAM (connected to power/gas meter and connected over MQTT to main HA instance)</td>
            <td>1</td>
            <td>70.9</td>
            <td>70.9</td>
        </tr>
        <tr>
            <td>Raspberry Pi 4 FLIRC Case</td>
            <td>1</td>
            <td>25.85</td>
            <td>25.85</td>
        </tr>
        <tr>
            <td>SanDisk Ultra microSDHC Memory Card 32GB</td>
            <td>1</td>
            <td>6.99</td>
            <td>6.99</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>528.07</td>
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
            <td>iPhone X with the iOS app</td>
            <td>1</td>
            <td>nan</td>
            <td>nan</td>
        </tr>
        <tr>
            <td>iPhone SE2 with the iOS app</td>
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
            <th>Other</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>PlayStation Eye Webcam and Microphone array</td>
            <td>1</td>
            <td>14.95</td>
            <td>14.95</td>
        </tr>
        <tr>
            <td>DSMR - Slimme Meter kabel</td>
            <td>1</td>
            <td>19.95</td>
            <td>19.95</td>
        </tr>
        <tr>
            <td>Nodo-Shop – OpenTherm Gateway (OTGW) with NodeMCU</td>
            <td>1</td>
            <td>48.81</td>
            <td>48.81</td>
        </tr>
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>83.71</td>
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
            <th>€1904.53</th>
        </tr>
    </thead>
</table>
<!-- end-table -->

# Supervisor add-ons

I run a [Supervised install](https://www.home-assistant.io/getting-started/) with the following add-ons:

<!-- start-addons -->

- [Docker Container Stats](https://github.com/Poeschl/Hassio-Addons/tree/master/container-stats) version 1.4.0 by @Poeschl
- [Syncthing](https://github.com/Poeschl/Hassio-Addons/tree/master/syncthing) version 1.12.0 by @Poeschl
- [otmonitor](https://github.com/tmttn/addon-otmonitor) version dev by @basnijholt
- [AppDaemon 4](https://github.com/hassio-addons/addon-appdaemon) version 0.7.0 by @hassio-addons
- [Glances](https://github.com/hassio-addons/addon-glances) version 0.13.0 by @hassio-addons
- [Grafana](https://github.com/hassio-addons/addon-grafana) version 7.2.0 by @hassio-addons
- [InfluxDB](https://github.com/hassio-addons/addon-influxdb) version 4.2.1 by @hassio-addons
- [Log Viewer](https://github.com/hassio-addons/addon-log-viewer) version 0.12.0 by @hassio-addons
- [SSH & Web Terminal](https://github.com/hassio-addons/addon-ssh) version 9.0.1 by @hassio-addons
- [Visual Studio Code](https://github.com/hassio-addons/addon-vscode) version 3.6.2 by @hassio-addons
- [motionEye](https://github.com/hassio-addons/addon-motioneye) version 0.15.1 by @hassio-addons
- [phpMyAdmin](https://github.com/hassio-addons/addon-phpmyadmin) version 0.5.0 by @hassio-addons
- [File editor](https://github.com/home-assistant/hassio-addons/tree/master/configurator) version 5.3.3 by @home-assistant
- [Let's Encrypt](https://github.com/home-assistant/hassio-addons/tree/master/letsencrypt) version 4.11.0 by @home-assistant
- [MariaDB](https://github.com/home-assistant/hassio-addons/tree/master/mariadb) version 2.4.0 by @home-assistant
- [Mosquitto broker](https://github.com/home-assistant/hassio-addons/tree/master/mosquitto) version 6.0.1 by @home-assistant
- [Samba share](https://github.com/home-assistant/hassio-addons/tree/master/samba) version 9.5.1 by @home-assistant
- [deCONZ](https://github.com/home-assistant/hassio-addons/tree/master/deconz) version 6.10.0 by @home-assistant
- [Home Assistant Google Drive Backup](https://github.com/sabeechen/hassio-google-drive-backup) version 0.105.2 by @sabeechen
- [Rhasspy Assistant 2.5](https://github.com/synesthesiam/hassio-addons/tree/master/rhasspy) version 2.5.7.2 by @synesthesiam
<!-- end-addons -->

<!-- start-automations -->
# Automations - Table of Content
1. [Adaptive lighting 🌄🌇](#adaptive-lighting-) (3 automations)
1. [Alarm clock ⏰](#alarm-clock-) (1 automations)
1. [Apple Watch ⌚](#apple-watch-) (9 automations)
1. [Arriving 👞](#arriving-) (1 automations)
1. [Climate 🔥🥶](#climate-) (7 automations)
1. [Frontend 👨‍💻](#frontend-) (3 automations)
1. [Leaving 👞](#leaving-) (3 automations)
1. [Light 💡](#light-) (14 automations)
1. [Lovelace 👨‍💻](#lovelace-) (1 automations)
1. [Security 👮🚨](#security-) (1 automations)
1. [Night mode 🌕🌑](#night-mode-) (5 automations)
1. [System 🖥](#system-) (4 automations)
1. [Utilities 🧺👚🍽](#utilities-) (5 automations)
1. [Vacation mode 🏝](#vacation-mode-) (2 automations)
1. [Vacuum 🧹](#vacuum-) (6 automations)
1. [Work 💼](#work-) (3 automations)


⚠️ Total number of automations: **68** ⚠️

## [Adaptive lighting 🌄🌇](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/adaptive_lighting.yaml)
### [Turn on and off switches](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/adaptive_lighting.yaml#L11)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L11)

### [Reset manual_control after 1 hour](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/adaptive_lighting.yaml#L60)


### [Notify manual_control](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/adaptive_lighting.yaml#L84)


[^ toc](#automations---table-of-content)


## [Alarm clock ⏰](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/automations/alarm_clock.yaml)
### [Wake up](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/automations/alarm_clock.yaml#L11)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L46)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L11)
  - [sensor.ten_minutes_before_alarm](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/includes/sensors.yaml#L135)

[^ toc](#automations---table-of-content)


## [Apple Watch ⌚](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml)
### [Minimal lights bedroom](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml#L12)


### [Set sleep mode](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml#L26)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L11)

### [Set lights](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml#L56)

  *which uses:*
  - [script.cozy_lights_bedroom](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L32)
  - [script.cozy_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L11)
  - [script.turn_on_lights](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L323)
  - [script.white_lights_living_room](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L53)

### [Temperature report](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml#L146)

  *which uses:*
  - [sensor.temperature_bedroom](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/includes/sensors.yaml#L218)
  - [sensor.temperature_living_room](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/includes/sensors.yaml#L214)

### [Send vacuum cleaner](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml#L165)

  *which uses:*
  - [script.vacuum_command](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L271)

### [Movie time](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml#L194)


### [Reset adaptive lighting](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml#L213)

  *which uses:*
  - [script.reset_adaptive_lighting](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L337)

### [Set temperature](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml#L222)


### [Where is other person?](https://github.com/tmttn/home-assistant-config/blob/d1f86df5050474174cb92b4a267a16d384d269fc/automations/apple_watch.yaml#L252)


[^ toc](#automations---table-of-content)


## [Arriving 👞](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/automations/arriving.yaml)
### [Switch music from iPhone to speakers if no one is home](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/automations/arriving.yaml#L13)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L22)

[^ toc](#automations---table-of-content)


## [Climate 🔥🥶](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/climate.yaml)
### [Turn on the bathroom heating in the early morning](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/climate.yaml#L12)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L40)
  - [input_number.temperature_moderate](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L20)
  - [script.set_moderate_temperature_bathroom](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L159)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L174)

### [Turn off the bathroom heating in the morning](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/climate.yaml#L31)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L40)
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L12)
  - [script.set_low_temperature_bathroom](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L149)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L174)

### [Turn on the heating 30 min before waking up](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/climate.yaml#L49)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L46)
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L40)
  - [script.set_moderate_temperature](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L183)
  - [sensor.half_hour_before_alarm](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/includes/sensors.yaml#L127)

### [Increase the heating for the afternoon](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/climate.yaml#L67)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L40)
  - [script.set_high_temperature](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L197)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L174)

### [Turn on the heating when going home](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/climate.yaml#L82)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L40)
  - [input_number.temperature_high](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L28)
  - [script.set_high_temperature](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L197)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L174)

### [Turn off the heating at 23:00](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/climate.yaml#L107)

  *which uses:*
  - [input_boolean.automatic_temperature](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L40)
  - [input_number.temperature_low](https://github.com/tmttn/home-assistant-config/blob/7190cafed4d9b9568773e21fdc9752116da85fb6/includes/input_numbers.yaml#L12)
  - [script.set_low_temperature](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L169)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L174)

### [Turn on heating again after notification](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/climate.yaml#L128)

  *which uses:*
  - [script.set_high_temperature](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L197)

[^ toc](#automations---table-of-content)


## [Frontend 👨‍💻](https://github.com/tmttn/home-assistant-config/blob/3c726d44bdbeb63d604ea12e03c6ba2cda5d05dd/automations/frontend.yaml)
### [Turn on dark mode](https://github.com/tmttn/home-assistant-config/blob/3c726d44bdbeb63d604ea12e03c6ba2cda5d05dd/automations/frontend.yaml#L11)

  *which uses:*
  - [input_boolean.dark_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L32)

### [Turn on light mode](https://github.com/tmttn/home-assistant-config/blob/3c726d44bdbeb63d604ea12e03c6ba2cda5d05dd/automations/frontend.yaml#L22)

  *which uses:*
  - [input_boolean.dark_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L32)

### [Change theme](https://github.com/tmttn/home-assistant-config/blob/3c726d44bdbeb63d604ea12e03c6ba2cda5d05dd/automations/frontend.yaml#L33)

  *which uses:*
  - [input_boolean.dark_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L32)
  - [input_boolean.theme_alternative](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L35)
  - [input_select.theme](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L46)

[^ toc](#automations---table-of-content)


## [Leaving 👞](https://github.com/tmttn/home-assistant-config/blob/968319fa18169c998fb9c939323ff2110f48d3dd/automations/leaving.yaml)
### [Automatically turn off everything](https://github.com/tmttn/home-assistant-config/blob/968319fa18169c998fb9c939323ff2110f48d3dd/automations/leaving.yaml#L12)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L22)
  - [script.leaving](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L211)
  - [binary_sensor.anything_on](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L159)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L174)
  - [binary_sensor.someone_in_the_house_in_last_hour](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L38)

### [Ask to turn off everything](https://github.com/tmttn/home-assistant-config/blob/968319fa18169c998fb9c939323ff2110f48d3dd/automations/leaving.yaml#L40)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L22)
  - [binary_sensor.anything_on](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L159)
  - [binary_sensor.no_one_home](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L174)

### [Turn off everything after notification](https://github.com/tmttn/home-assistant-config/blob/968319fa18169c998fb9c939323ff2110f48d3dd/automations/leaving.yaml#L70)

  *which uses:*
  - [script.leaving](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L211)

[^ toc](#automations---table-of-content)


## [Light 💡](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml)
### [Turn on living room](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L35)

  *which uses:*
  - [binary_sensor.activity_in_living_room](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L51)

### [Turn off living room](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L44)

  *which uses:*
  - [binary_sensor.activity_in_living_room](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L51)

### [Toggle kitchen ceiling](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L59)

  *which uses:*
  - [binary_sensor.activity_in_kitchen](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L65)

### [Toggle bathroom](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L76)

  *which uses:*
  - [binary_sensor.activity_in_bathroom](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L44)

### [Toggle toilet](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L92)

  *which uses:*
  - [binary_sensor.activity_in_toilet](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L59)

### [Automatically turn on the bedroom](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L108)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L37)
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L28)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L11)
  - [script.turn_on_lights](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L323)
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L78)

### [Automatically turn off the bedroom](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L138)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L37)
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L28)
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L78)

### [Turn off bedroom lights auto switch](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L161)

  *which uses:*
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L28)

### [Turn on automatic_bedroom_lights switch](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L187)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L37)

### [Turn off bedroom after 2 hours of inactivity](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L195)

  *which uses:*
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L78)

### [Turn off toilet (extra check)](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L214)

  In case the other automation failed

  *which uses:*
  - [binary_sensor.activity_in_toilet](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L59)

### [Turn off bathroom (extra check)](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L230)

  In case the other automation failed

  *which uses:*
  - [binary_sensor.activity_in_bathroom](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L44)

### [Turn off kitchen (extra check)](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L246)

  In case the other automation failed

  *which uses:*
  - [binary_sensor.activity_in_kitchen](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L65)

### [Turn off bedroom (extra check)](https://github.com/tmttn/home-assistant-config/blob/9a49542e5608865134ebc5fc93e8141898c8bfe7/automations/light.yaml#L262)

  In case the other automation failed

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L37)
  - [input_boolean.bedroom_lights_automatically_turned_on](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L28)
  - [binary_sensor.activity_in_bedroom](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L78)

[^ toc](#automations---table-of-content)


## [Lovelace 👨‍💻](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/lovelace.yaml)
### [Convert lovelace.json to lovelace-ui.yaml](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/lovelace.yaml#L11)

  *which uses:*
  - [shell_command.chores](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/includes/shell_commands.yaml#L13)
  - [shell_command.convert_lovelace](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/includes/shell_commands.yaml#L11)

[^ toc](#automations---table-of-content)


## [Security 👮🚨](https://github.com/tmttn/home-assistant-config/blob/0019ae88fb5510ece6959d03ade5776bab8c3d0d/automations/security.yaml)
### [Motion detected but we are not home](https://github.com/tmttn/home-assistant-config/blob/0019ae88fb5510ece6959d03ade5776bab8c3d0d/automations/security.yaml#L11)

  *which uses:*
  - [binary_sensor.motion_detected](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L22)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b6a4185a0aa26fd620862f75286c602812de29c6/includes/groups.yaml#L11)

[^ toc](#automations---table-of-content)


## [Night mode 🌕🌑](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml)
### [Automatically turn off when alarm turns off or at 7AM](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L12)

  *which uses:*
  - [input_boolean.alarm_clock](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L46)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L11)

### [Turn off automatic bedroom lights](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L30)

  *which uses:*
  - [input_boolean.automatic_bedroom_lights](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L37)
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L11)

### [Set low temperature when sleep mode turns on](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L39)

  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L11)
  - [script.set_low_temperature](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L169)

### [Go from half to total sleeping mode](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L47)

  When it is half sleeping mode and there is no activity in the house for more than an hour go to total sleeping mode.


  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L11)
  - [binary_sensor.activity_outside_bedroom](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L87)

### [Set sleeping mode in the living room](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/sleep_mode.yaml#L70)

  Set the living room lights to sleep mode only when no-one is there anymore.


  *which uses:*
  - [input_select.sleep_mode](https://github.com/tmttn/home-assistant-config/blob/6ff88a0bfdb743ffe33f49b051cd50470ae4cad7/includes/input_selects.yaml#L11)
  - [binary_sensor.activity_in_living_room](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L51)

[^ toc](#automations---table-of-content)


## [System 🖥](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/system.yaml)
### [Warning about high CPU usage](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/system.yaml#L11)


### [Update DNS](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/system.yaml#L24)

  Update the DNS at Gandi to point my domain to my Home Assistant instance.

  *which uses:*
  - [script.update_dns](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L223)

### [Run chores](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/system.yaml#L32)

  Run shell and Python scripts in utils folder.

  *which uses:*
  - [shell_command.chores](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/includes/shell_commands.yaml#L13)

### [Battery level low](https://github.com/tmttn/home-assistant-config/blob/fe4de30e51e10dc860bd96ce7d49482d29b6a986/automations/system.yaml#L40)


[^ toc](#automations---table-of-content)


## [Utilities 🧺👚🍽](https://github.com/tmttn/home-assistant-config/blob/79c36afaae28ae475a7185367e58b4ad12f8df89/automations/utilities.yaml)
### [Washing machine, dishwasher,tumble dryer or espresso machine started or finished](https://github.com/tmttn/home-assistant-config/blob/79c36afaae28ae475a7185367e58b4ad12f8df89/automations/utilities.yaml#L12)

  *which uses:*
  - [binary_sensor.dishwasher](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L109)
  - [binary_sensor.espresso_machine](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L121)
  - [binary_sensor.tumble_dryer](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L133)
  - [binary_sensor.washing_machine](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L97)

### [Washing machine notification](https://github.com/tmttn/home-assistant-config/blob/79c36afaae28ae475a7185367e58b4ad12f8df89/automations/utilities.yaml#L33)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L232)

### [Dishwasher notification](https://github.com/tmttn/home-assistant-config/blob/79c36afaae28ae475a7185367e58b4ad12f8df89/automations/utilities.yaml#L45)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L232)
  - [binary_sensor.dishwasher](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L109)

### [Tumble dryer notification](https://github.com/tmttn/home-assistant-config/blob/79c36afaae28ae475a7185367e58b4ad12f8df89/automations/utilities.yaml#L57)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L232)
  - [binary_sensor.tumble_dryer](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L133)

### [Espresso machine notification](https://github.com/tmttn/home-assistant-config/blob/79c36afaae28ae475a7185367e58b4ad12f8df89/automations/utilities.yaml#L69)

  *which uses:*
  - [script.utility_notification](https://github.com/tmttn/home-assistant-config/blob/f9c2ddd137593d9a34f2fbf16797414a126a8dda/scripts.yaml#L232)
  - [binary_sensor.tumble_dryer](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L133)

[^ toc](#automations---table-of-content)


## [Vacation mode 🏝](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/vacation_mode.yaml)
### [Auto turn on](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/vacation_mode.yaml#L11)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L22)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L19)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b6a4185a0aa26fd620862f75286c602812de29c6/includes/groups.yaml#L11)

### [Auto turn off](https://github.com/tmttn/home-assistant-config/blob/e00247ae9b598514c26927401e439f3af4c4cf1a/automations/vacation_mode.yaml#L31)

  *which uses:*
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L22)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L19)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b6a4185a0aa26fd620862f75286c602812de29c6/includes/groups.yaml#L11)

[^ toc](#automations---table-of-content)


## [Vacuum 🧹](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/vacuum.yaml)
### [Started cleaning](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/vacuum.yaml#L11)


### [Stopped cleaning](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/vacuum.yaml#L23)

  *which uses:*
  - [input_boolean.cleaned_today](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L16)

### [Reminder notification](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/vacuum.yaml#L37)

  *which uses:*
  - [binary_sensor.vacuum_day](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L168)

### [Cleanup if nobody is home](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/vacuum.yaml#L51)

  *which uses:*
  - [input_boolean.cleaned_today](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L16)
  - [input_boolean.guest_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L22)
  - [input_boolean.vacation_mode](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L19)
  - [binary_sensor.vacuum_day](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L168)
  - [group.persons](https://github.com/tmttn/home-assistant-config/blob/b6a4185a0aa26fd620862f75286c602812de29c6/includes/groups.yaml#L11)

### [Reset cleaned today](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/vacuum.yaml#L86)

  *which uses:*
  - [input_boolean.cleaned_today](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L16)

### [Reset to standard mode](https://github.com/tmttn/home-assistant-config/blob/7e113622f8fc4f1f0f09ec17e47cc4e7b9ee7221/automations/vacuum.yaml#L95)


[^ toc](#automations---table-of-content)


## [Work 💼](https://github.com/tmttn/home-assistant-config/blob/a2dd2ab7acd889c8a0d251b9b111eca40da482b1/automations/work.yaml)
### [Go home notification](https://github.com/tmttn/home-assistant-config/blob/a2dd2ab7acd889c8a0d251b9b111eca40da482b1/automations/work.yaml#L11)

  *which uses:*
  - [input_boolean.work_hour_notification_sent](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L43)
  - [binary_sensor.worked_enough_today](https://github.com/tmttn/home-assistant-config/blob/965ac2a7d72e6364dd45381724176e2816c4bfc8/includes/binary_sensors.yaml#L145)

### [Reset input_boolean at midnight](https://github.com/tmttn/home-assistant-config/blob/a2dd2ab7acd889c8a0d251b9b111eca40da482b1/automations/work.yaml#L32)

  *which uses:*
  - [input_boolean.work_hour_notification_sent](https://github.com/tmttn/home-assistant-config/blob/57488882bdac1ceb95374b7d4aba2316311f1a79/includes/input_booleans.yaml#L43)

### [Tom left work notification for Tanja](https://github.com/tmttn/home-assistant-config/blob/a2dd2ab7acd889c8a0d251b9b111eca40da482b1/automations/work.yaml#L44)


[^ toc](#automations---table-of-content)


<!-- end-automations -->
