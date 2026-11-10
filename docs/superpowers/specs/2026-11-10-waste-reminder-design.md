# Waste collection reminder

Short design, 2026-11-10.

## Intent

Remind whoever is home, the evening before a Limburg.net pickup, to put the right
bins outside, and keep reminding until someone confirms it.

## Data

- `sensor.limburg_net_morgen`: `Geen` when nothing is collected tomorrow, otherwise
  the fraction names, comma separated (`Restafval`, `GFT, PMD`). It updates just
  after midnight, so at 19:00 it describes tomorrow.

## Pieces

| Piece | Where |
| --- | --- |
| `input_boolean.waste_put_outside` ("Waste put outside") | `includes/input_booleans.yaml` |
| `automation.waste_reminder_to_put_the_bins_outside` | HA storage (category Utilities) |
| `automation.waste_bins_put_outside` | HA storage |
| `automation.waste_reset_input_boolean_waste_put_outside_at_midnight` | HA storage |

## Behaviour

- Time triggers at 19:00, 20:00 and 21:00. Each run only fires when tomorrow has a
  pickup, the helper is still off, vacation mode is off and `group.persons` is home.
  Separate triggers instead of an in-run delay, so a restart never drops a repeat.
- Push (Dutch, `time-sensitive`, tag `waste_put_outside`) to Tom's and/or Tanja's
  phone, only for the people who are home. The same tag makes a repeat replace the
  previous notification. Button: "Buitengezet ✓" (`WASTE_PUT_OUTSIDE`).
- Kitchen display TTS announcement at 19:00 and 20:00, same pattern as the
  medication reminder (volume 0.6, `tts.google_translate_say`, `nl`). Not at 21:00.
- The button, or toggling the helper on from a dashboard, turns the helper on and
  clears the notification on both phones.
- The helper resets at midnight, like the medication and candy helpers.
