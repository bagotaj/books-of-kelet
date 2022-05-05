// Source https://youtu.be/ZH-PnY-JGBU

let ImgName, ImgUrl;
let files = [];
let reader;

// Select button
let selectButton = document.querySelector('#selectButton');
selectButton.addEventListener('click', (e) => {
  let input = document.createElement('input');
  input.type = 'file';

  input.onchange = (e) => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function () {
      // show chosen image on the site
      document.getElementById('myimg').src = reader.result;
    };
    reader.readAsDataURL(files[0]);
  };
  input.click();
});

// Upload button
let uploadButton = document.querySelector('#uploadButton');
uploadButton.addEventListener('click', () => {
  // Namebox - give the name to the image file
  ImgName = document.getElementById('namebox').value;
  let uploadTask = storageconnection
    .ref(`assets/img/${ImgName}.jpeg`)
    .put(files[0]);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById('UpProgress').innerText = `Upload ${progress}%`;
    },

    // error handling
    (error) => {
      alert('error in saving the image');
    },

    // submit image link to database / image added to database
    () => {
      // uploadTask.snapshot.ref.getDownloadURL().then((url) => {
      //   ImgUrl = url;

      //   dbconnection
      //     .collection('images')
      //     .add({
      //       Name: ImgName,
      //       Link: ImgUrl,
      //     })
      //     .then(() => {
      //       console.log('Document written');
      //     })
      //     .catch((error) => {
      //       console.error('Error adding document: ', error);
      //     });

      //   // firebase.auth().database().ref(`images/${ImgName}`).set({
      //   //       Name: ImgName,
      //   //       Link: ImgUrl,
      //   //     });
      // });

      alert('image added successfully');
    }
  );
});

// Retrieval button
let retrievalButton = document.querySelector('#retrievalButton');
retrievalButton.addEventListener('click', () => {
  ImgName = document.getElementById('namebox').value;

  storageconnection
    .ref(`assets/img/${ImgName}.jpeg`)
    .getDownloadURL()
    .then((url) => {
      // show downloaded image on the site
      document.getElementById('myimg').src = url;
    })
    .catch((error) => {
      // Handle any errors
      alert('error in saving the image', error);
    });
});
