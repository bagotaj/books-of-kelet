function makeSortedBookTitlesByABC(letter = 'A') {
  let sortedBookTitlesByABC;

  sortedBookTitlesByABC = bookTitles.filter(
    (bookTitle) => bookTitle['paragraph'].trim()[0] === letter
  );

  return sortedBookTitlesByABC;
}
