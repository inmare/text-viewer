class Shortcut {
  static initialize() {
    window.addEventListener("keydown", this.detectShortcut);
  }

  static detectShortcut(e) {
    const isTextTableActivate = checkTextViewActivate();
    if (isTextTableActivate) {
      for (let [_, value] of Object.entries(TEXT_TABLE_SHORTCUT)) {
        const isSubKeyMatch = checkSubKeyMatch(value);
        if (value.key == e.key && isSubKeyMatch) {
          // do something about text table
          TextView.moveSelPos(e.key);
          return;
        }
      }
    }

    for (let [_, value] of Object.entries(SHORTCUT)) {
      const isSubKeyMatch = checkSubKeyMatch(value);
      if (value.key == e.key && isSubKeyMatch) {
        // do something about shortcut
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
}
