class ConvertFile {
  static async fileToData(e) {
    const files = e.target.files;
    const jsonRegex = /\.json$/;
    const imageRegex = /\.(png|jpg|jpeg)$/;
    let jsonData;
    let imageFileList = [];
    for (let file of files) {
      if (file.name.match(jsonRegex)) {
        jsonData = await ConvertFile.fileToJSON(file);
      } else if (file.name.match(imageRegex)) {
        imageFileList.push(file);
      }
    }

    imageFileList.sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (a.name == b.name) return 0;
      else return -1;
    });

    if (imageFileList.length != jsonData.imageInfo.length) {
      return alert(
        "JSON파일의 이미지 개수와 실제 이미지 파일 개수가 다릅니다."
      );
    }

    jsonData.lastSaved = new Date();
    Database.currentProject = jsonData;
    Database.saveProject();

    console.log(imageFileList);

    for (let [fileIdx, file] of imageFileList.entries()) {
      console.log(imageFileList.indexOf(file));
      const imageObj = {
        data: file,
        page: fileIdx,
        projectId: Database.currentProject.id,
      };

      Database.saveImage(imageObj);
    }
  }

  static async fileToJSON(file) {
    return new Promise((resolve, _) => {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function () {
        const json = JSON.parse(fileReader.result);
        resolve(json);
      };
    });
  }
}
