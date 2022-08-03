function getImage(mainCanvas, ImgName) {
  storageconnection
    .ref(`assets/img/${ImgName}.jpeg`)
    .getDownloadURL()
    .then((url) => {
      console.log(mainCanvas, ImgName);
      // if (mainCanvas === 'bookshelves') {
      //   setBookshelvesBackgroundImage(url);
      // } else {
      setCanvasWrapperIndex(mainCanvas, url, ImgName);
      // }
    })
    .catch((error) => {
      // Handle any errors
      alert('error in downloading the image');
      console.log(error.message);
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

function searchData(text) {
  let lowercaseText = text.toLowerCase();

  dbconnection
    .collection('books')
    .orderBy('searchparagraph')
    .startAt(lowercaseText)
    .endAt(lowercaseText + '~')
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
      let searchInputField = document.querySelector('#searchinput');
      searchInputField.value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}

function getBasicsShelvesData() {
  dbconnection
    .collection('basics')
    .get()
    .then((doc) => {
      doc.forEach((basicShelf) => {
        makeStartPageButtonsImageUpload(basicShelf.data());
        savedBasicsShelvesData.push(basicShelf.data());
      });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}

function getShelvesData(imageName) {
  dbconnection
    .collection('shelves')
    .where('imageTitle', '==', imageName)
    .get()
    .then((doc) => {
      doc.forEach((querySnapshot) => {
        imgNewSizeRatio = querySnapshot.data().imgNewSizeRatio;
      });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}

function getImageNameFromBasicsShelfBoxCoords(searchingImageKeyValue) {
  let basicShelf = dbconnection
    .collection('basics')
    .where('basicShelfTitle', '==', backgroundShelvesTitle);

  basicShelf
    .get()
    .then((querySnapshot) => {
      setClickCanvas = 'books';

      querySnapshot.forEach((shelf) => {
        if (!shelf.exists) {
          throw 'Document does not exist!';
        }

        for (const key in shelf.data().shelfBoxCoords) {
          if (key === searchingImageKeyValue) {
            let imageName = shelf.data().shelfBoxCoords[key][4];
            booksFromLocalStorageBoolean = true;
            getShelvesData(imageName);
            getImage(canvasEdit, imageName);
          }
        }
      });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}
