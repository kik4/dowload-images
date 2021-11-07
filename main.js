javascript: (function () {
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

  const a = document.querySelectorAll('#master>a[href^="/"]');
  const b = document.querySelectorAll('.rtd>a[href^="/"]');
  const nodeList = [...a, ...b];
  for (let i = 0; i < nodeList.length; i += 2) {
    const href = nodeList[i].href;
    const filename = href.split("/").slice(-1)[0];
    downloadFromUrlAutomatically(href, filename);
    sleep(1000);
  }
})();
