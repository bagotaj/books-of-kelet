function createCanvas() {
  const result = document.getElementById('imageuploadcanvas');
  result.width = window.innerWidth;
  setCanvasWrapperIndex(result);

  return result;
}

window.addEventListener('resize', function () {
  imageuploadcanvas.width = window.innerWidth;

  if (window.innerWidth < backgroundShelvesWidth) {
    setCanvasWrapperIndex(imageuploadcanvas);
  }
});

const imageuploadcanvas = createCanvas();
const ctxImageUpload = imageuploadcanvas.getContext('2d');

imageuploadcanvas.addEventListener(
  'click',
  function (event) {
    let newCoords = getMousePosition(imageuploadcanvas, event);

    drawGrid(newCoords);
  },
  false
);

function setCanvasHeightIndex() {
  let canvasHeight =
    (window.innerWidth * backgroundShelvesHeight) / backgroundShelvesWidth;

  return canvasHeight;
}

function setCanvasWrapperIndex(imageuploadcanvas) {
  const canvasWrapperIndexClass = document.querySelectorAll(
    '.canvas-wrapper-index'
  );
  let canvasHeight = setCanvasHeightIndex();

  imageuploadcanvas.height = canvasHeight;
  imgSizeRatioBookTitle =
    7.56 / ((canvasHeight * 0.8) / (backgroundShelvesHeight * 0.8));
  shelvesCoordsRatio = canvasHeight / backgroundShelvesHeight;
  canvasWrapperIndexClass[0].style.height = canvasHeight;
  canvasWrapperIndexClass[0].style.backgroundImage =
    "url('./assets/img/kelet-header.jpeg')";

  gridXCoords.push(0, imageuploadcanvas.width);
  gridYCoords.push(0, imageuploadcanvas.height);
}
