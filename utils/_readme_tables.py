#!/usr/bin/env python3

#                           _                  _        _     _
#        _ __ ___  __ _  __| |_ __ ___   ___  | |_ __ _| |__ | | ___  ___
#       | '__/ _ \/ _` |/ _` | '_ ` _ \ / _ \ | __/ _` | '_ \| |/ _ \/ __|
#       | | |  __/ (_| | (_| | | | | | |  __/ | || (_| | |_) | |  __/\__ \
#   ____|_|  \___|\__,_|\__,_|_| |_| |_|\___|  \__\__,_|_.__/|_|\___||___/
#  |_____|
#
# - from github.com/tmttn/home-assistant-config

# This script generates the HTML table in my README.md.
# It is used in `update-readme.py`.

from jinja2 import Template

tables = {
    "Switches 🎚": [
        ["TP-Link HS110", 3, 110.97],
        ["Philips Hue plug", 1, 29.95],
        ["Hombli smart plug outside", 3, 69.60],
        ["Tuya Smart Curtain Switch Wifi", 1, 49.00],
        ["Ring video doorbell 2", 1, 149.00],
        ["Xiaomi Aqara Magic Cube", 1, 16.95],
    ],
    "Sensors 🌡": [
        ["Philips Hue Motion Sensor", 2, 83.98],
        ["Xiaomi Aqara Temperature Sensor", 3, 40.50],
        ["Xiaomi Aqara Motion Sensor", 4, 54.00],
        ["Xiaomi Mi Flora", 1, 15.96],
    ],
    "Vacuum 🧹": [["Xiaomi Mi Roborock S7", 1, 569.00]],
    "Media player 📺🔈": [
        ["Samsung LED-LCD UE65JU7000", 1, "nan"],
        ["Nvidia Shield TV Pro", 1, 199.99],
    ],
    "Lights 💡": [
        ["Philips Hue E27 White and Color Ambiance", 5, 249.95],
        ["Philips Hue E27 White", 2, 139.54],
        ["Philips Hue E14 White Ambiance", 2, 40.46],
        ["Philips Hue GU10 White Ambiance", 12, 299.88],
        ["Philips Hue Lightstrip Plus", 1, 79.99],
    ],
    "Hubs 🌎": [["ConBee II", 1, 41.90], ["Hue Bridge", 1, 50.99]],
    "Server 🖥": [
        ["Shuttle Barebone SH67H7", 1, 210.00],
        ["Intel Core i7 - 3770k (3,50 GHz)", 1, 300.00],
        ["Intel 530 2,5\" Retail 180GB", 1, 115.00],
        ["Kingston valueram 8Gb, DDR3, PC12800", 2, 100.00],
    ],
    "Device tracker 🔍": [
        ["iPhone 11 Pro Max with the iOS app", 1, "nan"],
        ["iPhone XR with the iOS app", 1, "nan"],
        ["Apple Watch First Generation", 1, "nan"],
    ],
    "Google hardware 🧿": [
        ["Google Home", 1, 150.00],
        ["Google Home Mini", 1, 50.00],
        ["Google Nest Hub Max", 1, 302.00],
        ["Google Wifi", 3, 299.00],
        ["Google Nest Wifi", 1, 129.00],
    ],
    "HVAC 🌡❄️🎛": [
        ["Honeywell wireless OpenTherm-module", 1, 92.99],
        ["Honeywell Round Wireless", 2, 163.98],
        ["Honeywell Evohome HR92 Radiator valve", 7, 433.65],
        ["Honeywell Evohome starterkit with 4 valves", 1, 449.00],
    ],
    "Security 🚨🔐": [
        ["Ring Alarm security set", 1, 329.00],
        ["Ring Spotlight Cam Solar", 2, 439.00],
    ]
}


def add_unit_price(lst):
    return [
        (
            name,
            units,
            round(tot_price / units, 2) if isinstance(tot_price, float) else "nan",
            tot_price,
        )
        for name, units, tot_price in lst
    ]


tables = {title: add_unit_price(lst) for title, lst in tables.items()}
total_per_title = {
    title: sum(x[-1] for x in lst if isinstance(x[-1], float))
    for title, lst in tables.items()
}

table_template = """
<table>
    {%- for k, v in dicts.items() %}
    <thead>
        <tr>
            <th>{{ k }}</th>
            <th>Units (#)</th>
            <th>Price per unit (€)</th>
            <th>Price (€)</th>
        </tr>
    </thead>
    <tbody>
    {%- for name, units, unit_price, tot_price in v %}
        <tr>
            <td>{{ name }}</td>
            <td>{{ units }}</td>
            <td>{{ unit_price }}</td>
            <td>{{ tot_price }}</td>
        </tr>
    {%- endfor %}
        {%- if total_per_title[k] > 0 %}
        <tr>
            <td><i><b>Total</b></i></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>{{ total_per_title[k] | round(2) }}</td>
        </tr>
        {%- endif %}
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
    {%- endfor %}
    <thead>
        <tr>
            <th>Total</th>
            <th></th>
            <th></th>
            <th>€{{ total | round(2) }}</th>
        </tr>
    </thead>
</table>"""


template = Template(table_template)
total_cost = sum(
    cost for lst in tables.values() for _, _, _, cost in lst if isinstance(cost, float)
)
html_table = template.render(
    dicts=tables, total=total_cost, total_per_title=total_per_title
)

if __name__ == "__main__":
    print(html_table)
