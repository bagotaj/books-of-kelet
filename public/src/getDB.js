function getImage(imgDataObj) {
  storageconnection
    .ref(`assets/img/${imgDataObj.ImgName}.jpeg`)
    .getDownloadURL()
    .then((url) => {
      imgDataObj.argFunction(imgDataObj.mainCanvas, url, imgDataObj.ImgName);
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

function getShelvesData(mainCanvas, url, ImgName) {
  let shelfData = dbconnection
    .collection('shelves')
    .where('imageTitle', '==', ImgName);

  shelfData
    .get()
    .then((doc) => {
      doc.forEach((querySnapshot) => {
        if (!querySnapshot.exists) {
          throw 'Document does not exist!';
        }

        if (mainCanvas.id === 'canvasEdit') {
          imgNewSizeRatio = querySnapshot.data().imgNewSizeRatio;

          dataOfImageToFirebase = {
            basicShelf: querySnapshot.data().basicShelf,
            imageTitle: querySnapshot.data().imageTitle,
            shelfCoords: querySnapshot.data().shelfCoords,
            shelfName: querySnapshot.data().shelfName,
            imgNewSizeRatio: imgNewSizeRatio,
          };

          let imgDataObj = {
            mainCanvas: canvasEdit,
            ImgName: ImgName,
            argFunction: setCanvasWrapperIndex,
          };

          getImage(imgDataObj);
        }

        if (mainCanvas.id === 'canvasBookTitles') {
          let basicShelfTitle;

          basicShelfTitle = querySnapshot.data().basicShelf;

          if (backgroundShelvesTitle !== basicShelfTitle) {
            let imgDataObj = {
              mainCanvas: canvas,
              ImgName: querySnapshot.data().basicShelf,
              argFunction: setCanvasWrapperIndex,
            };

            getImage(imgDataObj);
          }

          let img = makeImage({
            src: url,
            function: function () {
              let dataObj = {
                basicShelfTitle: basicShelfTitle,
                basicShelfParams: {
                  x: img.width,
                  y: img.height,
                },
              };

              setBackgroundShelvesVariables(dataObj);
            },
          });
        }
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
            if (imageName === undefined) {
              alert('Shelf does not exist');
            } else {
              getShelvesData(canvasEdit, 'url', imageName);
            }
          }
        }
      });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}
