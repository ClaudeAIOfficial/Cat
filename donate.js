(() => {
  const section = document.getElementById("donate");
  if (!section) return;
  const status = section.querySelector('[role="status"]');

  function selectText(element) {
    const selection = window.getSelection();
    if (!selection) return false;
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    return true;
  }

  for (const button of section.querySelectorAll("[data-copy-target]")) {
    const address = document.getElementById(button.dataset.copyTarget);
    const label = button.lastElementChild;
    const original = label.textContent;
    const method = button.closest("article").querySelector("h3").textContent;
    let timer;
    button.hidden = false;
    button.addEventListener("click", async () => {
      window.clearTimeout(timer);
      let copied = false;
      try {
        await navigator.clipboard.writeText(address.textContent);
        copied = true;
      } catch {
        if (selectText(address)) {
          try { copied = document.execCommand("copy"); } catch { copied = false; }
        }
      }
      label.textContent = copied ? "Copied" : original;
      status.textContent = copied
        ? method + (original === "Copy email" ? " email copied." : " address copied.")
        : "Select and copy the " + method + (original === "Copy email" ? " email." : " address.");
      timer = window.setTimeout(() => { label.textContent = original; }, 2200);
    });
  }
})();
