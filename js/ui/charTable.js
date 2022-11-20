class CharTable {
  static charList;

  static initialize() {
    // 기본 글자 설정 불러오기
    let localCharList = localStorage.getItem(CHAR_SETTING_NAME);
    if (localCharList) {
      localCharList = JSON.parse(localCharList);
      this.charList = localCharList;
    } else {
      this.charList = INIT_CHAR_LIST;
    }

    // char-table을 기본 문자열로 초기화
    this.updateCharTable();

    // 버튼들에 변수 할당
    const addCharBtn = $("#char-add");
    const saveCharBtn = $("#char-save");
    const initCharBtn = $("#char-init");
    addCharBtn.addEventListener("click", this.addChar.bind(this));
    saveCharBtn.addEventListener("click", this.saveCharSetting.bind(this));
    initCharBtn.addEventListener("click", this.initCharSetting);
  }

  static updateCharTable() {
    for (let i = 0; i < this.charList.from.length; i++) {
      const fromChar = this.charList.from[i];
      const toChar = this.charList.to[i];
      this.appendCharToTable(fromChar, toChar);
    }
  }

  static deleteChar(e) {
    const parentTd = e.target.parentElement;
    const tdIdx = getTdIndex(parentTd);
    const fromTdList = $("#from-char > td");
    const toTdList = $("#to-char > td");
    const delTdList = $("#del-char > td");

    fromTdList[tdIdx].remove();
    toTdList[tdIdx].remove();
    delTdList[tdIdx].remove();

    this.charList.from.splice(tdIdx - 1, 1);
    this.charList.to.splice(tdIdx - 1, 1);

    function getTdIndex(td) {
      const delTdList = $("#del-char > td");
      const idx = Array.from(delTdList).indexOf(td);
      return idx;
    }
  }

  static addChar() {
    const fromChar = $("#from").value;
    const toUnicodeChar = $("#to").value;

    const charMatch = checkCharIsValid();
    if (!charMatch.result) {
      return alert(charMatch.msg);
    }

    const toChar = String.fromCharCode(parseInt(toUnicodeChar, 16));

    this.charList.from.push(fromChar);
    this.charList.to.push(toChar);
    this.appendCharToTable(fromChar, toChar);

    $("#from").value = "";
    $("#to").value = "";

    function checkCharIsValid() {
      const fromRegex = /^(?:[a-zA-Z0-9]|\+|=|\/)$/;
      const toRegex = /^(?:[a-f0-9]){4}$/;

      const fromMatch = fromChar.match(fromRegex);
      const toMatch = toUnicodeChar.match(toRegex);

      if (!fromMatch) {
        return {
          result: false,
          msg: "From에는 Base64문자열에 들어가는 글자만 입력할 수 있습니다.",
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
    try {
      localStorage.setItem(CHAR_SETTING_NAME, settingString);
      alert("글자 목록 저장에 성공했습니다.");
    } catch (error) {
      alert("글자 목록 저장에 실패했습니다.");
      console.log(error.name + ": " + error.message);
    }
  }
}
