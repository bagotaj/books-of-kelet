function makeStartPageButtonsImageUpload(shelfData) {
  let buttonsPlace = document.querySelector('#shelvesButtons');
  while (buttonsPlace.firstChild) {
    buttonsPlace.removeChild(buttonsPlace.firstChild);
  }

  let shelfButton = document.createElement('button');

  shelfButton.innerText = shelfData.basicShelfTitle;
  shelfButton.setAttribute('type', 'button');
  shelfButton.setAttribute('class', 'normalbtn');
  shelfButton.addEventListener('click', () => {
    canvasImageUpload.classList.remove('displaynone');
    showingImageImageUpload.classList.add('displaynone');

    setBackgroundShelvesVariables(shelfData);

    let url = `../public/assets/img/kelet-header.jpeg`;
    setCanvasWrapperIndex(imageuploadcanvas, url);
    // getImage(imageuploadcanvas, backgroundShelvesTitle);
    // till I use url and setCanvas
    makeShelfGridFromCoords();
  });

  buttonsPlace.appendChild(shelfButton);
}
