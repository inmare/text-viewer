class CharView {
  static updateCharView(page) {
    this.clearCharView();

    const lowCharList = page.lowPercentChar;
    const charWrapper = $("#char-wrapper");
    for (let lowChar of lowCharList) {
      const template = $("#low-char-template");
      const lowCharDiv = template.content.cloneNode(true);

      const charSpan = lowCharDiv.querySelector("span[data-char-info='char']");
      const posSpan = lowCharDiv.querySelector("span[data-char-info='pos']");

      charSpan.innerText = lowChar.char;
      posSpan.innerText = lowChar.index + 1;

      const mainDiv = lowCharDiv.querySelector(".low-char");
      mainDiv.addEventListener("click", CharView.moveToSelectedChar);
      mainDiv.setAttribute("data-char-idx", lowChar.index);

      charWrapper.append(lowCharDiv);
    }
  }

  static clearCharView() {
    const charWrapper = $("#char-wrapper");
    charWrapper.innerHTML = "";
  }

  static moveToSelectedChar(e) {
    const charIndex = parseInt(e.target.closest(".low-char").dataset.charIdx);

    const charPerLine = Database.currentProject.charPerLine;

    const linePos = Math.floor(charIndex / charPerLine);
    const charPos = charIndex % charPerLine;

    const textTable = $("#text-table");
    const targetTr = textTable.querySelector(`tr[data-tr-idx='${linePos}']`);
    const targetTd = targetTr.querySelector(`td[data-td-idx='${charPos}']`);

    setTimeout(() => targetTd.dispatchEvent(new Event("click")));
  }
}
