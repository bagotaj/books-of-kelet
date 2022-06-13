let ctx;

function initializeSite() {
  const canvas = createCanvas();
  ctx = canvas.getContext('2d');

  function createCanvas() {
    const result = document.getElementById('canvas');
    result.width = window.innerWidth;
    getImage(result, backgroundShelvesTitle);
    setBookShelvesClassIndex();

    return result;
  }

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;

    if (window.innerWidth < backgroundShelvesWidth) {
      getImage(canvas, backgroundShelvesTitle);
      setBookShelvesClassIndex();
      createBookTitleCanvas();
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
