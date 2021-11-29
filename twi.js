javascript: (async function () {
  "use strict";

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const downloadFromUrlAutomatically = (url, fileName) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      if (this.status == 200) {
        var urlUtil = window.URL || window.webkitURL;
        var imgUrl = urlUtil.createObjectURL(this.response);
        var link = document.createElement("a");
        link.href = imgUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    xhr.send();
  };

  const pathname = location.pathname;
  const pathnames = pathname.split("/");
  const username = pathnames[1];
  const tweetId = pathnames[3];

  const nodeList = document.querySelectorAll(
    `article a[href^="${pathname}"] img[alt="画像"]`
  );
  for (let i = 0; i < nodeList.length; i++) {
    const src = nodeList[i].src;
    const href = src.split("&")[0] + "&name=orig";
    const unix = +(
      (BigInt(tweetId) >> BigInt(22)) +
      BigInt(1288834974657)
    ).toString();
    const date = new Date(unix + 9 * 60 * 60 * 1000);
    const datestring = date
      .toISOString()
      .replaceAll("-", "")
      .replaceAll(":", "")
      .replaceAll("T", "_")
      .split(".")[0];
    const filename = `${username}-${tweetId}-${datestring}-img${i + 1}`;
    downloadFromUrlAutomatically(href, filename);
    await sleep(1000);
  }
})();
