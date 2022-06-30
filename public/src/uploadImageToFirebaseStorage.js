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

  setUploadImageupload = 'basicshelf';

  startPageButtons.classList.add('displaynone');
  addNewShelfImageButtons.classList.remove('displaynone');
});

// Select image function

function selectImage(e) {
  let buttonId = e.target.id;

  if (buttonId === 'imageuploadcanvas') {
    setUploadImageupload = 'smallshelf';

    startPageButtons.classList.add('displaynone');
    addNewShelfImageButtons.classList.remove('displaynone');
  }

  let input = document.createElement('input');
  input.type = 'file';
  input.accept = '.jpg, .jpeg, .png';

  input.onchange = (e) => {
    files = e.target.files;
    let fileName = files[0].name;

    reader = new FileReader();
    reader.onload = function () {
      let imageNameBox = document.querySelector('#namebox');

      let indexOfDot = fileName.indexOf('.');

      imageNameBox.value = fileName.slice(0, indexOfDot);
      ImgName = imageNameBox.value;
    };
    reader.readAsDataURL(files[0]);

    const blobURL = URL.createObjectURL(files[0]);
    let sendingData = {
      canvasTitle: imageuploadcanvas,
      blobURL: blobURL,
      buttonId: buttonId,
      ImgName: ImgName,
    };
    setImageuploadCanvasBackground(sendingData);
  };

  input.click();
}

// Upload button
let uploadButton = document.querySelector('#uploadButton');
uploadButton.addEventListener('click', (e) => {
  let buttonId = e.target.id;

  // setting what you can do on canvas - draw grid
  setClickImageuploadCanvas = 'uploadimage';

  // if smallshelf saving canvas image
  if (setUploadImageupload === 'smallshelf') {
    console.log('save canvas image');
    // Ai-nak küldés
    // canvasról lementeni a képet - max 500 pixel magas - és beküldeni az adatbázisba
    // https://stackoverflow.com/questions/13938686/can-i-load-a-local-file-into-an-html-canvas-element
  }

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

      if (setUploadImageupload === 'basicshelf') {
        canvasImageUpload.classList.remove('displaynone');
        showingImageImageUpload.classList.add('displaynone');

        addNewShelfImageButtons.classList.add('displaynone');
        saveNewShelfButtons.classList.remove('displaynone');
      }

      const blobURL = URL.createObjectURL(files[0]);
      let sendingData = {
        canvasTitle: imageuploadcanvas,
        blobURL: blobURL,
        buttonId: buttonId,
        ImgName: ImgName,
      };
      setImageuploadCanvasBackground(sendingData);
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
