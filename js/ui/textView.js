class TextView {
  static async initialize() {
    window.addEventListener("click", this.removeTdClass);
  }

  static updateTextView(pageInfo, pageIdx, charPerLine) {
    this.clearTextView();
    let text;
    if (pageInfo.changeText) {
      text = pageInfo.changeText;
    } else {
      text = pageInfo.text;
    }

    const actualLineLen = text.length / charPerLine;
    const textTable = $("#text-table");
    textTable.setAttribute("data-page-idx", pageIdx);
    for (let line = 0; line < actualLineLen; line++) {
      const tr = document.createElement("tr");
      tr.setAttribute("data-tr-idx", line);
      textTable.append(tr);
      for (let char = 0; char < charPerLine; char++) {
        const td = document.createElement("td");
        td.setAttribute("data-td-idx", char);
        td.innerText = text[line * charPerLine + char];
        td.addEventListener("click", this.showSelectedChar.bind(this));
        tr.append(td);
      }
    }
    this.changeTextTableMode();
  }

  static clearTextView() {
    const textTable = $("#text-table");
    textTable.innerHTML = "";
  }

  static removeTdClass(e) {
    if (!e.target.closest("#text-table")) {
      const selectedTd = $(".select");
      if (selectedTd) {
        selectedTd.classList.remove("select");

        PositionView.showCurrentTdPos();
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
  }

  static showSelectedChar(e) {
    this.addTdClass(e);
    const tdIndex = this.getTdIndex(e.target);
    PositionView.showCurrentTdPos(tdIndex);
    this.scrollToTd(e.target);
    ImageView.drawRectOnChar(tdIndex);
    ImageView.scrollToRect(tdIndex);
  }

  static moveTdPos(key) {
    const selectedTd = $(".select");
    let targetTd;
    switch (key) {
      case "ArrowRight": {
        targetTd = moveRight();
        break;
      }
      case "ArrowLeft": {
        targetTd = moveLeft();
        break;
      }
      case "ArrowUp": {
        targetTd = moveUp();
        break;
      }
      case "ArrowDown": {
        targetTd = moveDown();
        break;
      }
    }

    if (targetTd) {
      targetTd.dispatchEvent(new Event("click"));
    }

    function moveDown() {
      const parentTr = selectedTd.parentElement;
      const nextTr = parentTr.nextElementSibling;
      if (nextTr) {
        const siblingTd = parentTr.querySelectorAll("td");
        const tdIdx = Array.from(siblingTd).indexOf(selectedTd);
        const nextTd = nextTr.querySelectorAll("td");
        const targetTd = nextTd[tdIdx];
        return targetTd;
      } else {
        return null;
      }
    }

    function moveUp() {
      const parentTr = selectedTd.parentElement;
      const previousTr = parentTr.previousElementSibling;
      if (previousTr) {
        const siblingTd = parentTr.querySelectorAll("td");
        const tdIdx = Array.from(siblingTd).indexOf(selectedTd);
        const previousTd = previousTr.querySelectorAll("td");
        const targetTd = previousTd[tdIdx];
        return targetTd;
      } else {
        return null;
      }
    }

    function moveLeft() {
      const targetTd = selectedTd.previousElementSibling;
      if (targetTd) {
        return targetTd;
      } else {
        return null;
      }
    }

    function moveRight() {
      const targetTd = selectedTd.nextElementSibling;
      if (targetTd) {
        return targetTd;
      } else {
        return null;
      }
    }
  }

  static getTdIndex(td) {
    const tr = td.parentElement;
    const lineIdx = parseInt(tr.dataset.trIdx);
    const charIdx = parseInt(td.dataset.tdIdx);
    const textTable = $("#text-table");
    const pageIdx = parseInt(textTable.dataset.pageIdx);
    const index = {
      char: charIdx,
      line: lineIdx,
      page: pageIdx,
    };

    return index;
  }

  static scrollToTd(td) {
    const tdX = td.offsetLeft;
    const tdY = td.offsetTop;

    const textView = $("#text-view");
    const offsetWidth = Math.round(textView.clientWidth / 2);
    const offsetHeight = Math.round(textView.offsetHeight / 2);
    textView.scrollLeft = tdX - offsetWidth;
    textView.scrollTop = tdY - offsetHeight;
  }

  // 단축키로 작동하든 클릭으로 작동하든 동일한 작동을 보장하도록 코드를 작성했지만
  // 최적의 방법이 발견된다면 언제든지 수정 될 수 있음
  static changeTextTableMode() {
    const btn = $("#view-mode");
    const mode = btn.dataset.viewMode;
    const charList = CharTable.charList;
    const textViewTd = $("#text-table td");
    // text-table이 없을 경우 작동을 중지함
    if (!textViewTd) return;

    switch (mode) {
      case "from":
        for (let td of textViewTd) {
          if (charList.to.includes(td.innerText)) {
            const idx = charList.to.indexOf(td.innerText);
            td.innerText = charList.from[idx];
          }
        }
        break;
      case "to":
        for (let td of textViewTd) {
          if (charList.from.includes(td.innerText)) {
            const idx = charList.from.indexOf(td.innerText);
            td.innerText = charList.to[idx];
          }
        }
        break;
    }
  }

  static changeTdText(key) {
    const selectedTd = $(".select");
    const charList = CharTable.charList;
    if (selectedTd) {
      let text;
      const btn = $("#view-mode");
      const mode = btn.dataset.viewMode;
      if (mode == "from") {
        text = key;
      } else if (mode == "to") {
        if (charList.from.includes(key)) {
          const idx = charList.from.indexOf(key);
          const toChar = charList.to[idx];
          text = toChar;
        } else {
          text = key;
        }
      }

      if (text) {
        selectedTd.innerText = text;
      }
    }
  }
}
