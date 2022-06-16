let setClick = 'grid';

function createCanvas() {
  const result = document.getElementById('imageuploadcanvas');
  result.width = window.innerWidth;
  getBasicsShelvesData();

  return result;
}

window.addEventListener('resize', function () {
  imageuploadcanvas.width = window.innerWidth;

  if (window.innerWidth < backgroundShelvesWidth) {
    getBasicsShelvesData();
  }
});

const imageuploadcanvas = createCanvas();
const ctxImageUpload = imageuploadcanvas.getContext('2d');

imageuploadcanvas.addEventListener(
  'click',
  function (event) {
    let newCoords = getMousePosition(imageuploadcanvas, event);

    if (setClick === 'grid') {
      drawAndCalculateGrid(newCoords);
    }

    if (setClick === 'uploadimage') {
      // uploadImageToFirebaseStorage - call a function there
      // drawGrid(newCoords);
    }
  },
  false
);
