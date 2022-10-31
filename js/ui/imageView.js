class ImageView {
  static initialize() {}

  static updateImageView(info) {
    const imageCanvas = $("#image-canvas");
    const rectCanvas = $("#rect-canvas");
    imageCanvas.width = info.size[0];
    imageCanvas.height = info.size[1];
    imageCanvas.style.width = info.size[0] + "px";
    imageCanvas.style.height = info.size[1] + "px";

    rectCanvas.width = info.size[0];
    rectCanvas.height = info.size[1];

    const scaleFactor = 300 / 96; // 300dpi로 설정
    imageCanvas.width = Math.ceil(imageCanvas.width * scaleFactor);
    imageCanvas.height = Math.ceil(imageCanvas.height * scaleFactor);

    const ctx = imageCanvas.getContext("2d");
    ctx.globalCompositeOperation = "luminosity";
    ctx.scale(scaleFactor, scaleFactor);
    ctx.putImageData(info.data, 0, 0);
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
