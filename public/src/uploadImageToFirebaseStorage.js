// Source https://youtu.be/ZH-PnY-JGBU

let ImgName;
let files = [];
let reader;

// Select button
let selectButtonNewBasicShelf = document.querySelector(
  '#selectButtonNewBasicShelf'
);
selectButtonNewBasicShelf.addEventListener('click', (e) => {
  selectImage(e);

  startPageButtons.classList.add('displaynone');
  addNewShelfImageButtons.classList.remove('displaynone');
});

// Select image function

function selectImage(e) {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = '.jpg, .jpeg, .png';

  input.onchange = (e) => {
    files = e.target.files;
    let fileName = files[0].name;

    reader = new FileReader();
    reader.onload = function () {
      // hide canvas if visible
      let existCanvasImageUploadDisplaynone =
        canvasImageUpload.classList.contains('displaynone');

      if (!existCanvasImageUploadDisplaynone) {
        canvasImageUpload.classList.add('displaynone');
        showingImageImageUpload.classList.remove('displaynone');
      }

      // show chosen image on the site
      let showImage = document.querySelector('#myimg');
      let imageNameBox = document.querySelector('#namebox');

      showImage.src = reader.result;

      let indexOfDot = fileName.indexOf('.');

      imageNameBox.value = fileName.slice(0, indexOfDot);
    };
    reader.readAsDataURL(files[0]);
  };
  input.click();
}

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
      alert('image added successfully');

      canvasImageUpload.classList.remove('displaynone');
      showingImageImageUpload.classList.add('displaynone');

      addNewShelfImageButtons.classList.add('displaynone');
      saveNewShelfButtons.classList.remove('displaynone');

      const blobURL = URL.createObjectURL(files[0]);
      setImageuploadCanvasBackground(imageuploadcanvas, blobURL);
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
