let ctx;

function initializeSite() {
  const canvas = createCanvas();
  ctx = canvas.getContext('2d');

  function createCanvas() {
    const result = document.getElementById('canvas');
    result.width = window.innerWidth;
    getImage(result, backgroundShelvesTitle);

    return result;
  }

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;

    const isEmptyBasic = Object.keys(backgroundBasicShelfImage).length === 0;
    if (!isEmptyBasic) {
      setCanvasWrapperIndex(
        backgroundBasicShelfImage.canvasDOM,
        backgroundBasicShelfImage.imageURL,
        backgroundBasicShelfImage.ImgName
      );
    }

    const isEmptyBook = Object.keys(backgroundBookShelfImage).length === 0;
    if (!isEmptyBook) {
      setCanvasWrapperIndex(
        backgroundBookShelfImage.canvasDOM,
        backgroundBookShelfImage.imageURL,
        backgroundBookShelfImage.ImgName
      );
    }
  });
}

function setBookShelvesClassIndex() {
  const bookShelvesClass = document.querySelectorAll('.book-shelves');

  let canvasHeight = setCanvasHeightIndex();

  bookShelvesClass[0].style.height = canvasHeight * 0.8;
}

function setSearchField() {
  let searchButton = document.querySelector('#searchButton');
  let searchInputField = document.querySelector('#searchinput');

  searchButton.addEventListener('click', () => {
    let text = searchInputField.value;
    searchData(text);
  });

  searchInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchButton.click();
    }
  });
}
