function dataManipulation(type, index, newcoords) {
  const data = document.getElementById(index);

  if (type === 'save') {
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
