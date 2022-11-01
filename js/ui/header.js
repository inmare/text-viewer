class Header {
  static initialize() {
    // header의 버튼들에 eventListener할당
    const changeViewBtn = $("#change-view");
    const charSettingBtn = $("#toggle-char-setting");
    const loadSettingBtn = $("#toggle-load-setting");
    // change-view 버튼 데이터 속성 초기화
    this.changeViewBtnData(changeViewBtn);

    changeViewBtn.addEventListener("click", TextView.changeView);
    charSettingBtn.addEventListener("click", Control.toggleCharSetting);
    loadSettingBtn.addEventListener("click", Control.toggleLoadInfo);
  }

  static changeViewBtnData(btn) {
    const logoClassList = btn.classList;
    if (logoClassList.contains("header-btn-deactive")) {
      btn.setAttribute("data-view-mode", "from");
    } else {
      btn.setAttribute("data-view-mode", "to");
    }
  }

  static toggleDeactiveCls(btn) {
    btn.classList.toggle("header-btn-deactive");
  }

  static toggleImageZoomCls() {}
}
