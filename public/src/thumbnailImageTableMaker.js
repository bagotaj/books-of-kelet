const thumbnailsTableBody = document.getElementById('thumbnailsTableBody');

function MakeThumbnailsTableBody() {
  let tr = document.createElement('tr');

  for (let i = 0; i < listOfImages.length; i++) {
    let td = document.createElement('td');

    for (let j = 0; j < listOfImages[i]['images'].length; j++) {
      let img = document.createElement('img');
      img.src = `./assets/img/${listOfImages[i]['images'][j]}.jpeg`;
      img.height = 100;

      img.addEventListener('click', () => {
        addImageBackgroundToCanvasEdit(listOfImages[i]['images'][j]);
        drawBoundingBoxes(imgNewSizeRatio, listOfImages[i]['images'][j]);
        createBookTitlesTable();
      });

      td.appendChild(img);
    }

    tr.appendChild(td);
  }
  thumbnailsTableBody.appendChild(tr);
}

function addImageBackgroundToCanvasEdit(imageName) {
  let canvasEdit = document.getElementsByClassName('canvas-wrapper-edit');

  canvasEdit[0].style.backgroundImage = `url(./assets/img/${imageName}.jpeg)`;
}
