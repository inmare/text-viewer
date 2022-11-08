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

  static drawRectOnChar(index) {
    const cropPoints = Database.currentProject.info[index.page].cropPoints;
    const cropPointH = cropPoints.horizontal;
    const cropPointV = cropPoints.vertical;

    const rectCanvas = $("#rect-canvas");
    const canvasWidth = rectCanvas.width;
    const canvasHeight = rectCanvas.height;
    const ctx = rectCanvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = "#ff0000";
    ctx.strokeWidth = 2;

    const x = cropPointH[index.char];
    const y = cropPointV[index.line];
    const w = cropPointH[index.char + 1] - cropPointH[index.char];
    const h = cropPointV[index.line + 1] - cropPointV[index.line];
    ctx.strokeRect(x, y, w, h);
  }

  static scrollToRect(index) {
    const cropPoints = Database.currentProject.info[index.page].cropPoints;
    const cropPointH = cropPoints.horizontal;
    const cropPointV = cropPoints.vertical;

    const x = cropPointH[index.char];
    const y = cropPointV[index.line];
    const imageView = $("#image-view");
    const offsetWidth = Math.round(imageView.clientWidth / 2);
    const offsetHeight = Math.round(imageView.offsetHeight / 2);
    imageView.scrollLeft = x - offsetWidth;
    imageView.scrollTop = y - offsetHeight;
  }
}
