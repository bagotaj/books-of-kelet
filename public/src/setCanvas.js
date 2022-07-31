function setCanvasHeightIndex(imageWidth) {
  let canvasHeight =
    (imageWidth * backgroundShelvesHeight) / backgroundShelvesWidth;

  return canvasHeight;
}

function setCanvasWrapperIndex(canvas, imageURL, ImgName) {
  const canvasWrapperIndexClass = document.querySelectorAll(
    '.canvas-wrapper-index'
  );

  img = new Image();
  img.src = imageURL;
  img.onload = function () {
    URL.revokeObjectURL(this.src);

    let imageWidth = img.width;
    let imageHeight = img.height;

    let canvasHeight = imageHeight;
    let canvasWidth = imageWidth;

    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    imgSizeRatioBookTitle =
      7.56 / ((canvasHeight * 0.8) / (backgroundShelvesHeight * 0.8));
    shelvesCoordsRatio = canvasHeight / backgroundShelvesHeight;
    canvasWrapperIndexClass[0].style.height = canvasHeight;
    canvasWrapperIndexClass[0].style.width = canvasWidth;
    canvasWrapperIndexClass[0].style.backgroundImage = `url(${imageURL})`;
    canvasWrapperIndexClass[0].style.backgroundPosition = 'center';

    if (canvas.id === 'imageuploadcanvas') {
      makeShelfGridFromCoords({
        ImgName: ImgName,
        passedctx: ctxImageUpload,
        passedcanvas: imageuploadcanvas,
      });
    }

    if (canvas.id === 'canvasEdit') {
      if (booksFromLocalStorageBoolean) {
        drawBoundingBoxes(imgNewSizeRatio, ImgName);
        createBookTitlesTable();
      } else {
        makeShelfGridFromCoords({
          ImgName: ImgName,
          passedctx: ctxEdit,
          passedcanvas: canvasEdit,
        });
      }
    }
  };
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
      let imageHeightData = {
        original: img.height,
        resized: backgroundShelvesHeight,
      };

      imgNewSizeRatio = makeImgNewSizeRatioNumber(imageHeightData);

      canvas.height = 500;
      canvas.width = (img.width * 500) / img.height;

      canvasctx.clearRect(0, 0, canvas.width, canvas.height);
      canvasctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mime_type = 'image/jpeg';

      canvas.toBlob((blob) => {
        resizedLocalImageFile = new File(
          [blob],
          `${sendingData.ImgName}.jpg`,
          { type: 'image/jpeg', lastModified: new Date().getTime() },
          'utf-8'
        );
      }, mime_type);
    }

    if (sendingData.buttonId === 'selectButtonNewBasicShelf') {
      gridXCoords.push(0, canvas.width);
      gridYCoords.push(0, canvas.height);
    }
  };
}
