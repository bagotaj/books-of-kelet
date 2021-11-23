function makeSortedBookTitles() {
  let sortedBookTitles = [];

  for (const imageTitle in dbbooks) {
    const bookTitlesData = dbbooks[imageTitle]['bookdata'];

    for (let i = 0; i < bookTitlesData.length; i++) {
      bookTitlesData[i]['imageTitle'] = imageTitle;
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
