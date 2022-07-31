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
  getBasicsShelvesData();

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
  (event) => {
    newCoords = getMousePosition(canvasEdit, event);

    if (setClickCanvas === 'grid') {
      clickedShelfBoxKeyNumber = isBoxClicked({
        newCoords: newCoords,
      });

      if (clickedShelfBoxKeyNumber) {
        getImageNameFromBasicsShelfBoxCoords(clickedShelfBoxKeyNumber);
      }
    }

    if (setClickCanvas === 'books') {
      addNewBookCoords(newCoords);

      for (let i = 0; i < bookTitles.length; i++) {
        let bookTitlesCoords = bookTitles[i]['boundingBox']['vertices'];

        let inputField = document.getElementById(i);

        let elementWasClicked = false;

        if (bookTitlesCoords.length === 1) {
          return;
        } else {
          elementWasClicked = checkBoxClicking(newCoords, bookTitlesCoords);
        }

        if (elementWasClicked) {
          inputField.scrollIntoView();
        }
      }
    }
  },
  false
);

const edit = true;
