const dbconnection = firebase.firestore();

function getDBfromDatabase() {
  dbconnection.collection('test').onSnapshot((querySnapshot) => {
    const results = [];

    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });
    makeListFromData(results);
  });
}

function makeListFromData(results) {
  results.forEach((value) => {
    Object.values(value).map((element) => {
      const loggedinContainerContentData =
        document.querySelector('.contentData');
      const p = document.createElement('p');

      p.textContent = element + ',';
      loggedinContainerContentData.appendChild(p);
    });
  });
}
