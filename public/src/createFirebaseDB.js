function createFirebaseDBBooks() {
  let newDB = {};
  let newDB2 = [];

  // Changing !!!!!
  let booksFromLocalStorage = getItemFromLocalStorage('bookTitles');
  let basicShelf = 'kelet-header';
  let imageTitle = 'IMG_3893';
  let shelfName = '7C';
  let shelfCoords = {
    x: 955,
    y: 324,
  };
  // Books data from local storage

  booksFromLocalStorage.forEach((book) => {
    book['basicShelf'] = basicShelf;
    book['imageTitle'] = imageTitle;
    book['shelfName'] = shelfName;
    book['shelfCoords'] = shelfCoords;
    (book['searchparagraph'] = book['paragraph'].toLowerCase()),
      newDB2.push(book);
  });

  // Books data from dbbooks.js file

  // for (let key in dbbooks) {
  //   let bookdataArr = dbbooks[key].bookdata;

  //   bookdataArr.forEach((book) => {
  //     book['imageTitle'] = dbbooks[key]['imageName'];
  //     book['shelfName'] = key;
  //     book['shelfCoords'] = {
  //       x: dbbooks[key]['shelfcoords']['x'],
  //       y: dbbooks[key]['shelfcoords']['y'],
  //     };
  //     (book['searchparagraph'] = book['paragraph'].toLowerCase()),
  //       newDB2.push(book);
  //   });
  // }

  newDB2.sort(function (a, b) {
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

  let amountOfBatch = 450;
  let numberOfnewDBKeys = Math.ceil(newDB2.length / amountOfBatch);

  for (let a = 1; a <= numberOfnewDBKeys; a++) {
    newDB[a] = [];
  }

  for (let i = 0; i < newDB2.length; i++) {
    if (newDB[numberOfnewDBKeys].length === 450) {
      --numberOfnewDBKeys;

      newDB[numberOfnewDBKeys].push(newDB2[i]);
    } else {
      newDB[numberOfnewDBKeys].push(newDB2[i]);
    }
  }

  return newDB;
}

function createFirebaseDBShelves() {
  let newDBShelves = { 1: [] };

  for (let key in dbbooks) {
    let shelfObj = {
      shelfName: key,
      imageTitle: dbbooks[key].imageName,
      shelfCoords: dbbooks[key].shelfcoords,
    };
    newDBShelves['1'].push(shelfObj);
  }

  return newDBShelves;
}

function createShelfBoxCoords(shelfBoxCoordsArr) {
  let shelfBoxCoordsObj = {};

  for (let i = 0; i < shelfBoxCoordsArr.length; i++) {
    shelfBoxCoordsObj[i] = shelfBoxCoordsArr[i];
  }

  return shelfBoxCoordsObj;
}
