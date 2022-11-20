class ImportData {
  static async importProejct(e) {
    const id = e.target.closest(".db-div").dataset.projectId;
    const data = await Database.getProjectFromId(id);

    // if (Database.currentProject && Database.currentProject.id == data.id) {
    //   return alert("이미 로드된 프로젝트입니다.");
    // } else {
    //   Database.currentProject = data;
    // }

    Database.currentProject = data;

    const charPerLine = data.charPerLine;
    const imageInfo = data.imageInfo;
    const firstPageIdx = 0;
    const firstPage = data.imageInfo[firstPageIdx];
    const firstPageImageArray = await Database.loadImage(firstPageIdx);

    TextView.updateTextView(firstPage, firstPageIdx, charPerLine);
    ImageView.updateImageView(firstPage, firstPageImageArray);
    DataView.updatePageView(imageInfo);
    PositionView.showCurrentProj(data.name);
    PositionView.showCurrentPage(firstPageIdx);
    CharView.updateCharView(firstPage);
  }

  static async importPage(e) {
    const pageIdx = parseInt(e.target.dataset.page);
    const page = Database.currentProject.imageInfo[pageIdx];
    const charPerLine = Database.currentProject.charPerLine;
    const imageArray = await Database.loadImage(pageIdx);

    TextView.updateTextView(page, pageIdx, charPerLine);
    ImageView.updateImageView(page, imageArray);
    PositionView.showCurrentPage(pageIdx);
    PositionView.showCurrentTdPos();
    CharView.updateCharView(page);
  }
}
