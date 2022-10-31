// 모듈을 사용할 수 없기 때문에 다른 함수들이 다 선언되고 난 뒤에
// 단축키 종류를 선언해 단축키에 callback을 설정 할 수 있도록 함
const TEXT_TABLE_SHORTCUT = {
  moveRight: {
    key: "ArrowRight",
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    callback: TextView.moveTdPos,
  },
  moveLeft: {
    key: "ArrowLeft",
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    callback: TextView.moveTdPos,
  },
  moveUp: {
    key: "ArrowUp",
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    callback: TextView.moveTdPos,
  },
  moveDown: {
    key: "ArrowDown",
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    callback: TextView.moveTdPos,
  },
  putText: {
    key: /^([\u0020-\u007e]|Enter|Tab)$/,
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    callback: TextView.changeTdText,
  },
};

const SHORTCUT = {
  save: {
    key: "s",
    altKey: false,
    ctrlKey: true,
    shiftKey: false,
    callback: null,
  },
  changeView: {
    key: "v",
    altKey: true,
    ctrlKey: false,
    shiftKey: false,
    callback: null,
  },
};

class Shortcut {
  static initialize() {
    window.addEventListener("keydown", this.detectShortcut.bind(this));
  }

  static detectShortcut(e) {
    const isTextTableActive = checkTextTableActive();
    if (isTextTableActive) {
      for (let [_, value] of Object.entries(TEXT_TABLE_SHORTCUT)) {
        const isSubKeyMatch = checkSubKeyMatch(value);

        if (value.key == e.key && isSubKeyMatch) {
          // do something about text table
          e.preventDefault();
          value.callback(e.key);
          return;
        }
      }
    }

    for (let [_, value] of Object.entries(SHORTCUT)) {
      const isSubKeyMatch = checkSubKeyMatch(value);
      if (value.key == e.key && isSubKeyMatch) {
        // do something about shortcut
        e.preventDefault();
        value.callback();
        return;
      }
    }

    function checkTextTableActive() {
      const selectTd = $(".select");
      if (selectTd) {
        return true;
      } else {
        return false;
      }
    }

    function checkSubKeyMatch(shortcut) {
      const isSubKeyMatch =
        shortcut.altKey == e.altKey &&
        shortcut.ctrlKey == e.ctrlKey &&
        shortcut.shiftKey == e.shiftKey;

      return isSubKeyMatch;
    }
  }
}
