function onResponse(response) {
  console.log("Received " + response);
}

function onError(error) {
  console.log(error);
}

browser.browserAction.onClicked.addListener(() => {
  console.log("Sending:  ping");
  var sending = browser.runtime.sendNativeMessage(
    "ping_pong",
    "ping");
  sending.then(onResponse, onError);
});

browser.contextMenus.create({
  id: "copy-link-to-clipboard",
  title: "Copy link to clipboard",
  contexts: ["link", "page", "video"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-link-to-clipboard") {
      const safeUrl = escapeHTML(info.linkUrl || info.pageUrl || tab.url);
      console.log(safeUrl);
      const message = String.raw`yt-dlp --no-mtime --windows-filenames -S "ext,codec:h264:h265" -o "D:/Downloads/%(title)s %(id)s.%(ext)s" --ffmpeg-location "C:\Program Files\ffmpeg\bin" `;
      console.log(message+safeUrl);
      var request = browser.runtime.sendNativeMessage(
        "ping_pong",
        message+safeUrl);
      request.then(onResponse, onError);
  }
});

function escapeHTML(str) {
  return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}