# YouTube Auto Skip Ads

A small Chrome/Edge extension that skips YouTube ads for you, so you don't have to reach for the mouse.

What it does:

- Clicks **Skip Ad** the moment the button appears
- For ads you can't skip: jumps to the end
- Closes the banner ads that pop up over the video
- Puts playback speed back to normal when the video starts

## Install (one time, about 1 minute)

1. Open Chrome and go to `chrome://extensions` (in Edge: `edge://extensions`)
2. Turn on **Developer mode** (switch in the top-right corner; in Edge it's on the left)
3. Click **Load unpacked**
4. Pick this folder: `your-folder\youtube-auto-skip-ads`
5. Reload any YouTube tabs you already have open

That's it. It works on youtube.com and all its subdomains (www, m, music).

## Updating or turning it off

- After changing the files, press the reload ↻ icon on the extension's card in `chrome://extensions`.
- To pause it, flip its switch off on the same page.

## If it stops working

YouTube sometimes renames its buttons. If ads stop getting skipped, the button names in `SKIP_BUTTON_SELECTORS` at the top of `content.js` probably need updating.
