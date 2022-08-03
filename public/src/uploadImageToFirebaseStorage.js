// Source https://youtu.be/ZH-PnY-JGBU

let ImgName;
let localImageFiles;
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
    localImageFiles = e.target.files;
    let fileName = localImageFiles[0].name;

    reader = new FileReader();
    reader.onload = function () {
      let imageNameBox = document.querySelector('#namebox');

      let indexOfDot = fileName.indexOf('.');

      imageNameBox.value = fileName.slice(0, indexOfDot);
      ImgName = imageNameBox.value;

      const blobURL = URL.createObjectURL(localImageFiles[0]);
      let sendingData = {
        canvasTitle: imageuploadcanvas,
        blobURL: blobURL,
        buttonId: buttonId,
        ImgName: ImgName,
      };
      setImageuploadCanvasBackground(sendingData);
    };
    reader.readAsDataURL(localImageFiles[0]);
  };

  input.click();
}

// Upload button
let uploadButton = document.querySelector('#uploadButton');
uploadButton.addEventListener('click', (e) => {
  let buttonId = e.target.id;
  let uploadFile = localImageFiles[0];

  // setting what you can do on canvas - draw grid
  setClickCanvas = 'uploadimage';

  // if smallshelf saving canvas image
  if (setUploadImageupload === 'smallshelf') {
    // Ai-nak küldés
    // localImageFiles[0]

    // canvasról lementeni a képet - max 500 pixel magas - és beküldeni az adatbázisba
    // kép lementve és tárolva: resizedLocalImageFile változóban
    // https://stackoverflow.com/questions/13938686/can-i-load-a-local-file-into-an-html-canvas-element
    let dataOfImageToFirebase = {
      basicShelf: backgroundShelvesTitle,
      imageTitle: ImgName,
      shelfCoords: shelfCoordsObj,
      shelfName: clickedShelfBoxKeyNumber,
      imgNewSizeRatio: imgNewSizeRatio,
    };

    let shelfBoxsendingImageDataObj = {
      basicShelfTitle: backgroundShelvesTitle,
      keyValue: clickedShelfBoxKeyNumber,
      ImgName: ImgName,
    };

    uploadFile = resizedLocalImageFile;
    addShelvesToFirestore(dataOfImageToFirebase);
    addImageNameToBasicsShelfBoxCoords(shelfBoxsendingImageDataObj);
  }

  // Namebox - give the name to the image file
  ImgName = document.getElementById('namebox').value;
  let uploadTask = storageconnection
    .ref(`assets/img/${ImgName}.jpeg`)
    .put(uploadFile);

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

      let sendingImage;

      if (setUploadImageupload === 'smallshelf') {
        sendingImage = resizedLocalImageFile;
      } else {
        sendingImage = localImageFiles[0];
      }

      const blobURL = URL.createObjectURL(sendingImage);
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
