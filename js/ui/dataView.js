class DataView {
  static initialize() {
    const loadDatabaseBtn = $("#load-database");
    loadDatabaseBtn.addEventListener("click", Database.callDatabase);
  }

  static updateDataView(result) {
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

      importBtn.addEventListener("click", Database.callDatabase);
      // downloadBtn.addEventListener("click", Database.downloadData);
      deleteBtn.addEventListener("click", Database.deleteData);

      databaseView.append(dbDiv);
    }

    function formatTime(date) {
      const dateString =
        String(date.getYear()).slice(-2) +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0") +
        " " +
        String(date.getHours()).padStart(2, "0") +
        ":" +
        String(date.getMinutes()).padStart(2, "0") +
        ":" +
        String(date.getSeconds()).padStart(2, "0");

      return dateString;
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
      div.addEventListener("click", Database.importPage.bind(Database));
      pageView.append(div);
    }
  }

  static clearPageView() {
    const pageView = $("#page-view");
    pageView.innerHTML = "";
  }
}
