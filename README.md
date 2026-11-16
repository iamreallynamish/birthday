# Birthday card

A handmade-scrapbook birthday card as a small website. No build step, no dependencies.

## Run it locally

```bash
cd birthday-card
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Any static server works. Use `localhost` or HTTPS:
browsers only allow the camera on those.)

## Edit your content

Everything personal lives in **`js/config.js`**: the password and hints, the three
questions and answers, the recording texts, and the two-page birthday message.
Placeholders are wrapped in `[ square brackets ]`.

## Files

| File | What it does |
| --- | --- |
| `js/config.js` | All editable text, questions, answers, hints, message |
| `js/art.js` | Hand-drawn SVG illustrations (bow, cherries, puppy, bunting…) |
| `js/paper.js` | Torn paper edges, the card front, desk decorations |
| `js/recorder.js` | Camera + microphone recording, kept in the browser only |
| `js/confetti.js` | Paper confetti |
| `js/app.js` | The journey: lock → notice → questions → card opens → message |
| `css/styles.css` | All styling and animation |

## Recording

The reaction video is recorded with the browser's `MediaRecorder` into memory and
offered back as a local download. It is never uploaded. If she declines the camera,
the site carries on without it and does not ask again. Set `recording.enabled` to
`false` in the config to remove the camera entirely.
