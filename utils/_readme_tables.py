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
        ["TP-Link HS110", 3, 36.99 * 3],
        ["Philips Hue plug", 1, 29.95],
    ],
    "Sensors 🌡": [
        ["Philips Hue Motion Sensor", 2, 41.99 * 2],
    ],
    "Vacuum 🧹": [["Xiaomi Mi Roborock S7", 1, 569.00]],
    "Media player 📺🔈": [
        ["Samsung LED-LCD UE65JU7000", 1, "nan"],
    ],
    "Lights 💡": [
        ["Philips Hue E27 White and Color Ambiance", 5, 49.99 * 5],
        ["Philips Hue E27 White", 2, 69.77 * 2],
        ["Philips Hue E14 White Ambiance", 2, 20.23 * 2], 
        ["Philips Hue GU10 White Ambiance", 12, 24.99 * 12],
        ["Philips Hue Lightstrip Plus", 1, 79.99],
    ],
    "Hubs 🌎": [["Hue Bridge", 1, 50.99]],
    "Server 🖥": [
        ["Micro-ATX PC", 1, "nan"],
    ],
    "Device tracker 🔍": [
        ["iPhone 11 Pro Max with the iOS app", 1, "nan"],
        ["iPhone XR with the iOS app", 1, "nan"],
    ],
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
            <th>€{{ total }}</th>
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
