class ImageView {
  static initialize() {}

  static updateImageView(pageInfo) {
    this.clearImageView();
    const imageCanvas = $("#image-canvas");
    const rectCanvas = $("#rect-canvas");
    imageCanvas.width = pageInfo.size[0];
    imageCanvas.height = pageInfo.size[1];
    imageCanvas.style.width = pageInfo.size[0] + "px";
    imageCanvas.style.height = pageInfo.size[1] + "px";

    rectCanvas.width = pageInfo.size[0];
    rectCanvas.height = pageInfo.size[1];

    const scaleFactor = 300 / 96; // 300dpi로 설정
    imageCanvas.width = Math.ceil(imageCanvas.width * scaleFactor);
    imageCanvas.height = Math.ceil(imageCanvas.height * scaleFactor);

    const ctx = imageCanvas.getContext("2d");
    ctx.globalCompositeOperation = "luminosity";
    ctx.scale(scaleFactor, scaleFactor);
    ctx.putImageData(pageInfo.data, 0, 0);
  }

  static clearImageView() {
    const imageCanvas = $("#image-canvas");
    const rectCanvas = $("#rect-canvas");
    const imageCtx = imageCanvas.getContext("2d");
    const rectCtx = rectCanvas.getContext("2d");

    imageCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    rectCtx.clearRect(0, 0, rectCanvas.width, rectCanvas.height);

    imageCanvas.width = 0;
    imageCanvas.height = 0;
    rectCanvas.width = 0;
    rectCanvas.height = 0;

    imageCanvas.style.width = "0";
    imageCanvas.style.height = "0";
  }

  static drawRectOnChar(td) {
    const tr = td.parentElement;
    const lineIdx = parseInt(tr.dataset.trIdx);
    const charIdx = parseInt(td.dataset.tdIdx);
    // 나중에 페이지 위치도 알 수 있게 추가하기
    const pageIdx = 1;

    const cropPoints = Database.currentProject.info[0].cropPoints;
    const cropPointH = cropPoints.horizontal;
    const cropPointV = cropPoints.vertical;

    const rectCanvas = $("#rect-canvas");
    const canvasWidth = rectCanvas.width;
    const canvasHeight = rectCanvas.height;
    const ctx = rectCanvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = "#ff0000";
    ctx.strokeWidth = 2;

    const x = cropPointH[charIdx];
    const y = cropPointV[lineIdx];
    const w = cropPointH[charIdx + 1] - cropPointH[charIdx];
    const h = cropPointV[lineIdx + 1] - cropPointV[lineIdx];
    ctx.strokeRect(x, y, w, h);
  }
}
