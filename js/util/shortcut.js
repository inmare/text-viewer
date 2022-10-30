class Shortcut {
  static initialize() {
    window.addEventListener("keydown", this.detectShortcut.bind(this));
  }

  static detectShortcut(e) {
    const isTextTableActivate = checkTextViewActivate();
    if (isTextTableActivate) {
      for (let [_, value] of Object.entries(this.TEXT_TABLE_SHORTCUT)) {
        const isSubKeyMatch = checkSubKeyMatch(value);

        if (value.key == e.key && isSubKeyMatch) {
          // do something about text table
          e.preventDefault();
          value.callback(e.key);
          return;
        }
      }
    }

    for (let [_, value] of Object.entries(this.SHORTCUT)) {
      const isSubKeyMatch = checkSubKeyMatch(value);
      if (value.key == e.key && isSubKeyMatch) {
        // do something about shortcut
        e.preventDefault();
        value.callback();
        return;
      }
    }

    function checkTextViewActivate() {
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

  // 모듈을 사용할 수 없기 때문에 다른 함수들이 다 선언되고 난 뒤인
  // Shortcut 클래스 안에 직접 선언을 해서 단축키에 callback을 설정 할 수 있도록 함
  static TEXT_TABLE_SHORTCUT = {
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

  static SHORTCUT = {
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
}
