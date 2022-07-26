let dataIdCounter = 0;

function makeStartPageButtonsImageUpload(shelfData) {
  let shelfButton = document.createElement('button');

  shelfButton.innerText = shelfData.basicShelfTitle;
  shelfButton.setAttribute('type', 'button');
  shelfButton.setAttribute('class', 'normalbtn');
  shelfButton.dataset.id = dataIdCounter;
  shelfButton.addEventListener('click', (e) => {
    setClickImageuploadCanvas = 'grid';
    let whichCanvas = document.querySelector('canvas');

    setBackgroundShelvesVariables(shelfData);

    if (whichCanvas.id === 'canvasEdit') {
      getImage(canvasEdit, backgroundShelvesTitle);
    }

    if (whichCanvas.id === 'imageuploadcanvas') {
      canvasImageUpload.classList.remove('displaynone');
      showingImageImageUpload.classList.add('displaynone');
      startPageButtons.classList.add('displaynone');
      addNewShelfImageButtons.classList.remove('displaynone');

      // let url = `../public/assets/img/kelet-header.jpeg`;
      // setCanvasWrapperIndex(imageuploadcanvas, url);
      getImage(imageuploadcanvas, backgroundShelvesTitle);
      // till I use url and setCanvas
      // makeShelfGridFromCoords();
    }
  });

  buttonsPlace.appendChild(shelfButton);

  dataIdCounter = dataIdCounter + 1;
}
