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
      tr.setAttribute("data-tr-idx", line + 1);
      textTable.append(tr);
      for (let char = 0; char < charPerLine; char++) {
        const td = document.createElement("td");
        td.setAttribute("data-td-idx", char + 1);
        td.innerText = text[line * charPerLine + char];
        td.addEventListener("click", this.addTdClass.bind(this));
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
    this.showCurrentTdPos(e.target);
  }

  // 후에 더 적절한 위치로 옮기기
  static showCurrentTdPos(td) {
    const tr = td.parentElement;
    const lineIdx = tr.dataset.trIdx;
    const charIdx = td.dataset.tdIdx;

    const currentPos = $("#current-pos");
    currentPos.innerText = `1, ${lineIdx}, ${charIdx}`;
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
      ImageView.drawRectOnChar(targetTd);
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
