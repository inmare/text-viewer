async function getImage() {
  /*
    const img = new Image();
    img.src = "./sample/Sample.png";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.globalCompositeOperation = "luminosity";
      // ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve(imgData);
    };
    */
  const res = await fetch("./sample/Sample.png");
  const blob = await res.blob();

  return blob;
}

async function getJSON() {
  const jsonFile = await fetch("./sample/RANDOM_PROJECT_0494.json");
  const result = await jsonFile.json();

  return result;
}

async function makePlaceholder() {
  // json 파일 가져오기
  const jsonData = await getJSON();
  // 가져온 파일에 마지막 저장 날짜 추가하기
  jsonData.lastSaved = new Date();
  // json파일 데이터 저장
  Database.currentProject = jsonData;
  Database.savePage();
  // 이미지 파일 가져오기
  const sampleImgBlob = await getImage();
  // const imgData = sampleImgData.data;

  for (let i = 0; i < 2; i++) {
    setTimeout(async () => {
      // const imageArray = reduceArraySize(imgData);
      await saveImageToDB(sampleImgBlob, i);
    });
  }

  function reduceArraySize(imgData) {
    let imageArray = [];
    for (let i = 0; i < imgData.length; i += 4) {
      const value = Math.round(
        imgData[i] * 0.2125 + imgData[i + 1] * 0.7154 + imgData[i + 2] * 0.0721
      );
      imageArray.push(value);
    }
    return imageArray;
  }

  // 이미지 파일 데이터 저장
  async function saveImageToDB(imageArray, pageIdx) {
    const imageObj = {
      // id: jsonData.id + String(pageIdx + 1).padStart(2, "0"),
      projectId: jsonData.id,
      page: pageIdx,
      data: imageArray,
    };

    Database.saveImage(imageObj);
  }

  // 이미지 파일을 1d array로 만들기
  // 이미지 파일 데이터에 array, 프로젝트 이름, 페이지 추가
}
