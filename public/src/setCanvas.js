function setCanvasHeightIndex(imageWidth) {
  let canvasDOMHeight =
    (imageWidth * backgroundShelvesHeight) / backgroundShelvesWidth;

  return canvasDOMHeight;
}

function setCanvasWrapperIndex(canvasDOM, imageURL, ImgName) {
  const isEmptyBasic = Object.keys(backgroundBasicShelfImage).length === 0;
  const isEmptyBook = Object.keys(backgroundBookShelfImage).length === 0;

  if (canvasDOM.id == 'canvas') {
    if (isEmptyBasic) {
      backgroundBasicShelfImage = {
        canvasDOM: canvasDOM,
        imageURL: imageURL,
        ImgName: ImgName,
      };
    }
  }

  if (isEmptyBook) {
    backgroundBookShelfImage = {
      canvasDOM: canvasDOM,
      imageURL: imageURL,
      ImgName: ImgName,
    };
  }
  let canvasWrapperIndexClass;
  let canvasWrapperIndexClassWidth;

  if (canvasDOM.id == 'canvasBookTitles') {
    canvasWrapperIndexClass = document.getElementById('book-shelves-id');
    canvasWrapperIndexClassWidth = 667;
  } else {
    canvasWrapperIndexClass = document.querySelectorAll(
      '.canvas-wrapper-index'
    )[0];
    // canvasWrapperIndexClassWidth = window.innerWidth;
    canvasWrapperIndexClassWidth = window.visualViewport.width;
  }

  let img = new Image();
  img.src = imageURL;
  img.onload = function () {
    URL.revokeObjectURL(this.src);

    let imageWidth = img.width;
    let imageHeight = img.height;

    let canvasDOMHeight;
    let canvasDOMWidth;

    if (canvasDOM.id == 'canvasBookTitles') {
      let canvasWrapperIndexDOM = document.querySelectorAll(
        '.canvas-wrapper-index'
      )[0];
      canvasDOMHeight = canvasWrapperIndexDOM.offsetHeight * 0.8;
      canvasDOMWidth = (imageWidth * canvasDOMHeight) / imageHeight;
    } else {
      if (imageWidth > canvasWrapperIndexClassWidth) {
        canvasDOMWidth = canvasWrapperIndexClassWidth;
        canvasDOMHeight =
          (canvasWrapperIndexClassWidth * imageHeight) / imageWidth;
      }

      if (imageWidth < canvasWrapperIndexClassWidth) {
        canvasDOMHeight = imageHeight;
        canvasDOMWidth = imageWidth;
      }

      if (
        imageWidth < canvasWrapperIndexClassWidth &&
        canvasDOM.id === 'canvasEdit'
      ) {
        canvasDOMHeight = imageHeight;
        canvasDOMWidth = imageWidth;
      }

      imgSizeRatioBookTitle =
        7.56 / ((canvasDOMHeight * 0.8) / (imageHeight * 0.8));
      shelvesCoordsRatio = canvasDOMHeight / imageHeight;
    }

    canvasDOM.height = canvasDOMHeight;
    canvasDOM.width = canvasDOMWidth;

    canvasWrapperIndexClass.style.height = canvasDOMHeight;
    canvasWrapperIndexClass.style.width = canvasDOMWidth;
    canvasWrapperIndexClass.style.backgroundImage = `url(${imageURL})`;
    canvasWrapperIndexClass.style.backgroundPosition = 'center';

    if (canvasDOM.id === 'imageuploadcanvas') {
      makeShelfGridFromCoords({
        ImgName: ImgName,
        passedctx: ctxImageUpload,
        passedcanvas: imageuploadcanvas,
      });
    }

    if (canvasDOM.id === 'canvasEdit') {
      if (booksFromLocalStorageBoolean) {
        console.log('imgNewSizeRatio', imgNewSizeRatio);
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
