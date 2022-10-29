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
    for (let clsName of logoClassList) {
      if (clsName == "fa-eye") {
        btn.setAttribute("data-view-mode", "from");
        break;
      } else if (clsName == "fa-eye-slash") {
        btn.setAttribute("data-view-mode", "to");
        break;
      }
    }
  }
}
