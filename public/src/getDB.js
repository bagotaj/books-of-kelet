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
      // makePagination(books);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}

function getImage(mainCanvas, ImgName) {
  storageconnection
    .ref(`assets/img/${ImgName}.jpeg`)
    .getDownloadURL()
    .then((url) => {
      if (mainCanvas === 'bookshelves') {
        setBookshelvesBackgroundImage(url);
      } else {
        setCanvasWrapperIndex(canvas, url);
      }
    })
    .catch((error) => {
      // Handle any errors
      alert('error in saving the image', error);
    });
}

function checkUsersData(userId) {
  let admin;

  booksRef = dbconnection.collection('users').where('admin', '==', true);

  booksRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        if (user.data()['UID'] === userId) {
          admin = true;
        }
      });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });

  return admin;
}
