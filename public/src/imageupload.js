let gridCoorsArr = [];

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
}

function drawGrid(newCoords) {
  let x = newCoords.x;
  let y = newCoords.y;

  console.log('original', newCoords);

  gridCoorsArr.forEach((element) => {
    if (Math.abs(element.x - x) < 20) {
      x = element.x;
    }

    if (Math.abs(element.y - y) < 20) {
      y = element.y;
    }
  });

  console.log('modified', { x: x, y: y });
  gridCoorsArr.push({ x: x, y: y });

  ctxImageUpload.beginPath();
  ctxImageUpload.setLineDash([5, 15]);
  ctxImageUpload.strokeStyle = 'white';
  ctxImageUpload.moveTo(x, 0);
  ctxImageUpload.lineTo(x, imageuploadcanvas.height);
  ctxImageUpload.closePath();
  ctxImageUpload.stroke();

  ctxImageUpload.beginPath();
  ctxImageUpload.setLineDash([5, 15]);
  ctxImageUpload.strokeStyle = 'white';
  ctxImageUpload.moveTo(0, y);
  ctxImageUpload.lineTo(imageuploadcanvas.width, y);
  ctxImageUpload.closePath();
  ctxImageUpload.stroke();
}
