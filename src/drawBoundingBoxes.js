function drawBoundingBoxes(imgNewSizeRatio, imageName) {
  let checkedImageName = false;
  let shelfName;

  for (let shelfNameInDB in dbbooks) {
    if (dbbooks[shelfNameInDB]['imageName'] === imageName) {
      checkedImageName = true;
      shelfName = shelfNameInDB;
    }
  }

  if (checkedImageName) {
    bookTitles = dbbooks[shelfName]['bookdata'];
  } else {
    bookTitles = getItemFromLocalStorage('bookTitles');
  }

  ctxEdit.clearRect(0, 0, canvasEdit.width, canvasEdit.height);

  for (let i = 0; i < bookTitles.length; i++) {
    if (bookTitles[i]['display'] === 'on') {
      const vertices = bookTitles[i]['boundingBox']['vertices'];

      const pointX = vertices[0]['x'];
      const pointY = vertices[0]['y'];

      if (vertices.length === 1) {
        ctxEdit.beginPath();
        ctxEdit.fillStyle = 'red';
        ctxEdit.arc(
          pointX / imgNewSizeRatio,
          pointY / imgNewSizeRatio,
          5,
          0,
          2 * Math.PI
        );
        ctxEdit.fill();
      } else {
        ctxEdit.beginPath();
        ctxEdit.fillStyle = 'green';
        ctxEdit.moveTo(
          vertices[0]['x'] / imgNewSizeRatio,
          vertices[0]['y'] / imgNewSizeRatio
        );
        ctxEdit.lineTo(
          vertices[1]['x'] / imgNewSizeRatio,
          vertices[1]['y'] / imgNewSizeRatio
        );
        ctxEdit.lineTo(
          vertices[2]['x'] / imgNewSizeRatio,
          vertices[2]['y'] / imgNewSizeRatio
        );
        ctxEdit.lineTo(
          vertices[3]['x'] / imgNewSizeRatio,
          vertices[3]['y'] / imgNewSizeRatio
        );
        ctxEdit.fill();
      }
    } else {
      continue;
    }
  }
}
