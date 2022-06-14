let gridXCoords = [];
let gridYCoords = [];
let gridCoordsArr = [];
let shelfGridCoordsArr = [];
let shelfBoxCoordsArr = [];

const saveShelvesButton = document.querySelector('#saveShelves');
saveShelvesButton.addEventListener('click', saveShelves);

function drawGrid(newCoords) {
  let x = newCoords.x;
  let y = newCoords.y;

  gridXCoords.forEach((element) => {
    if (Math.abs(element - x) < 10) {
      x = element;
    }
  });

  gridYCoords.forEach((element) => {
    if (Math.abs(element - y) < 10) {
      y = element;
    }
  });

  let xExist = gridXCoords.includes(x);
  let yExist = gridYCoords.includes(y);

  if (!xExist) {
    gridXCoords.push(x);
  }

  if (!yExist) {
    gridYCoords.push(y);
  }

  shelfGridCoordsArr.push(
    { moveTo: { x: x, y: 0 }, lineTo: { x: x, y: imageuploadcanvas.height } },
    { moveTo: { x: 0, y: y }, lineTo: { x: imageuploadcanvas.width, y: y } }
  );

  ctxImageUpload.beginPath();
  ctxImageUpload.setLineDash([5, 15]);
  ctxImageUpload.lineWidth = 2;
  ctxImageUpload.strokeStyle = 'white';
  ctxImageUpload.moveTo(x, 0);
  ctxImageUpload.lineTo(x, imageuploadcanvas.height);
  ctxImageUpload.closePath();
  ctxImageUpload.stroke();

  ctxImageUpload.beginPath();
  ctxImageUpload.setLineDash([5, 15]);
  ctxImageUpload.lineWidth = 2;
  ctxImageUpload.strokeStyle = 'white';
  ctxImageUpload.moveTo(0, y);
  ctxImageUpload.lineTo(imageuploadcanvas.width, y);
  ctxImageUpload.closePath();
  ctxImageUpload.stroke();
}

function makeGridCoords() {
  for (let i = 0; i < gridXCoords.length; i++) {
    for (let j = 0; j < gridYCoords.length; j++) {
      gridCoordsArr.push({ x: gridXCoords[i], y: gridYCoords[j] });
    }
  }
}

function makeShelfBox() {
  for (let i = 0; i < gridCoordsArr.length; i += gridYCoords.length) {
    if (shelfBoxCoordsArr.length > 0) {
      for (let j = 0; j < gridYCoords.length; j++) {
        if (j + 1 == gridYCoords.length) {
          continue;
        } else {
          if (i == gridCoordsArr.length - gridYCoords.length) {
            shelfBoxCoordsArr[
              shelfBoxCoordsArr.length - gridYCoords.length + j + 1
            ].push(gridCoordsArr[i + j], gridCoordsArr[i + j + 1]);
          } else {
            shelfBoxCoordsArr.push([
              gridCoordsArr[i + j],
              gridCoordsArr[i + j + 1],
            ]);
            shelfBoxCoordsArr[
              shelfBoxCoordsArr.length - gridYCoords.length
            ].push(gridCoordsArr[i + j], gridCoordsArr[i + j + 1]);
          }
        }
      }
    } else {
      for (let j = 0; j < gridYCoords.length; j++) {
        if (j + 1 == gridYCoords.length) {
          continue;
        } else {
          shelfBoxCoordsArr.push([gridCoordsArr[j], gridCoordsArr[j + 1]]);
        }
      }
    }
  }
}

function saveShelves() {
  gridCoordsArr = [];

  gridXCoords.sort((a, b) => {
    return a - b;
  });
  gridYCoords.sort((a, b) => {
    return a - b;
  });

  makeGridCoords();
  makeShelfBox();

  console.log('Shelves Coords', gridCoordsArr);
  console.log('Shelf Boxes', shelfBoxCoordsArr);
  console.log('Shelf Grids', shelfGridCoordsArr);

  let shelfBoxCoordsObj = createShelfBoxCoords(shelfBoxCoordsArr);
  let shelfGridCoordsObj = createShelfBoxCoords(shelfGridCoordsArr);

  let shelfBoxSendingDataObj = {
    shelfTitle: backgroundShelvesTitle,
    shelfBoxCoords: shelfBoxCoordsObj,
    shelfGridCoords: shelfGridCoordsObj,
  };

  addShelfBoxCoordsToFirestore(shelfBoxSendingDataObj);
}
