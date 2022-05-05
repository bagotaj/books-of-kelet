function makeSortedBookTitles() {
  let sortedBookTitles = [];

  for (const shelfName in dbbooks) {
    const bookTitlesData = dbbooks[shelfName]['bookdata'];

    for (let i = 0; i < bookTitlesData.length; i++) {
      if (bookTitlesData[i]['display'] === 'on') {
        bookTitlesData[i]['imageTitle'] = dbbooks[shelfName]['imageName'];
        bookTitlesData[i]['shelfName'] = shelfName;
        bookTitlesData[i]['shelfCoords'] =
          dbbooks[shelfName]['shelfcoords']['x'];

        sortedBookTitles.push(bookTitlesData[i]);
      } else {
        continue;
      }
    }
  }

  sortedBookTitles.sort(function (a, b) {
    var titleA = a.paragraph.toUpperCase();
    var titleB = b.paragraph.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    return 0;
  });

  return sortedBookTitles;
}
