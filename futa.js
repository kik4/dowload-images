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

  const thregaImages = document.querySelectorAll('#master>a[href^="/"]');
  const logThregaImages = document.querySelectorAll('.thre>a[href^="/"]');
  const resImages = document.querySelectorAll('.rtd>a[href^="/"]');
  const nodeList = [...thregaImages, ...logThregaImages, ...resImages];
  for (let i = 0; i < nodeList.length; i += 2) {
    const node = nodeList[i];
    if (node.getBoundingClientRect().y < 0) continue;

    const href = node.href;
    const filename = node.innerHTML.trim();
    downloadFromUrlAutomatically(href, filename);
    await sleep(1000);
  }
})();
