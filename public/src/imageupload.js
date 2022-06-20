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

    if (setClickImageuploadCanvas === 'grid') {
      let shelfBoxCoordsObj = savedBasicsShelvesData[0].shelfBoxCoords;

      for (const key in shelfBoxCoordsObj) {
        let rectangleVectors = [
          shelfBoxCoordsObj[key]['0'],
          shelfBoxCoordsObj[key]['2'],
          shelfBoxCoordsObj[key]['3'],
          shelfBoxCoordsObj[key]['1'],
        ];

        let clicked = checkBoxClicking(newCoords, rectangleVectors, true);

        if (clicked) {
          selectImage(event);
        }
      }
    }

    if (setClickImageuploadCanvas === 'uploadimage') {
      drawAndCalculateGrid(newCoords);
    }
  },
  false
);
