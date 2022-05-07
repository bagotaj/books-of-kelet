function createFirebaseDBBooks() {
  let newDB = { 1: [], 2: [], 3: [] };
  let newDB2 = [];

  for (let key in dbbooks) {
    let bookdataArr = dbbooks[key].bookdata;

    bookdataArr.forEach((book) => {
      book['imageTitle'] = dbbooks[key]['imageName'];
      book['shelfName'] = key;
      book['shelfCoords'] = {
        x: dbbooks[key]['shelfcoords']['x'],
        y: dbbooks[key]['shelfcoords']['y'],
      };

      newDB2.push(book);
    });
  }

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

  newDB2.forEach((element) => {
    if (newDB['1'].length === 450) {
      if (newDB['2'].length === 450) {
        newDB['3'].push(element);
      } else {
        newDB['2'].push(element);
      }
    } else {
      newDB['1'].push(element);
    }
  });

  // console.log('Ordered Books', newDB);
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
