function getBooksByABC(letterStart, letterEnd) {
  let booksRef = dbconnection
    .collection('books')
    .orderBy('paragraph')
    .startAt(letterStart)
    .endAt(letterEnd);

  booksRef
    .get()
    .then((querySnapshot) => {
      let books = [];

      querySnapshot.forEach((book) => {
        books.push(book.data());
      });

      return books;
    })
    .then((books) => {
      createMainBookTitlesTable(books);
      createABCLinkButtons();
      makePagination(books);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}
