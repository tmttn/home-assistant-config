# Ring alarm: automatic arm and disarm

`alarm_control_panel.bunderhome_alarm` (Ring, through ring-mqtt) is armed and
disarmed by two UI automations. They live in `automations.yaml`, which is not
in this repo, so this page records how they work.

The Ring panel only supports **arm home** and **arm away**
(`supported_features: 3`); there is no night mode. Arm home is used for the
night. Ring's own "Nacht" schedule in the Ring app still arms home at 23:15;
the automations below work alongside it.

## Security: arm the alarm when everyone has left or goes to sleep

| Trigger | Extra conditions | Action |
| --- | --- | --- |
| `binary_sensor.no_one_home` on for 5 minutes | guest mode off, still no one home, alarm disarmed or armed home | arm away |
| `input_select.sleep_mode` → `total` | guest mode off, someone home, alarm disarmed | arm home |

- When a Ring door contact (`binary_sensor.openclose_*`) is open, it does not
  try to arm (Ring rejects it, and bypass is set to "Never"); it pushes which
  doors are open instead.
- After the arm call it waits up to 90 seconds for Ring to report `arming`,
  `armed_away` or `armed_home`. If Ring doesn't report one, it pushes a failure
  (time-sensitive), for example when ring-mqtt is briefly `unavailable`.
- Arming lives in its own automation, not in `script.leaving`. That script
  also runs from the back door button and the "turn off everything" push,
  where someone may still be home.
- It uses `input_select.sleep_mode`, the helper the dashboard's "Go to sleep" /
  "Wake up" buttons set. (An unused `input_boolean.sleep_mode` leftover was
  deleted.) `half` means someone is still up, so only `total` arms.

Guest mode (`input_boolean.guest_mode`) blocks both: guests may come and go, or walk
downstairs at night, and would set the alarm off. Every leaving-home automation
(turn everything off, lower the heating, vacuum, arm away, Tesla Sentry) checks it.

## Security: disarm the alarm when someone arrives or night mode ends

| Trigger | Extra conditions | Action |
| --- | --- | --- |
| `binary_sensor.anyone_home` occupancy detected | alarm arming, armed away or armed home | disarm |
| `input_select.sleep_mode` `half`/`total` → `off` | someone home, alarm armed home | disarm |

Sleep mode turns off when the wake-up alarm stops, or at 09:00 ("Night mode:
automatically turn off when alarm turns off or at 9AM"). An alarm that was
armed away stays armed then. The automation waits up to 60 seconds for
`disarmed` and pushes the result.

The disarm call passes a `code`. The ring-mqtt app has a `disarm_code` option,
and Home Assistant's MQTT alarm panel rejects a disarm without it ("Wrong code
entered for disarming" in the log). If that app option changes, update the
automation too. Arming needs no code.

### Voice control

`switch.sleep_mode` (template switch helper, aliases "Slaapmodus" and
"Nachtmodus") is exposed to Google Assistant and Assist. It is on whenever
`input_select.sleep_mode` is not `off`. Turning it off sets the select to `off`,
like the dashboard's "Wake up" button, so "Hey Google, zet slaapmodus uit" also
disarms a night-armed alarm. Turning it on runs `script.going_to_sleep`, like
"Go to sleep": everything turns off and the alarm arms home. Google can take a
question such as "staat slaapmodus aan?" as a command, so ask "zet slaapmodus
aan/uit" rather than asking for the state.

All pushes go to `notify.all_iphones` with the title "Security". Arming or
disarming by hand or by the Ring schedule sends no push from Home Assistant.

## Security: motion detected but we are not home

This automation stays. It watches `binary_sensor.motion_detected`, the
room-activity sensors that are not Ring devices, and offers a "Sound alarm"
action. Ring only covers its own contact and motion sensors, so this still adds
coverage when the alarm is armed away.

## Tesla Sentry

**Security: Tesla Sentry follows the alarm** turns `switch.bizzylectric_sentry_mode` on when the alarm goes to
`armed_away` with the Tesla at home and guest mode off, and off on `disarmed` (only if it is on and the car is still home). Not on
arm home (night): Sentry costs about 1 % battery per few hours.

## Doorbell

**Doorbell: the doorbell has been pressed** flashes the downstairs lights, pushes to all iPhones and speaks on the
Google Home. The push carries `camera.front_door_snapshot` (ring-mqtt), so the iPhone shows the snapshot and a
refreshing camera view on long-press. When the SHIELD (`media_player.shield_2`) is on, `remote.shield` gets
`MEDIA_PAUSE` first (an explicit pause, not a toggle).

Someone home: the Kitchen Display, and the SHIELD when it is already on, shows the live camera until the front door
opens (`door.opened` on `binary_sensor.openclose_front_door`), at most 90 seconds. The automation runs in `restart`
mode, so a second ring starts the run (and the 90 seconds) again. Ring delivers each press as two pushes about 2 s
apart, so a trigger within 15 s of the previous run is ignored (cooldown condition on `this.attributes.last_triggered`).
It uses Home Assistant Cast (`cast.show_lovelace_view`) of the hidden Overview subview `doorbell`: a panel view
with a `picture-entity` card (`camera.front_door_video`, the ring-mqtt RTSP stream, `camera_view: live`,
`fit_mode: cover`, black background). Then only screens still running the Home Assistant Lovelace app are
turned off, so the SHIELD returns to the paused app and a screen someone switched over is left alone. A ring
never wakes a TV that was off.

Casting the raw stream with `camera.play_stream` does not work here (tested 2026-11-14): the Cast Default
Media Receiver gets HA's HLS playlist (H.264 High 4.0, AAC, fMP4 segments) but reports `LOAD_FAILED` ("Failed to
cast media" in the log) and stays `idle`. Also tried without effect: plain HLS (`stream: ll_hls: false`, verified
no `EXT-X-PART`), the `hlsSegmentFormat: fmp4` hint via `extra.media_info`, and the HTTPS external URL. The HA Cast app plays
the stream inside the frontend instead, which does work on both the Nest Hub and the SHIELD. The remaining
black bars come from the camera's aspect ratio versus the screen.

### Ring push bug and the temporary patch

Since about October 2026 doorbell presses no longer reached Home Assistant: Ring stored them (they show up in
`sensor.front_door_last_activity` after about 2 minutes of polling) but the push listener crashed on each one:
`[firebase_messaging.fcmpushclient] Unknown error: Incorrect padding, shutting down FcmPushClient`
(firebase-messaging 0.4.5, ring-doorbell 0.9.14; open upstream as home-assistant/core#191852 and #189885). The
push's `crypto-key` header arrives unpadded and with an extra `p256ecdsa=` parameter, and any error stops the
client until the integration reloads. Re-authenticating does not help. ring-mqtt has the same kind of bug in
`@eneris/push-receiver` 4.3.0 (since 2026-10-28), so its `binary_sensor.front_door_ding` is not live either.

`custom_components/fcm_padding_fix` (enabled with `fcm_padding_fix:` in `configuration.yaml`) patches the
client at startup: it decodes only the `dh=` / `salt=` value with padding added and skips an undecryptable push
instead of stopping the listener. It only patches firebase-messaging 0.4.5 or older. Once HA ships a newer
version it does nothing and raises a persistent notification asking to delete the folder and the
configuration line. Tested against the real library in the HA container: the original decrypt fails with
`Incorrect padding` on a Ring-shaped push, the patched one decrypts it. Live on 2026-11-14 16:12: a doorbell
press updated `event.front_door_ding` at once, the automation ran and the Kitchen Display and SHIELD showed the
camera; no FcmPushClient crash since the patch.
