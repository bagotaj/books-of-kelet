function makeSortedBookTitles() {
  let sortedBookTitles = [];

  for (const shelfName in dbbooks) {
    const bookTitlesData = dbbooks[shelfName]['bookdata'];

    for (let i = 0; i < bookTitlesData.length; i++) {
      bookTitlesData[i]['imageTitle'] = dbbooks[shelfName]['imageName'];
      bookTitlesData[i]['shelfName'] = shelfName;
      sortedBookTitles.push(bookTitlesData[i]);
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
