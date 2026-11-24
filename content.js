// YouTube Auto Skip Ads
// Clicks "Skip" as soon as it appears, and fast-forwards ads that can't be skipped.

(() => {
  const SKIP_BUTTON_SELECTORS = [
    ".ytp-skip-ad-button",
    ".ytp-ad-skip-button",
    ".ytp-ad-skip-button-modern",
    ".ytp-ad-skip-button-slot button",
    "button[id^='skip-button']",
  ].join(",");

  const OVERLAY_CLOSE_SELECTORS = [
    ".ytp-ad-overlay-close-button",
    ".ytp-ad-overlay-close-container",
  ].join(",");

  let wasMutedBeforeAd = null; // remembers your mute setting so we can restore it

  function getPlayer() {
    return document.querySelector(".html5-video-player");
  }

  function getVideo(player) {
    return (player || document).querySelector("video");
  }

  function isAdPlaying(player) {
    return !!player && (player.classList.contains("ad-showing") || player.classList.contains("ad-interrupting"));
  }

  function clickAll(selector) {
    let clicked = false;
    document.querySelectorAll(selector).forEach((el) => {
      if (el.offsetParent !== null || el.getClientRects().length) {
        el.click();
        clicked = true;
      }
    });
    return clicked;
  }

  function handleAds() {
    // Banner ads that sit on top of the video
    clickAll(OVERLAY_CLOSE_SELECTORS);

    const player = getPlayer();
    const video = getVideo(player);

    if (isAdPlaying(player)) {
      // 1) Skippable ad: just press Skip
      if (clickAll(SKIP_BUTTON_SELECTORS)) return;

      // 2) Unskippable ad: mute it and jump to the end
      if (video) {
        if (wasMutedBeforeAd === null) wasMutedBeforeAd = video.muted;
        video.muted = true;
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = Math.max(video.duration - 0.1, 0);
        }
        video.playbackRate = 16;
      }
    } else if (wasMutedBeforeAd !== null) {
      // Ad finished: put sound and speed back the way you had it
      if (video) {
        video.muted = wasMutedBeforeAd;
        if (video.playbackRate === 16) video.playbackRate = 1;
      }
      wasMutedBeforeAd = null;
    }
  }

  // React instantly whenever the page changes (ads appear, skip button shows up)...
  // (batched so a burst of page changes only triggers one check)
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      handleAds();
    }, 50);
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  // ...and also check on a timer as a safety net.
  setInterval(handleAds, 500);
  handleAds();
})();
