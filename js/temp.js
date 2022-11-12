async function getText() {
  const res = await fetch("./lorem-short.txt");
  const text = await res.text();
  return text;
}

async function getImage() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = "./lorem-short.png";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      // canvas.style.width = img.width + "px";
      // canvas.style.height = img.height + "px";

      // const scaleFactor = 300 / 96; // 300dpi로 설정
      // canvas.width = Math.ceil(canvas.width * scaleFactor);
      // canvas.height = Math.ceil(canvas.height * scaleFactor);

      const ctx = canvas.getContext("2d");
      ctx.globalCompositeOperation = "luminosity";
      // ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve(imgData);
    };
  });
}
