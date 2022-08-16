let clickedShelfPoint = false;
let colorShelfPoint = 'red';
let blinkShelvesPoint;

function showBookshelves(bookTitlesOnImage, shelfName, shelfCoordsX) {
  const bookshelves = document.getElementById('book-shelves-id');

  if (shelfCoordsX['x'] * shelvesCoordsRatio < window.innerWidth / 2) {
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
  let imgDataObj1 = {
    mainCanvas: canvasBookTitle,
    ImgName: bookTitlesOnImage,
    argFunction: getShelvesData,
  };

  let imgDataObj2 = {
    mainCanvas: canvasBookTitle,
    ImgName: bookTitlesOnImage,
    argFunction: setCanvasWrapperIndex,
  };

  getImage(imgDataObj1);
  getImage(imgDataObj2);
  bookshelves.style.backgroundRepeat = 'no-repeat';
  bookshelves.style.backgroundSize = 'cover';

  drawBookshelvesPoint(shelfName);
}

function setBookshelvesBackgroundImage(imageURL) {
  const bookshelves = document.getElementById('book-shelves-id');
  bookshelves.style.backgroundImage = `url(${imageURL})`;
}

function drawBookshelvesPoint(shelfName) {
  dbconnection
    .collection('shelves')
    .where('shelfName', '==', shelfName)
    .get()
    .then((doc) => {
      let shelves = [];

      doc.forEach((shelf) => {
        shelves.push(shelf.data());
      });

      return shelves;
    })
    .then((shelves) => {
      if (shelves.length !== 0) {
        let pointXShelves = shelves[0]['shelfCoords']['x'];
        let pointYShelves = shelves[0]['shelfCoords']['y'];

        if (clickedShelfPoint) {
          clearInterval(blinkShelvesPoint);
        }

        blinkShelvesPoint = setInterval(() => {
          blinkShelfPoint(pointXShelves, pointYShelves);
        }, 1000);
      } else {
        alert('Hiba történt');
      }
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
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
