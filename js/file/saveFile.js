class SaveFile {
  static saveProjectToFile() {
    if (!Database.currentProject) return;

    let dataString = "";
    const imageInfo = Database.currentProject.imageInfo;
    for (let info of imageInfo) {
      dataString += info.changedText;
    }

    const stringObj = this.parseString(dataString);

    let dataArray;

    switch (stringObj.mode) {
      case "hex":
        dataArray = this.hexToArray(stringObj.text);
        break;
      case "base64":
        dataArray = this.base64ToArray(stringObj.text);
        break;
      default:
        break;
    }

    const blob = new Blob([dataArray]);

    const link = document.createElement("a");
    link.download = stringObj.fileName;

    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  static parseString(dataString) {
    let mode = parseInt(dataString.slice(0, 1));
    // 추후에 file-to-pdf가 바귀면 수정하기
    switch (mode) {
      case 1:
        mode = "hex";
        break;
      case 3:
        mode = "base64";
        break;
      default:
        return alert(
          `모드 ${mode}는 현재 파일 변환을 지원하지 않는 모드입니다.`
        );
    }

    const fileNameLength = parseInt(dataString.slice(1, 3));
    const fileNameUnicode = dataString.slice(7, 7 + fileNameLength);
    const fileName = unicodeToString(fileNameUnicode);

    const lastLineLength = parseInt(dataString.slice(3, 7));
    const rawText = dataString.slice(7 + fileNameLength, -lastLineLength);

    const stringObj = {
      mode: mode,
      text: rawText,
      fileName: fileName,
    };

    return stringObj;

    function unicodeToString(unicodeString) {
      let str = "";
      for (let i = 0; i < unicodeString.length; i += 4) {
        let unicode = unicodeString.slice(i, i + 4);
        str += String.fromCharCode(parseInt(unicode, 16));
      }

      return str;
    }
  }

  static base64ToArray(base64String) {
    const content = atob(base64String);
    const buffer = new ArrayBuffer(content.length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < content.length; i++) {
      view[i] = content.charCodeAt(i);
    }

    return view;
  }

  static hexToArray(hexString) {
    const buffer = new ArrayBuffer(hexString.length / 2);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < hexString.length; i += 2) {
      const hexValue = parseInt(hexString.slice(i, i + 2), 16);
      view[i] = hexValue;
    }

    return view;
  }
}
