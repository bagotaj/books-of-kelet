function drawBooksImage() {
  const base_image = new Image();
  base_image.src = '../img/IMG_2541.jpeg';

  const imgNewSizeRatio = base_image.height / canvas.height;

  base_image.onload = function () {
    ctx.drawImage(
      base_image,
      0,
      0,
      base_image.width / imgNewSizeRatio,
      base_image.height / imgNewSizeRatio
    );

    drawBoundingBoxes(imgNewSizeRatio);
    makeBookTitles();
    drawTextAnnotations(imgNewSizeRatio);
  };
}
