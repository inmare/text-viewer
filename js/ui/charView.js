class CharView {
  static updateCharView(page) {
    this.clearCharView();

    const lowCharList = page.lowPercentChar;
    const charView = $("#char-view");
    for (let lowChar of lowCharList) {
      const template = $("#low-char-template");
      const lowCharDiv = template.content.cloneNode(true);

      const charSpan = lowCharDiv.querySelector("span[data-char-info='char']");
      const posSpan = lowCharDiv.querySelector("span[data-char-info='pos']");

      charSpan.innerText = lowChar.char;
      posSpan.innerText = lowChar.index;

      const mainDiv = lowCharDiv.querySelector(".low-char");
      mainDiv.addEventListener("click", CharView.moveToSelectedChar);
      mainDiv.setAttribute("data-char-idx", lowChar.index);

      charView.append(lowCharDiv);
    }
  }

  static clearCharView() {
    const charView = $("#char-view");
    charView.innerHTML = "";
  }

  static moveToSelectedChar(e) {
    const charIndex = e.target.closest(".low-char").dataset.charIdx;

    const charPerLine = Database.currentProject.charPerLine;
    const linePerPage = Database.currentProject.linePerPage;

    const linePos = Math.floor(charIndex / linePerPage);
    const charPos = charIndex % charPerLine;

    const textTable = $("#text-table");
    const targetTr = textTable.querySelector(`tr[data-tr-idx='${linePos}']`);
    const targetTd = targetTr.querySelector(`td[data-td-idx='${charPos}']`);

    setTimeout(() => targetTd.dispatchEvent(new Event("click")));
  }
}
