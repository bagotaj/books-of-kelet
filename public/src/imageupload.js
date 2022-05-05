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
const ctx = imageuploadcanvas.getContext('2d');

function setCanvasHeightIndex() {
  let canvasHeight = (window.innerWidth * 500) / backgroundShelvesWidth;

  return canvasHeight;
}

function setCanvasWrapperIndex(imageuploadcanvas) {
  const canvasWrapperIndexClass = document.querySelectorAll(
    '.canvas-wrapper-index'
  );
  let canvasHeight = setCanvasHeightIndex();

  imageuploadcanvas.height = canvasHeight;
  imgSizeRatioBookTitle = 7.56 / ((canvasHeight * 0.8) / 400);
  shelvesCoordsRatio = canvasHeight / 500;
  canvasWrapperIndexClass[0].style.height = canvasHeight;
  canvasWrapperIndexClass[0].style.backgroundImage =
    "url('../assets/img/kelet-header.jpeg')";
}
