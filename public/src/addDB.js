function addBasicsToFirestore(dataOfImageToFirebase) {
  let basicShelfTitle = dataOfImageToFirebase.basicShelfTitle;
  let basicShelfParams = {
    width: dataOfImageToFirebase.basicShelfParams.width,
    height: dataOfImageToFirebase.basicShelfParams.height,
  };

  dbconnection
    .collection('basics')
    .doc()
    .set({ basicShelfTitle, basicShelfParams })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}

function addShelfBoxCoordsToFirestore(shelfBoxSendingDataObj) {
  let basicShelf = dbconnection
    .collection('basics')
    .where('basicShelfTitle', '==', shelfBoxSendingDataObj.shelfTitle);

  basicShelf
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((shelf) => {
        if (!shelf.exists) {
          throw 'Document does not exist!';
        }

        dbconnection.collection('basics').doc(shelf.id).update({
          shelfBoxCoords: shelfBoxSendingDataObj.shelfBoxCoords,
          shelfGridCoords: shelfBoxSendingDataObj.shelfGridCoords,
        });
      });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}

function addShelvesToFirestore(dataOfImageToFirebase) {
  dbconnection
    .collection('shelves')
    .doc()
    .set(dataOfImageToFirebase)
    .catch((error) => {
      console.error('Error adding document: ', error);
      // alert('Error adding document: ', error.message);
    });
}
