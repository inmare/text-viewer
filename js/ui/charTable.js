class CharTable {
  static initialize() {
    // 기본 글자 설정 불러오기
    this.charList = INIT_CHAR_LIST;

    // char-table을 기본 문자열로 초기화
    for (let i = 0; i < this.charList.from.length; i++) {
      const fromChar = this.charList.from[i];
      const toChar = this.charList.to[i];
      this.appendCharToTable(fromChar, toChar);
    }

    // 버튼들에 변수 할당
    const addCharBtn = $("#char-add");
    const saveCharBtn = $("#char-save");
    const initCharBtn = $("#char-init");
    addCharBtn.addEventListener("click", this.addChar.bind(this));
    saveCharBtn.addEventListener("click", this.saveCharSetting.bind(this));
    initCharBtn.addEventListener("click", this.initCharSetting);
  }

  static deleteChar(e) {
    const parentTd = e.target.parentElement;
    const tdIdx = getTdIndex(parentTd);
    const fromTdList = $("#from-char > td");
    const toTdList = $("#to-char > td");
    const delTdList = $("#del-char > td");

    const fromChar = fromTdList.innerText;
    const toChar = toTdList.innerText;

    fromTdList[tdIdx].remove();
    toTdList[tdIdx].remove();
    delTdList[tdIdx].remove();

    const idx = this.charList.from.indexOf(fromChar);

    this.charList.from.splice(idx, 1);
    this.charList.to.splice(idx, 1);

    function getTdIndex(td) {
      const delTdList = $("#del-char > td");
      const idx = Array.from(delTdList).indexOf(td);
      return idx;
    }
  }

  static addChar() {
    const fromChar = $("#from").value;
    const toChar = $("#to").value;

    const charMatch = checkCharIsValid();
    if (!charMatch.result) {
      return alert(charMatch.msg);
    }

    this.appendCharToTable(fromChar, toChar);
    this.charList.from.push(fromChar);
    this.charList.to.push(toChar);
    switch (fromChar) {
      case "\\n":
        this.charList.actual.push("\n");
        break;
      case "\\t":
        this.charList.actual.push("\t");
        break;
      default:
        this.charList.actual.push(fromChar);
        break;
    }

    function checkCharIsValid() {
      const fromRegex = /^(?:[\u0020-\u007e]|\\n|\\t)$/;
      const toRegex = /^(?:\d|[a-f]|[A-F]){4}$/;

      const fromMatch = fromChar.match(fromRegex);
      const toMatch = toChar.match(toRegex);

      if (!fromMatch) {
        return {
          result: false,
          msg: "From에는 1글자의 아스키코드 혹은 \\n, \\t만 입력할 수 있습니다.",
        };
      }

      if (!toMatch) {
        return {
          result: false,
          msg: "To에는 유니코드 형태의 4자리 글자만 입력할 수 있습니다.",
        };
      }

      return {
        result: true,
        msg: null,
      };
    }
  }

  static appendCharToTable(fromChar, toChar) {
    const fromTr = $("#from-char");
    const toTr = $("#to-char");
    const delTr = $("#del-char");

    const fromTd = document.createElement("td");
    fromTd.innerText = fromChar;
    fromTr.append(fromTd);

    const toTd = document.createElement("td");
    toTd.innerText = toChar;
    toTr.append(toTd);

    const delTd = document.createElement("td");
    const delBtn = document.createElement("i");
    delBtn.classList.add("fa-solid", "fa-xmark");
    delBtn.addEventListener("click", this.deleteChar.bind(this));
    delTd.append(delBtn);
    delTr.append(delTd);
  }

  static saveCharSetting() {
    const settingString = JSON.stringify(this.charList);
    localStorage.setItem(CHAR_SETTING_NAME, settingString);
  }
}
