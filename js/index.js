function createCanvas() {
  const result = document.getElementById('canvas');
  result.width = window.innerWidth;
  setCanvasWrapperIndex(result);
  // if (window.innerHeight < 500) {
  //   result.height = 100;
  //   imgNewSizeRatio = 6.048 * 5;
  //   imgSizeRatioBookTitle = 7.56 * 5;
  // } else {
  //   result.height = 500;
  //   imgNewSizeRatio = 6.048;
  //   imgSizeRatioBookTitle = 7.56;
  // }
  return result;
}

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;

  if (window.innerWidth < backgroundShelves) {
    setCanvasWrapperIndex(canvas);
  }
});

const canvas = createCanvas();
const ctx = canvas.getContext('2d');

createMainBookTitlesTable();
createABCLinkButtons();
makePagination();

function setCanvasWrapperIndex(canvas) {
  const canvasWrapperIndex = document.querySelectorAll('.canvas-wrapper-index');
  let canvasHeight = (window.innerWidth * 500) / backgroundShelves;

  canvas.height = canvasHeight;

  canvasWrapperIndex[0].style.height = canvasHeight;
  canvasWrapperIndex[0].style.backgroundImage =
    "url('../img/kelet-header.jpeg')";
}
