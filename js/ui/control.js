class Control {
  static toggleCharSetting() {
    const btn = $("#toggle-char-setting");
    const charSetting = $("#char-setting");
    Header.toggleDeactiveCls(btn);

    if (btn.classList.contains("header-btn-deactive")) {
      charSetting.style.display = "none";
    } else {
      charSetting.style.display = "";
    }
  }

  static toggleLoadInfo() {
    const btn = $("#toggle-load-setting");
    const loadSetting = $("#load-setting");
    Header.toggleDeactiveCls(btn);

    if (btn.classList.contains("header-btn-deactive")) {
      loadSetting.style.display = "none";
    } else {
      loadSetting.style.display = "";
    }
  }
}
