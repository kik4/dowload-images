javascript: (async function () {
  "use strict";

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* delete */
  const deleted = document.querySelectorAll(".deleted");
  if (deleted.length) {
    if (window.confirm("削除されたレスを削除しますか？")) {
      deleted.forEach((v) => v.remove());
    } else {
      deleted.forEach((v) => v.setAttribute("style", "display: table;"));
    }
  }

  /* main */
  const nodeList = [...document.querySelectorAll(".no_quote")];
  console.log(nodeList.length, "レス");

  for (let i = 0; i < nodeList.length; i++) {
    const node = nodeList[i];
    if (node.getBoundingClientRect().y < 0) continue;
    const id = node.innerText.slice(3);

    const formData = new FormData();
    formData.append("mode", "post");
    formData.append("b", "b");
    formData.append("d", id);
    formData.append("reason", "110");
    formData.append("responsemode", "ajax");
    const request = new Request("https://img.2chan.net/del.php", {
      method: "POST",
      body: formData,
    });
    const res = await fetch(request);
    console.log(i, id, await res.text());

    if (i < nodeList.length - 1) await sleep(3000);
  }

  console.log("end");
})();
