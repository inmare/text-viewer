class PositionView {
  static showCurrentProj() {
    const currentProject = $("span[data-current='project']");
    currentProject.innerText = Database.currentProject.name;
  }

  static showCurrentPage(pageIdx) {
    const currentProject = $("span[data-current='page']");
    currentProject.innerText = Number(pageIdx) + 1;
  }

  static showCurrentTdPos(td) {
    const currentPos = $("span[data-current='pos']");

    if (!td) {
      currentPos.innerText = "";
      return;
    }

    const tr = td.parentElement;
    const lineIdx = parseInt(tr.dataset.trIdx);
    const charIdx = parseInt(td.dataset.tdIdx);

    currentPos.innerText = `${lineIdx + 1}, ${charIdx + 1}`;
  }
}
