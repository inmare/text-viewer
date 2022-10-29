class ImageView {
  static initialize() {
    // 임시로 이미지 그리기
    const img = new Image();
    img.src = "./lorem-short.png";
    img.onload = function () {
      const imageCanvas = $("#image-canvas");
      imageCanvas.width = img.width;
      imageCanvas.height = img.height;
      const ctx = imageCanvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const rectCanvas = $("#rect-canvas");
      rectCanvas.width = img.width;
      rectCanvas.height = img.height;
    };
  }
}
