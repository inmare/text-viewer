class DataView {
  static initialize() {
    const loadDatabaseBtn = $("#load-database");
    loadDatabaseBtn.addEventListener("click", DataView.updateDataView);
  }

  static async updateDataView() {
    const result = await Database.getAllProjects();
    const databaseView = $("#database-view");
    databaseView.innerHTML = "";
    for (let data of result) {
      const template = $("#database-template");
      const dbDiv = template.content.cloneNode(true);
      const id = dbDiv.querySelector("span[data-info='id']");
      const name = dbDiv.querySelector("span[data-info='name']");
      const lastSaved = dbDiv.querySelector("span[data-info='last-saved']");

      dbDiv.querySelector(".db-div").setAttribute("data-project-id", data.id);

      id.innerText = data.id;
      name.innerText = data.name;
      lastSaved.innerText = formatTime(data.lastSaved);

      const importBtn = dbDiv.querySelector("i[data-button='import']");
      // const downloadBtn = dbDiv.querySelector("i[data-button='download']");
      const deleteBtn = dbDiv.querySelector("i[data-button='delete']");

      importBtn.addEventListener("click", ImportData.importProejct);
      // downloadBtn.addEventListener("click", Database.downloadData);
      deleteBtn.addEventListener("click", ChangeData.deleteProejct);

      databaseView.append(dbDiv);
    }
  }

  static updatePageView(imageInfo) {
    this.clearPageView();
    const pageView = $("#page-view");
    for (let i = 0; i < imageInfo.length; i++) {
      const pageNum = i + 1;
      const div = document.createElement("div");
      div.innerText = pageNum;
      div.classList.add("page");
      div.setAttribute("data-page", i);
      div.addEventListener("click", ImportData.importPage);
      pageView.append(div);
    }
  }

  static clearPageView() {
    const pageView = $("#page-view");
    pageView.innerHTML = "";
  }

  static updateLastSaved() {
    const id = Database.currentProject.id;
    const dbDiv = $(`.db-div[data-project-id="${id}"`);
    const lastSavedSpan = dbDiv.querySelector("span[data-info='last-saved']");
    const lastSavedTime = Database.currentProject.lastSaved;
    lastSavedSpan.innerText = formatTime(lastSavedTime);
  }
}
