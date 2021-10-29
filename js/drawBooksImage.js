function drawBooksImage() {
  const base_image = new Image();
  base_image.src = '../img/IMG_2541.jpeg';

  base_image.onload = function () {
    ctx.drawImage(base_image, 0, 0, base_image.width, base_image.height);

    // drawBoundingBoxes(imgNewSizeRatio);
  };
}
