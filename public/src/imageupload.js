function createCanvas() {
  const result = document.getElementById('imageuploadcanvas');
  result.width = window.innerWidth;
  getBasicsShelvesData();

  return result;
}

window.addEventListener('resize', function () {
  imageuploadcanvas.width = window.innerWidth;

  if (window.innerWidth < backgroundShelvesWidth) {
    while (buttonsPlace.firstChild) {
      buttonsPlace.removeChild(buttonsPlace.firstChild);
    }

    getBasicsShelvesData();

    if (!addNewShelfImageButtons.classList.contains('displaynone')) {
      getImage(imageuploadcanvas, backgroundShelvesTitle);
    }
  }
});

const imageuploadcanvas = createCanvas();
const ctxImageUpload = imageuploadcanvas.getContext('2d');

imageuploadcanvas.addEventListener(
  'click',
  function (event) {
    let newCoords = getMousePosition(imageuploadcanvas, event);

    if (setClickImageuploadCanvas === 'grid') {
      clickedShelfBoxKeyNumber = isBoxClicked({
        newCoords: newCoords,
        function() {
          selectImage(event);
        },
      });

      console.log('return value isBoxClicked', clickedShelfBoxKeyNumber);
    }

    if (setClickImageuploadCanvas === 'uploadimage') {
      drawAndCalculateGrid(newCoords);
    }
  },
  false
);
