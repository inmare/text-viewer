class Header {
  static initialize() {
    // header의 버튼들에 eventListener할당
    const viewModeBtn = $("#view-mode");
    const charSettingBtn = $("#toggle-char-setting");
    const loadSettingBtn = $("#toggle-load-setting");
    const savePageBtn = $("#save-page");
    const initPageBtn = $("#init-page");
    const saveFileBtn = $("#combine-to-file");
    // change-view 버튼 데이터 속성 초기화
    Header.toggleViewMode();

    viewModeBtn.addEventListener("click", Header.toggleViewMode);
    charSettingBtn.addEventListener("click", Control.toggleCharSetting);
    loadSettingBtn.addEventListener("click", Control.toggleLoadInfo);
    savePageBtn.addEventListener("click", ChangeData.savePage);
    saveFileBtn.addEventListener("click", SaveFile.saveProjectToFile);
  }

  static toggleViewMode() {
    const btn = $("#view-mode");
    Header.toggleDeactiveCls(btn);

    const logoClassList = btn.classList;
    if (logoClassList.contains("header-btn-deactive")) {
      btn.setAttribute("data-view-mode", "from");
    } else {
      btn.setAttribute("data-view-mode", "to");
    }

    TextView.changeTextTableMode();
  }

  static toggleDeactiveCls(btn) {
    btn.classList.toggle("header-btn-deactive");
  }

  static toggleImageZoomCls(btn) {
    btn.classList.toggle("fa-magnifying-glass-plus");
    btn.classList.toggle("fa-magnifying-glass-minus");
  }
}
