class ChangeData {
  static async deleteProejct(e) {
    const doDelete = confirm("정말로 프로젝트를 삭제하시겠습니까?");

    if (doDelete) {
      const id = e.target.closest(".db-div").dataset.projectId;

      if (Database.currentProject && Database.currentProject.id == id) {
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
        for (let td of textViewTd) {
          if (charList.from.includes(td.innerText)) {
            const idx = charList.from.indexOf(td.innerText);
            td.innerText = charList.to[idx];
          }
        }
        break;
    }

    function changeLinebreakAndTab() {
      let text = pageText;
      if (charList.from.includes("\\n")) {
        const linebreakIdx = charList.from.indexOf("\\n");
        const linebreakTo = charList.to[linebreakIdx];
        text = pageText.replace(linebreakTo, "\n");
      }

      if (charList.from.includes("\\t")) {
        const linebreakIdx = charList.from.indexOf("\\t");
        const linebreakTo = charList.to[linebreakIdx];
        text = pageText.replace(linebreakTo, "\t");
      }

      return text;
    }
  }
}
