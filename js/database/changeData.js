class ChangeData {
  static async deleteProejct(e) {
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

      await Database.deleteProjectFromId(id);
    }
  }

  static savePage() {
    const textTable = $("#text-table");
    let pageText = textTable.textContent;

    const viewModeBtn = $("#view-mode");
    const mode = viewModeBtn.dataset.viewMode;
    const charList = CharTable.charList;

    switch (mode) {
      case "from":
        pageText = changeLinebreakAndTab();
        break;
      case "to":
        for (let i = 0; i < charList.to.length; i++) {
          const toChar = charList.to[i];
          const actualChar = charList.actual[i];
          pageText = pageText.replace(toChar, actualChar);
        }
        break;
    }

    const pageIdx = Number(textTable.dataset.pageIdx);
    try {
      Database.currentProject.info[pageIdx].changedText = pageText;
      Database.currentProject.lastSaved = new Date();
      Database.savePage();
      DataView.updateLastSaved()
    } catch {
      alert("데이터 저장에 실패했습니다.");
    }

    function changeLinebreakAndTab() {
      let text = pageText;
      if (charList.actual.includes("\n")) {
        const linebreakIdx = charList.actual.indexOf("\n");
        const linebreakTo = charList.to[linebreakIdx];
        text = pageText.replace(linebreakTo, "\n");
      }

      if (charList.actual.includes("\t")) {
        const tabIdx = charList.from.indexOf("\t");
        const tabTo = charList.to[tabIdx];
        text = pageText.replace(tabTo, "\t");
      }

      return text;
    }
  }
}
