class TextView {
  static async initialize() {
    window.addEventListener("click", this.removeTdClass);
  }

  static updateTextView(info, charPerLine) {
    const actualLineLen = info.text.length / charPerLine;
    const text = info.text;
    const textTable = $("#text-table");
    for (let line = 0; line < actualLineLen; line++) {
      const tr = document.createElement("tr");
      tr.setAttribute("data-trIdx", line + 1);
      textTable.append(tr);
      for (let char = 0; char < charPerLine; char++) {
        const td = document.createElement("td");
        td.setAttribute("data-tdIdx", char + 1);
        td.innerText = text[line * charPerLine + char];
        td.addEventListener("click", this.addTdClass);
        tr.append(td);
      }
    }
  }

  static removeTdClass(e) {
    if (!e.target.closest("#text-table")) {
      const selectedTd = $(".select");
      if (selectedTd) {
        selectedTd.classList.remove("select");

        const currentPos = $("#current-pos");
        currentPos.innerText = "";
      }
    }
  }

  static addTdClass(e) {
    const selectedTd = $(".select");
    if (selectedTd) {
      selectedTd.classList.remove("select");
      if (selectedTd != e.target) {
        e.target.classList.add("select");
      }
    } else {
      e.target.classList.add("select");
    }
    const tr = e.target.parentElement;
    const lineIdx = tr.getAttribute("data-trIdx");
    const charIdx = e.target.getAttribute("data-tdIdx");

    const currentPos = $("#current-pos");
    currentPos.innerText = `1, ${lineIdx}, ${charIdx}`;
  }

  static moveSelPos(e) {
    const selectedTd = $(".select");
    if (selectedTd) {
      switch (e.key) {
        case "ArrowRight": {
          moveRight();
          break;
        }
        case "ArrowLeft": {
          moveLeft();
          break;
        }
        case "ArrowUp": {
          moveUp();
          break;
        }
        case "ArrowDown": {
          moveDown();
          break;
        }
      }
      const asciiRegex = /^[\u0020-\u007f]$/u;
      if (e.key.match(asciiRegex)) {
        if (e.altKey) {
          return;
        }
        e.preventDefault();
        selectedTd.innerText = e.key;
      }
    }

    function moveDown() {
      e.preventDefault();
      const parentTr = selectedTd.parentElement;
      const nextTr = parentTr.nextElementSibling;
      if (nextTr) {
        const siblingTd = parentTr.querySelectorAll("td");
        const tdIdx = Array.from(siblingTd).indexOf(selectedTd);
        const nextTd = nextTr.querySelectorAll("td");
        const target = nextTd[tdIdx];
        const event = new Event("click");
        target.dispatchEvent(event);
      }
    }

    function moveUp() {
      e.preventDefault();
      const parentTr = selectedTd.parentElement;
      const previousTr = parentTr.previousElementSibling;
      if (previousTr) {
        const siblingTd = parentTr.querySelectorAll("td");
        const tdIdx = Array.from(siblingTd).indexOf(selectedTd);
        const previousTd = previousTr.querySelectorAll("td");
        const target = previousTd[tdIdx];
        const event = new Event("click");
        target.dispatchEvent(event);
      }
    }

    function moveLeft() {
      e.preventDefault();
      const target = selectedTd.previousElementSibling;
      if (target) {
        const event = new Event("click");
        target.dispatchEvent(event);
      }
    }

    function moveRight() {
      e.preventDefault();
      const target = selectedTd.nextElementSibling;
      if (target) {
        const event = new Event("click");
        target.dispatchEvent(event);
      }
    }
  }

  static changeView() {
    const changeViewBtn = $("#change-view");
    const logo = changeViewBtn.querySelector("i");
    logo.classList.toggle("header-btn-deactivate");

    Header.changeViewBtnData(changeViewBtn);

    const mode = changeViewBtn.dataset.viewMode;
    const charList = CharTable.charList;
    const textViewTd = $("#text-table td");
    if (mode == "from") {
      for (let td of textViewTd) {
        if (charList.from.includes(td.innerText)) {
          const idx = charList.from.indexOf(td.innerText);
          td.innerText = charList.to[idx];
        }
      }
    } else if (mode == "to") {
      for (let td of textViewTd) {
        if (charList.to.includes(td.innerText)) {
          const idx = charList.to.indexOf(td.innerText);
          td.innerText = charList.from[idx];
        }
      }
    }
  }
}
