let dataIdCounter = 0;

function makeStartPageButtonsImageUpload(shelfData) {
  let shelfButton = document.createElement('button');

  shelfButton.innerText = shelfData.basicShelfTitle;
  shelfButton.setAttribute('type', 'button');
  shelfButton.setAttribute('class', 'normalbtn');
  shelfButton.dataset.id = dataIdCounter;
  shelfButton.addEventListener('click', (e) => {
    setClickCanvas = 'grid';
    let whichCanvas = document.querySelector('canvas');

    setBackgroundShelvesVariables(shelfData);

    if (whichCanvas.id === 'canvasEdit') {
      booksFromLocalStorageBoolean = false;
      getImage(canvasEdit, backgroundShelvesTitle);
    }

    if (whichCanvas.id === 'imageuploadcanvas') {
      canvasImageUpload.classList.remove('displaynone');
      showingImageImageUpload.classList.add('displaynone');
      startPageButtons.classList.add('displaynone');
      addNewShelfImageButtons.classList.remove('displaynone');

      getImage(imageuploadcanvas, backgroundShelvesTitle);
    }
  });

  buttonsPlace.appendChild(shelfButton);

  dataIdCounter = dataIdCounter + 1;
}
