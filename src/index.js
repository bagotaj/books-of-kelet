function createCanvas() {
  const result = document.getElementById('canvas');
  result.width = window.innerWidth;
  setCanvasWrapperIndex(result);
  setBookShelvesClassIndex();

  return result;
}

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;

  if (window.innerWidth < backgroundShelvesWidth) {
    setCanvasWrapperIndex(canvas);
    setBookShelvesClassIndex();
    createBookTitleCanvas();
  }
});

const canvas = createCanvas();
const ctx = canvas.getContext('2d');

createMainBookTitlesTable();
createABCLinkButtons();
makePagination();

function setCanvasHeightIndex() {
  let canvasHeight = (window.innerWidth * 500) / backgroundShelvesWidth;

  return canvasHeight;
}

function setCanvasWrapperIndex(canvas) {
  const canvasWrapperIndexClass = document.querySelectorAll(
    '.canvas-wrapper-index'
  );
  let canvasHeight = setCanvasHeightIndex();

  canvas.height = canvasHeight;
  imgSizeRatioBookTitle = 7.56 / ((canvasHeight * 0.8) / 400);
  shelvesCoordsRatio = canvasHeight / 500;
  canvasWrapperIndexClass[0].style.height = canvasHeight;
  canvasWrapperIndexClass[0].style.backgroundImage =
    "url('../assets/img/kelet-header.jpeg')";
}

function setBookShelvesClassIndex() {
  const bookShelvesClass = document.querySelectorAll('.book-shelves');

  let canvasHeight = setCanvasHeightIndex();

  bookShelvesClass[0].style.height = canvasHeight * 0.8;
}
