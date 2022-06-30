let gridXCoords = [];
let gridYCoords = [];
let gridCoordsArr = [];
let shelfBoxCoordsArr = [];

const saveShelvesButton = document.querySelector('#saveShelves');
saveShelvesButton.addEventListener('click', () => {
  setClickImageuploadCanvas = 'grid';
  saveShelves();

  saveNewShelfButtons.classList.add('displaynone');
});

function drawAndCalculateGrid(newCoords) {
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

  drawGrid({ x: x, y: y });
}

function drawGrid(coords) {
  ctxImageUpload.beginPath();
  ctxImageUpload.setLineDash([5, 15]);
  ctxImageUpload.lineWidth = 2;
  ctxImageUpload.strokeStyle = 'white';
  ctxImageUpload.moveTo(coords.x, 0);
  ctxImageUpload.lineTo(coords.x, imageuploadcanvas.height);
  ctxImageUpload.closePath();
  ctxImageUpload.stroke();

  ctxImageUpload.beginPath();
  ctxImageUpload.setLineDash([5, 15]);
  ctxImageUpload.lineWidth = 2;
  ctxImageUpload.strokeStyle = 'white';
  ctxImageUpload.moveTo(0, coords.y);
  ctxImageUpload.lineTo(imageuploadcanvas.width, coords.y);
  ctxImageUpload.closePath();
  ctxImageUpload.stroke();
}

function makeGridCoords() {
  for (let i = 0; i < gridXCoords.length; i++) {
    for (let j = 0; j < gridYCoords.length; j++) {
      let newX = gridXCoords[i] / shelvesCoordsRatio;
      let newY = gridYCoords[j] / shelvesCoordsRatio;

      gridCoordsArr.push({ x: newX, y: newY });
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

  let shelfBoxCoordsObj = createShelfBoxCoords(shelfBoxCoordsArr);
  let shelfGridCoordsObj = createShelfBoxCoords(gridCoordsArr);

  let shelfBoxSendingDataObj = {
    shelfTitle: backgroundShelvesTitle,
    shelfBoxCoords: shelfBoxCoordsObj,
    shelfGridCoords: shelfGridCoordsObj,
  };

  savedBasicsShelvesData.push(shelfBoxSendingDataObj);
  addShelfBoxCoordsToFirestore(shelfBoxSendingDataObj);
}

function makeShelfGridFromCoords() {
  let shelfGridCoordsObj = savedBasicsShelvesData[0].shelfGridCoords;

  for (const key in shelfGridCoordsObj) {
    let x = shelfGridCoordsObj[key].x * shelvesCoordsRatio;
    let y = shelfGridCoordsObj[key].y * shelvesCoordsRatio;

    drawGrid({ x: x, y: y });
  }
}
