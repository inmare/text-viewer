class ImportData {
  static async importProejct(e) {
    const id = e.target.closest(".db-div").dataset.projectId;
    const data = await Database.getProjectFromId(id);

    if (Database.currentProject && Database.currentProject.id == data.id) {
      return alert("이미 로드된 프로젝트입니다.");
    } else {
      Database.currentProject = data;
    }

    const charPerLine = data.charPerLine;
    const imageInfo = data.info;
    const firstPageIdx = 0;
    const firstPage = data.info[firstPageIdx];

    TextView.updateTextView(firstPage, firstPageIdx, charPerLine);
    ImageView.updateImageView(firstPage);
    DataView.updatePageView(imageInfo);
    PositionView.showCurrentProj(data.name);
    PositionView.showCurrentPage(firstPageIdx);
    CharView.updateCharView(firstPage);
  }

  static importPage(e) {
    const pageIdx = e.target.dataset.page;
    const page = Database.currentProject.info[pageIdx];
    const charPerLine = Database.currentProject.charPerLine;

    TextView.updateTextView(page, pageIdx, charPerLine);
    ImageView.updateImageView(page);
    PositionView.showCurrentPage(pageIdx);
    PositionView.showCurrentTdPos();
    CharView.updateCharView(page);
  }
}
