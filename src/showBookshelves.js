let clickedShelfPoint = false;
let colorShelfPoint = 'red';
let blinkShelvesPoint;

function showBookshelves(bookTitlesOnImage, shelfName, shelfCoordsX) {
  const bookshelves = document.getElementById('book-shelves-id');
  if (shelfCoordsX * shelvesCoordsRatio < window.innerWidth / 2) {
    if (document.getElementsByClassName('book-shelves-left').length > 0) {
      document
        .getElementsByClassName('book-shelves-left')[0]
        .classList.remove('book-shelves-left');
    }
    bookshelves.classList.add('book-shelves-right');
  } else {
    if (document.getElementsByClassName('book-shelves-right').length > 0) {
      document
        .getElementsByClassName('book-shelves-right')[0]
        .classList.remove('book-shelves-right');
    }
    bookshelves.classList.add('book-shelves-left');
  }
  bookshelves.style.display = 'block';
  bookshelves.style.backgroundImage = `url(../assets/img/${bookTitlesOnImage}.jpeg)`;
  bookshelves.style.backgroundRepeat = 'no-repeat';
  bookshelves.style.backgroundSize = 'cover';

  drawBookshelvesPoint(shelfName);
}

function drawBookshelvesPoint(shelfName) {
  const bookShelfPointData = dbbooks[shelfName]['shelfcoords'];

  let pointXShelves = bookShelfPointData['x'];
  let pointYShelves = bookShelfPointData['y'];

  if (clickedShelfPoint) {
    clearInterval(blinkShelvesPoint);
  }

  blinkShelvesPoint = setInterval(() => {
    blinkShelfPoint(pointXShelves, pointYShelves);
  }, 1000);
}

function blinkShelfPoint(pointXShelves, pointYShelves) {
  clickedShelfPoint = true;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(
    pointXShelves * shelvesCoordsRatio,
    pointYShelves * shelvesCoordsRatio,
    15,
    0,
    2 * Math.PI
  );
  if (colorShelfPoint === 'red') {
    colorShelfPoint = '';
  } else {
    ctx.fill();
    colorShelfPoint = 'red';
  }
}
