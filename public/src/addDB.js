function addShelfBoxCoordsToFirestore(shelfBoxSendingDataObj) {
  console.log(shelfBoxSendingDataObj);

  // let basicShelf = dbconnection
  //   .collection('basics')
  //   .where('basicShelfTitle', '==', shelfBoxSendingDataObj.shelfTitle);

  // basicShelf.get().then((querySnapshot) => {
  //   querySnapshot.forEach((shelf) => {
  //     if (!shelf.exists) {
  //       throw 'Document does not exist!';
  //     }

  //     dbconnection.collection('basics').doc(shelf.id).update({
  //       shelfBoxCoords: shelfBoxSendingDataObj.shelfBoxCoords,
  //       shelfGridCoords: shelfBoxSendingDataObj.shelfGridCoords,
  //     });
  //   });
  // });
}
