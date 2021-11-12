let clickedShelfPoint = false;
let colorShelfPoint = 'red';

function showBookshelves(bookTitlesOnImage) {
  const bookshelvesright = document.getElementById('book-shelves-right-id');
  bookshelvesright.style.display = 'block';
  bookshelvesright.style.backgroundImage = `url(../img/${bookTitlesOnImage}.jpeg)`;
  bookshelvesright.style.backgroundRepeat = 'no-repeat';
  bookshelvesright.style.backgroundSize = 'cover';

  drawBookshelvesPoint(bookTitlesOnImage);
}

function drawBookshelvesPoint(imageName) {
  const bookShelfPointData = dbbooks[imageName]['shelfcoords'];

  pointXShelves = bookShelfPointData['x'];
  pointYShelves = bookShelfPointData['y'];

  const blinkShelvesPoint = setInterval(() => {
    blinkShelfPoint(pointXShelves, pointYShelves);
  }, 1000);

  if (clickedShelfPoint) {
    clearInterval(blinkShelvesPoint);
  }
}

function blinkShelfPoint(pointXShelves, pointYShelves) {
  clickedShelfPoint = true;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(pointXShelves, pointYShelves, 15, 0, 2 * Math.PI);
  if (colorShelfPoint === 'red') {
    colorShelfPoint = '';
  } else {
    ctx.fill();
    colorShelfPoint = 'red';
  }
}
