function getImage(mainCanvas, ImgName) {
  storageconnection
    .ref(`assets/img/${ImgName}.jpeg`)
    .getDownloadURL()
    .then((url) => {
      if (mainCanvas === 'bookshelves') {
        setBookshelvesBackgroundImage(url);
      } else {
        setCanvasWrapperIndex(mainCanvas, url);
      }
    })
    .then(() => {
      if (mainCanvas.id === 'imageuploadcanvas') {
        makeShelfGridFromCoords({
          ImgName: ImgName,
          passedctx: ctxImageUpload,
          passedcanvas: imageuploadcanvas,
        });
      }

      if (mainCanvas.id === 'canvasEdit') {
        makeShelfGridFromCoords({
          ImgName: ImgName,
          passedctx: ctxEdit,
          passedcanvas: canvasEdit,
        });
      }
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

function getShelvesData() {
  dbconnection
    .collection('shelves')
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
