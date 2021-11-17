const thumbnailsTableBody = document.getElementById('thumbnailsTableBody');

function MakeThumbnailsTableBody() {
  let tr = document.createElement('tr');

  for (let i = 0; i < listOfImages.length; i++) {
    let td = document.createElement('td');
    let img = document.createElement('img');
    img.src = `../img/${listOfImages[i]}.jpeg`;
    img.height = 100;

    img.addEventListener('click', () => {
      addImageBackgroundToCanvasEdit(listOfImages[i]);
      drawBoundingBoxes(imgNewSizeRatio, listOfImages[i]);
      createBookTitlesTable();
    });

    td.appendChild(img);
    tr.appendChild(td);
  }
  thumbnailsTableBody.appendChild(tr);
}

function addImageBackgroundToCanvasEdit(imageName) {
  let canvasEdit = document.getElementsByClassName('canvas-wrapper-edit');

  canvasEdit[0].style.backgroundImage = `url(../img/${imageName}.jpeg)`;
}
