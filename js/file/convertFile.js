class ConvertFile {
  static fileToData(e) {
    const files = e.target.files;
    for (let file of files) {
      console.log(file.name);
    }
  }
}
