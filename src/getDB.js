function getBooksByABC(letterStart, letterEnd) {
  let booksRef;

  if (letterEnd === undefined) {
    booksRef = dbconnection
      .collection('books')
      .orderBy('paragraph')
      .startAt(letterStart)
      .endAt(letterStart);
  } else {
    booksRef = dbconnection
      .collection('books')
      .orderBy('paragraph')
      .startAt(letterStart)
      .endAt(letterEnd);
  }

  booksRef
    .get()
    .then((querySnapshot) => {
      let books = [];

      querySnapshot.forEach((book) => {
        if (book.data()['display'] === 'on') {
          books.push(book.data());
        }
      });

      return books;
    })
    .then((books) => {
      createMainBookTitlesTable(books);
      makePagination(books);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}

function getImage(canvas, ImgName) {
  let imageURL;

  storageconnection
    .ref(`assets/img/${ImgName}.jpeg`)
    .getDownloadURL()
    .then((url) => {
      setCanvasWrapperIndex(canvas, url);
    })
    .catch((error) => {
      // Handle any errors
      alert('error in saving the image', error);
    });

  return imageURL;
}
