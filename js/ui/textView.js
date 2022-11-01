class TextView {
  static async initialize() {
    window.addEventListener("click", this.removeTdClass);
  }

  static updateTextView(pageInfo, charPerLine) {
    this.clearTextView();
    const actualLineLen = pageInfo.text.length / charPerLine;
    const text = pageInfo.text;
    const textTable = $("#text-table");
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
  }

  static showSelectedChar(e) {
    this.addTdClass(e);
    this.showCurrentTdPos(e.target);
    ImageView.drawRectOnChar(e.target);
  }

  // 후에 더 적절한 위치로 옮기기
  static showCurrentTdPos(td) {
    const tr = td.parentElement;
    const lineIdx = parseInt(tr.dataset.trIdx);
    const charIdx = parseInt(td.dataset.tdIdx);

    const currentPos = $("#current-pos");
    currentPos.innerText = `${lineIdx + 1}, ${charIdx + 1}`;
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

  // 단축키로 작동하든 클릭으로 작동하든 동일한 작동을 보장하도록 코드를 작성했지만
  // 최적의 방법이 발견된다면 언제든지 수정 될 수 있음
  static changeView() {
    const btn = $("#change-view");
    Header.toggleDeactiveCls(btn);
    Header.changeViewBtnData(btn);

    const mode = btn.dataset.viewMode;
    const charList = CharTable.charList;
    const textViewTd = $("#text-table td");
    // text-table이 없을 경우 작동을 중지함
    if (!textViewTd) return;

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
