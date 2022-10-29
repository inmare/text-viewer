class Header {
  static initialize() {
    // header의 버튼들에 eventListener할당
    const changeViewBtn = $("#change-view");
    // change-view 버튼 데이터 속성 초기화
    this.changeViewBtnData(changeViewBtn);

    changeViewBtn.addEventListener("click", TextView.changeView);
  }

  static changeViewBtnData(btn) {
    const logoClassList = btn.querySelector("i").classList;
    if (logoClassList.contains("header-btn-deactivate")) {
      btn.setAttribute("data-view-mode", "from");
    } else {
      btn.setAttribute("data-view-mode", "to");
    }
  }
}
