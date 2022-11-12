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
}
