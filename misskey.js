javascript: (async function () {
  "use strict";
  const atags = document.querySelectorAll(".xFeJ0 .xcKaF");
  if (!atags.length) alert("aタグが見つかりませんでした");

  const nametag = document.querySelector(".x1TBL");
  if (!nametag) alert("nametagが見つかりませんでした");

  let name = nametag.children[0].children[0].textContent;
  if (!name) alert("nameが見つかりませんでした");
  const server = nametag.children[0].children[1]?.textContent ?? "";
  name += server;

  const filename = `${name}${document.location.pathname.replaceAll("/", "-")}`;

  const footer = document.querySelector("footer");
  if (!footer) alert("footerタグが見つかりませんでした");

  const container = document.createElement("div");
  container.style = "display: flex; flex-flow: column;";
  footer.appendChild(container);

  let i = 1;
  for (const atag of atags) {
    const a = document.createElement("a");
    a.textContent = filename + "-" + i++ + ".webp";
    a.setAttribute("download", filename);
    a.href = atag.href;

    container.appendChild(a);
  }
})();
