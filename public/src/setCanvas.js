function setCanvasHeightIndex() {
  let canvasHeight =
    (window.innerWidth * backgroundShelvesHeight) / backgroundShelvesWidth;

  return canvasHeight;
}

function setCanvasWrapperIndex(canvas, imageURL) {
  const canvasWrapperIndexClass = document.querySelectorAll(
    '.canvas-wrapper-index'
  );
  let canvasHeight = setCanvasHeightIndex();

  canvas.height = canvasHeight;
  imgSizeRatioBookTitle =
    7.56 / ((canvasHeight * 0.8) / (backgroundShelvesHeight * 0.8));
  shelvesCoordsRatio = canvasHeight / backgroundShelvesHeight;
  canvasWrapperIndexClass[0].style.height = canvasHeight;
  canvasWrapperIndexClass[0].style.backgroundImage = `url(${imageURL})`;
  console.log(shelvesCoordsRatio);
}

function setImageuploadCanvasBackground(sendingData) {
  let canvas = sendingData.canvasTitle;
  let canvasctx = canvas.getContext('2d');

  if (sendingData.buttonId === 'imageuploadcanvas') {
    canvasImageUpload
      .querySelector('.canvas-wrapper-index')
      .removeAttribute('style');
  }

  img = new Image();
  img.src = sendingData.blobURL;

  img.onload = function () {
    URL.revokeObjectURL(this.src);

    if (sendingData.buttonId === 'selectButtonNewBasicShelf') {
      let dataOfImage = {
        basicShelfParams: { width: img.width, height: img.height },
        basicShelfTitle: sendingData.ImgName,
      };

      setBackgroundShelvesVariables(dataOfImage);
    }

    if (
      sendingData.buttonId === 'uploadButton' &&
      setUploadImageupload === 'basicshelf'
    ) {
      backgroundShelvesTitle = sendingData.ImgName;

      let dataOfImageToFirebase = {
        basicShelfParams: { width: img.width, height: img.height },
        basicShelfTitle: sendingData.ImgName,
      };

      addBasicsToFirestore(dataOfImageToFirebase);
    }

    if (sendingData.buttonId === 'imageuploadcanvas') {
      canvas.height = 500;
      canvas.width = (img.width * 500) / img.height;

      canvasctx.clearRect(0, 0, canvas.width, canvas.height);
      canvasctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      let canvasHeight = setCanvasHeightIndex();

      canvas.height = canvasHeight;
      imgSizeRatioBookTitle =
        7.56 / ((canvasHeight * 0.8) / (backgroundShelvesHeight * 0.8));
      shelvesCoordsRatio = canvasHeight / backgroundShelvesHeight;
      canvas.width = img.width * shelvesCoordsRatio;

      canvasctx.clearRect(0, 0, canvas.width, canvas.height);
      canvasctx.drawImage(
        img,
        0,
        0,
        img.width * shelvesCoordsRatio,
        img.height * shelvesCoordsRatio
      );
    }

    if (sendingData.buttonId === 'selectButtonNewBasicShelf') {
      gridXCoords.push(0, canvas.width);
      gridYCoords.push(0, canvas.height);
    }
  };
}

// function setImageuploadCanvasBackground(canvas, imageData) {
//   img = new Image();
//   img.src = imageData;

//   img.onload = function () {
//     URL.revokeObjectURL(this.src);

//     let dataOfImage = {
//       basicShelfParams: { width: img.width, height: img.height },
//       basicShelfTitle: '',
//     };

//     setBackgroundShelvesVariables(dataOfImage);

//     let canvasHeight = setCanvasHeightIndex();

//     canvas.height = canvasHeight;
//     imgSizeRatioBookTitle =
//       7.56 / ((canvasHeight * 0.8) / (backgroundShelvesHeight * 0.8));
//     shelvesCoordsRatio = canvasHeight / backgroundShelvesHeight;

//     ctxImageUpload.drawImage(
//       img,
//       0,
//       0,
//       img.width * shelvesCoordsRatio,
//       img.height * shelvesCoordsRatio
//     );

//     gridXCoords.push(0, canvas.width);
//     gridYCoords.push(0, canvas.height);
//   };
// }
