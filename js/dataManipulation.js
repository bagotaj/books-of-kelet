function dataManipulation(type, index, newcoords) {
  const data = document.getElementById(index);

  if (type === 'save') {
    if (index === 'newBookTitleInput') {
      bookTitles.push({
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
    } else {
      bookTitles[index]['paragraph'] = data.value;
    }

    saveItemToLocalStorage('bookTitles', bookTitles);
  } else if (type === 'delete') {
    bookTitles.splice(index, 1);

    saveItemToLocalStorage('bookTitles', bookTitles);
  }

  createBookTitlesTable(edit);
}
