class FileLoad {
  static initialize() {
    const loadFileBtn = $("#load-file");
    loadFileBtn.addEventListener("change", ConvertFile.fileToData);
  }
}
