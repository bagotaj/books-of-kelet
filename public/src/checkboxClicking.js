function isBoxClicked(clickingDataObj) {
  let shelfBoxCoordsObj = searchBasicsShelvesData(backgroundShelvesTitle)[0]
    .shelfBoxCoords;
  let boxKeyValue;

  for (const key in shelfBoxCoordsObj) {
    let rectangleVectors = [
      shelfBoxCoordsObj[key]['0'],
      shelfBoxCoordsObj[key]['2'],
      shelfBoxCoordsObj[key]['3'],
      shelfBoxCoordsObj[key]['1'],
    ];

    let clicked = checkBoxClicking(
      clickingDataObj.newCoords,
      rectangleVectors,
      true
    );

    if (clicked) {
      clickingDataObj.function();
      boxKeyValue = key;
    }
  }

  return boxKeyValue;
}

function checkBoxClicking(mouseVector, rectangleVectors, basicSet) {
  if (basicSet) {
    imgNewSizeRatio = 1;
  }

  let ABP = vector(rectangleVectors[0], rectangleVectors[1], mouseVector);
  let BCP = vector(rectangleVectors[1], rectangleVectors[2], mouseVector);
  let CDP = vector(rectangleVectors[2], rectangleVectors[3], mouseVector);
  let DAP = vector(rectangleVectors[3], rectangleVectors[0], mouseVector);

  if (ABP > 0 && BCP > 0 && CDP > 0 && DAP > 0) {
    return true;
  }

  return false;
}

function vector(p1, p2, mouseVector) {
  const pointXCoord = mouseVector.x;
  const pointYCoord = mouseVector.y;
  const rectX1Coord = p1.x / imgNewSizeRatio;
  const rectY1Coord = p1.y / imgNewSizeRatio;
  const rectX2Coord = p2.x / imgNewSizeRatio;
  const rectY2Coord = p2.y / imgNewSizeRatio;

  return (
    (pointXCoord - rectX1Coord) * (pointYCoord - rectY2Coord) -
    (pointYCoord - rectY1Coord) * (pointXCoord - rectX2Coord)
  );
}
