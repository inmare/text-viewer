class CharTable {
  static initialize() {
    const fromTr = $("#from-char");
    const toTr = $("#to-char");
    const delTr = $("#del-char");

    for (let i = 0; i < charList.from.length; i++) {
      const fromChar = charList.from[i];
      const toChar = charList.to[i];
      const fromTd = document.createElement("td");
      fromTd.innerText = fromChar;
      fromTr.append(fromTd);

      const toTd = document.createElement("td");
      toTd.innerText = toChar;
      toTr.append(toTd);

      const delTd = document.createElement("td");
      const delBtn = document.createElement("i");
      delBtn.classList.add("fa-solid", "fa-xmark");
      delBtn.addEventListener("click", this.deleteChar);
      delTd.append(delBtn);
      delTr.append(delTd);
    }
  }

  static deleteChar(e) {}
}
