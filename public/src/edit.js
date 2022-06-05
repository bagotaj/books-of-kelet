let imageUploadButton = document.querySelector('#imageUploadButton');
imageUploadButton.addEventListener('click', () => {
  location.href = '/public/imageupload.html';
});

function createCanvasEdit() {
  imgNewSizeRatio = 6.048;
  imgSizeRatioBookTitle = 7.56;

  const result = document.getElementById('canvasEdit');
  result.width = window.innerWidth;
  result.height = backgroundShelvesHeight;
  return result;
}

function followWindowSize(canvasEdit, window) {
  canvasEdit.width = result.width;
  canvasEdit.height = result.height;
}

const canvasEdit = createCanvasEdit();
const ctxEdit = canvasEdit.getContext('2d');

let newCoords = { x: '', y: '' };

canvasEdit.addEventListener(
  'click',
  function (event) {
    newCoords = getMousePosition(canvasEdit, event);

    addNewBookCoords(newCoords);

    for (let i = 0; i < bookTitles.length; i++) {
      let bookTitlesCoords = bookTitles[i]['boundingBox']['vertices'];

      let inputField = document.getElementById(i);

      let elementWasClicked = false;

      if (bookTitlesCoords.length === 1) {
        return;
      } else {
        elementWasClicked = checkBoundingBoxClicking(
          newCoords,
          bookTitlesCoords
        );
      }

      if (elementWasClicked) {
        inputField.scrollIntoView();
      }
    }
  },
  false
);

function checkBoundingBoxClicking(m, r) {
  let ABP = vector(r[0], r[1], m);
  let BCP = vector(r[1], r[2], m);
  let CDP = vector(r[2], r[3], m);
  let DAP = vector(r[3], r[0], m);

  if (ABP > 0 && BCP > 0 && CDP > 0 && DAP > 0) {
    return true;
  }

  return false;
}

function vector(p1, p2, m) {
  const pointXCoord = m.x;
  const pointYCoord = m.y;
  const rectX1Coord = p1.x / imgNewSizeRatio;
  const rectY1Coord = p1.y / imgNewSizeRatio;
  const rectX2Coord = p2.x / imgNewSizeRatio;
  const rectY2Coord = p2.y / imgNewSizeRatio;

  return (
    (pointXCoord - rectX1Coord) * (pointYCoord - rectY2Coord) -
    (pointYCoord - rectY1Coord) * (pointXCoord - rectX2Coord)
  );
}

const edit = true;

MakeThumbnailsTableBody();
