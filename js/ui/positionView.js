class PositionView {
  static showCurrentProj(projectName) {
    const currentProject = $("span[data-current='project']");

    if (projectName === undefined) {
      currentProject.innerText = "";
      return;
    }

    currentProject.innerText = projectName;
  }

  static showCurrentPage(pageIdx) {
    const currentPage = $("span[data-current='page']");

    if (pageIdx === undefined) {
      currentPage.innerText = "";
      return;
    }

    currentPage.innerText = Number(pageIdx) + 1;
  }

  static showCurrentTdPos(index) {
    const currentPos = $("span[data-current='pos']");

    if (index === undefined) {
      currentPos.innerText = "";
      return;
    }

    currentPos.innerText = `${index.line + 1}, ${index.char + 1}`;
  }
}
