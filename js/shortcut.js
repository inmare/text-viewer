class Shortcut {
  static initialize() {
    window.addEventListener("keydown", this.detectShortcut);
  }

  static detectShortcut(e) {
    if (e.code == "KeyV" && e.altKey) {
      const changeViewBtn = $("#change-view");
      const event = new Event("click");
      changeViewBtn.dispatchEvent(event);
    }
  }
}
