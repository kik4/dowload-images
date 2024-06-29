javascript: (async function () {
  "use strict";
  const atag = document.querySelector(".xcKaF");
  if (!atag) alert("aタグが見つかりませ年でした");

  const nametag = document.querySelector(".x1TBL");
  if (!nametag) alert("nametagが見つかりませんでした");

  let name = nametag.children[0].children[0].textContent;
  if (!name) alert("nameが見つかりませんでした");
  const server = nametag.children[0].children[1]?.textContent ?? "";
  name += server;

  const filename = `${name}${document.location.pathname.replaceAll(
    "/",
    "-"
  )}.webp`;

  const a = document.createElement("a");
  a.textContent = filename;
  a.setAttribute("download", filename);
  a.href = atag.href;

  const footer = document.querySelector("footer");
  if (!footer) alert("footerタグが見つかりませ年でした");

  footer.appendChild(a);
  /*
  const uri = atag.href;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", uri);
  xhr.responseType = "blob";
  xhr.onloadend = () => {
    if (xhr.status !== 200) {
      return false;
    }
    window.navigator.msSaveOrOpenBlob(xhr.response, filename);
  };
  xhr.send();
  */
})();
