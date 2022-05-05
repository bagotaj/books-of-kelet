function createFirebaseDBBooks() {
  let newDB = { 1: [], 2: [], 3: [] };

  for (let key in dbbooks) {
    let bookdataArr = dbbooks[key].bookdata;

    bookdataArr.forEach((book) => {
      if (newDB['1'].length === 500) {
        if (newDB['2'].length === 500) {
          newDB['3'].push(book);
        } else {
          newDB['2'].push(book);
        }
      } else {
        newDB['1'].push(book);
      }
    });
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
