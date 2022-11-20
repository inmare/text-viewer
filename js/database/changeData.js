class ChangeData {
  static deleteProejct(e) {
    const doDelete = confirm("정말로 프로젝트를 삭제하시겠습니까?");

    if (doDelete) {
      const id = e.target.closest(".db-div").dataset.projectId;

      if (Database.currentProject && Database.currentProject.id == id) {
        // 만약 현재 프로젝트를 삭제 할 시 모든 데이터와 화면 초기화
        Database.currentProject = null;

        TextView.clearTextView();
        ImageView.clearImageView();
        DataView.clearPageView();
        CharView.clearCharView();
        PositionView.showCurrentProj();
        PositionView.showCurrentPage();
        PositionView.showCurrentTdPos();
      }

      const dbDiv = e.target.closest(".db-div");
      dbDiv.remove();

      Database.deleteImageFromId(id);
      Database.deleteProjectFromId(id);
    }
  }

  static savePage() {
    const textTable = $("#text-table");
    let pageText = textTable.textContent;

    if (pageText == "") return;

    const viewModeBtn = $("#view-mode");
    const mode = viewModeBtn.dataset.viewMode;
    const charList = CharTable.charList;

    if (mode == "to") {
      for (let i = 0; i < charList.to.length; i++) {
        const toChar = charList.to[i];
        const fromChar = charList.from[i];
        pageText = pageText.replace(toChar, fromChar);
      }
    }

    const pageIdx = Number(textTable.dataset.pageIdx);
    try {
      Database.currentProject.imageInfo[pageIdx].changedText = pageText;
      Database.currentProject.lastSaved = new Date();
      Database.saveProject();
      DataView.updateLastSaved();
    } catch (error) {
      alert("데이터 저장에 실패했습니다.");
      console.log(error.name + ": " + error.message);
    }
  }
}
