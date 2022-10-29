class ImageView {
  static initialize() {}

  static updateImageView(info) {
    const imageCanvas = $("#image-canvas");
    imageCanvas.width = info.size[0];
    imageCanvas.height = info.size[1];
    imageCanvas.style.width = info.size[0] + "px";
    imageCanvas.style.height = info.size[1] + "px";

    const scaleFactor = 300 / 96; // 300dpi로 설정
    imageCanvas.width = Math.ceil(imageCanvas.width * scaleFactor);
    imageCanvas.height = Math.ceil(imageCanvas.height * scaleFactor);

    const ctx = imageCanvas.getContext("2d");
    ctx.globalCompositeOperation = "luminosity";
    ctx.scale(scaleFactor, scaleFactor);
    ctx.putImageData(info.data, 0, 0);
  }
}
