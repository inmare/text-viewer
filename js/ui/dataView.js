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
      id.innerText = data.id;
      name.innerText = data.name;
      lastSaved.innerText = formatTime(data.lastSaved);

      databaseView.append(dbDiv);
    }

    function formatTime(date) {
      const dateString =
        String(date.getYear()).slice(-2) +
        "-" +
        String(date.getMonth()).padStart(2, "0") +
        "-" +
        String(date.getDay()).padStart(2, "0") +
        " " +
        String(date.getHours()).padStart(2, "0") +
        ":" +
        String(date.getMinutes()).padStart(2, "0") +
        ":" +
        String(date.getSeconds()).padStart(2, "0");

      return dateString;
    }
  }
}
