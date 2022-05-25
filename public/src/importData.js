let loggedinContainerDataUpdateButton =
  document.querySelector('#dataupdateButton');
loggedinContainerDataUpdateButton.addEventListener('click', submitImportData);

let loggedinContainerRadioButtons = document.querySelectorAll(
  'input[name="createFirebaseDBRadio"]'
);

function submitImportData() {
  let selectedCollection;

  for (const radioButton of loggedinContainerRadioButtons) {
    if (radioButton.checked) {
      selectedCollection = radioButton.value;
      break;
    }
  }

  let selectedData;

  if (selectedCollection === 'books') {
    selectedData = createFirebaseDBBooks();
  } else {
    selectedData = createFirebaseDBShelves();
  }

  let docRef = dbconnection.collection(selectedCollection);

  for (let batch in selectedData) {
    // console.log(selectedData[batch]);
    selectedData[batch].forEach((book) => {
      docRef
        .add(book)
        .then(() => {
          console.log('Document written');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          alert('Error adding document: ', error.message);
        });
    });
  }
  // console.log(selectedData);
  // let firebaseBatch = dbconnection.batch();

  // for (let batch in selectedData) {
  //   console.log('Batch', selectedData[batch].length);
  //   selectedData[batch].forEach((book) => {
  //     let docRef = dbconnection.collection(selectedCollection).doc();

  //     firebaseBatch.set(docRef, book);
  //   });
  // }

  // firebaseBatch
  //   .commit()
  //   .then(() => {
  //     console.log('Document written');
  //   })
  //   .catch((error) => {
  //     console.error('Error adding document: ', error);
  //     alert('Error adding document: ', error.message);
  //   });
}
