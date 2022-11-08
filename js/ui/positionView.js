class PositionView {
  static showCurrentProj() {
    const currentProject = $("span[data-current='project']");
    currentProject.innerText = Database.currentProject.name;
  }

  static showCurrentPage(pageIdx) {
    const currentProject = $("span[data-current='page']");
    currentProject.innerText = Number(pageIdx) + 1;
  }

  static showCurrentTdPos(index) {
    const currentPos = $("span[data-current='pos']");

    if (!index) {
      currentPos.innerText = "";
      return;
    }

    currentPos.innerText = `${index.line + 1}, ${index.char + 1}`;
  }
}
