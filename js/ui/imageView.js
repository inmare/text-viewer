class ImageView {
  static initialize() {}

  static updateImageView(pageInfo, imageBlob) {
    this.clearImageView();
    const imageWidth = pageInfo.size[0];
    const imageHeight = pageInfo.size[1];
    const imageCanvas = $("#image-canvas");
    const rectCanvas = $("#rect-canvas");

    const ctx = imageCanvas.getContext("2d");
    const blobUrl = URL.createObjectURL(imageBlob);
    const img = new Image();
    img.src = blobUrl;
    img.onload = function () {
      imageCanvas.width = imageWidth;
      imageCanvas.height = imageHeight;
      rectCanvas.width = imageWidth;
      rectCanvas.height = imageHeight;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(blobUrl);
    };
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

    // imageCanvas.style.width = "0";
    // imageCanvas.style.height = "0";
  }

  static drawRectOnChar(index) {
    const cropPoints = Database.currentProject.imageInfo[index.page].cropPoints;
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
    const cropPoints = Database.currentProject.imageInfo[index.page].cropPoints;
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

  static toggleImageZoom() {}
}
