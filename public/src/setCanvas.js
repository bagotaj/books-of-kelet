function setCanvasHeightIndex() {
  let canvasHeight =
    (window.innerWidth * backgroundShelvesHeight) / backgroundShelvesWidth;

  return canvasHeight;
}

function setCanvasWrapperIndex(canvas, imageURL) {
  const canvasWrapperIndexClass = document.querySelectorAll(
    '.canvas-wrapper-index'
  );
  let canvasHeight = setCanvasHeightIndex();

  canvas.height = canvasHeight;
  imgSizeRatioBookTitle =
    7.56 / ((canvasHeight * 0.8) / (backgroundShelvesHeight * 0.8));
  shelvesCoordsRatio = canvasHeight / backgroundShelvesHeight;
  canvasWrapperIndexClass[0].style.height = canvasHeight;
  canvasWrapperIndexClass[0].style.backgroundImage = `url(${imageURL})`;

  if (canvas.id === 'imageuploadcanvas') {
    gridXCoords.push(0, canvas.width);
    gridYCoords.push(0, canvas.height);
  }
}

function setImageuploadCanvasBackground(canvas, imageData) {
  img = new Image();
  img.src = imageData;

  img.onload = function () {
    URL.revokeObjectURL(this.src);

    let dataOfImage = {
      basicShelfParams: { width: img.width, height: img.height },
      basicShelfTitle: '',
    };

    setBackgroundShelvesVariables(dataOfImage);

    let canvasHeight = setCanvasHeightIndex();

    canvas.height = canvasHeight;
    imgSizeRatioBookTitle =
      7.56 / ((canvasHeight * 0.8) / (backgroundShelvesHeight * 0.8));
    shelvesCoordsRatio = canvasHeight / backgroundShelvesHeight;

    ctxImageUpload.drawImage(
      img,
      0,
      0,
      img.width * shelvesCoordsRatio,
      img.height * shelvesCoordsRatio
    );
  };
}
