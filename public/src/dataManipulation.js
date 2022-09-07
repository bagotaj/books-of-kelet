function dataManipulation(type, index, newcoords) {
  const data = document.getElementById(index);

  if (type === 'save') {
    if (bookTitles[index] !== undefined && bookTitles[index].id !== undefined) {
      bookTitles[index]['paragraph'] = data.value;
      bookTitles[index]['searchparagraph'] = data.value.toLowerCase();

      addDataToBooks(bookTitles[index]);
    } else {
      if (index === 'newBookTitleInput') {
        bookTitles.push({
          display: 'on',
          boundingBox: {
            vertices: [
              {
                x: newcoords.x * imgNewSizeRatio,
                y: newcoords.y * imgNewSizeRatio,
              },
            ],
          },
          paragraph: data.value,
        });

        data.value = '';
      } else {
        bookTitles[index]['paragraph'] = data.value;
        data.value = '';
      }
    }

    saveItemToLocalStorage('bookTitles', bookTitles);
  } else if (type === 'delete') {
    bookTitles[index]['display'] = 'off';

    saveItemToLocalStorage('bookTitles', bookTitles);
  }

  createBookTitlesTable();
}

function searchBasicsShelvesData(ImgName) {
  return savedBasicsShelvesData.filter((obj) => {
    return obj.basicShelfTitle === ImgName;
  });
}

function makeImgNewSizeRatioNumber(imageHeightData) {
  let originalImageHeight = imageHeightData.original;
  let resizedImageHeight = imageHeightData.resized;
  let ratioNumber = 100 / ((100 * resizedImageHeight) / originalImageHeight);

  return ratioNumber;
}

function makeShelfCoords(shelfDataArr) {
  let centroidX = 0;
  let centroidY = 0;
  // -1 because the last element of the array is the image name
  let amountOfCoords;
  if (shelfDataArr.length > 4) {
    amountOfCoords = shelfDataArr.length - 1;
  } else {
    amountOfCoords = shelfDataArr.length;
  }

  for (let i = 0; i < amountOfCoords; i++) {
    centroidX += shelfDataArr[i].x;
    centroidY += shelfDataArr[i].y;
    console.log('data manipulation', shelfDataArr[i].x, centroidY);
  }

  let centroidCoords = {
    x: Math.round(centroidX / amountOfCoords),
    y: Math.round(centroidY / amountOfCoords),
  };

  return centroidCoords;
}
