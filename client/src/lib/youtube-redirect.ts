export function extractVideoId(input: string): string | null {
  try {
    const url = new URL(input);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    const host = url.hostname.toLowerCase();
    let id: string | null = null;
    if (host === "youtu.be") id = url.pathname.slice(1);
    else if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
      id = url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/(?:embed|v|shorts)\/([^/]+)\/?$/)?.[1] ?? null;
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

export function isWebUrl(input: string): boolean {
  try { return ["https:", "http:"].includes(new URL(input).protocol); }
  catch { return false; }
}

// Escape script delimiters as well as quotes when embedding data in generated HTML.
function scriptString(value: string): string {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

export function generateHTMLContent(
  videoId: string,
  redirectUrl: string,
  triggerTime: number
) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId) || !isWebUrl(redirectUrl) || !Number.isFinite(triggerTime) || triggerTime < 0) throw new Error("Invalid video settings");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redirect After YouTube Ends</title>
  <style>
    html, body {height:100%;margin:0;}
    #player {position:fixed;inset:0;width:100%;height:100%;border:0;background:#000;}
  </style>
</head>
<body>
  <div id="player"></div>
  <script src="https://www.youtube.com/iframe_api"><\/script>
  <script>
    const VIDEO_ID   = ${scriptString(videoId)};
    const TARGET_URL = ${scriptString(redirectUrl)};
    const TRIGGER_AT    = ${triggerTime};
    const POLL_INTERVAL = 250;
    let pollId = null, player;

    function onYouTubeIframeAPIReady() {
      player = new YT.Player("player", {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          rel: 0,
          playsinline: 1,
          enablejsapi: 1
        },
        events: {
          onStateChange: handleStateChange
        }
      });
    }

    function handleStateChange(event) {
      clearInterval(pollId);
      if (event.data === YT.PlayerState.PLAYING) {
        pollId = setInterval(() => {
          const currentTime = player.getCurrentTime();
          if (currentTime >= TRIGGER_AT) {
            clearInterval(pollId);
            window.location.href = TARGET_URL;
          }
        }, POLL_INTERVAL);
      } else if (event.data === YT.PlayerState.ENDED) {
        clearInterval(pollId);
        window.location.href = TARGET_URL;
      } else {
        clearInterval(pollId);
      }
    }
  <\/script>
</body>
</html>`;
}

