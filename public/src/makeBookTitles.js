const buttonMakeBookTitles = document.getElementById('makeBookTitlesButton');
buttonMakeBookTitles.addEventListener('click', makeBookTitles);

let blocks = db[0]['fullTextAnnotation']['pages'][0]['blocks'];

function makeBookTitles() {
  const bookTitlesWithCoordinates = [];

  for (let i = 0; i < blocks.length; i++) {
    let boundingBox;
    let paragraphs = blocks[i]['paragraphs'];
    let wordsOfParagraphs;
    let paragraphText;

    if (paragraphs.length > 1) {
      paragraphs.forEach((element) => {
        boundingBox = element['boundingBox'];

        wordsOfParagraphs = element['words'];
        paragraphText = makeParagraphs(wordsOfParagraphs);

        bookTitlesWithCoordinates.push({
          display: 'on',
          boundingBox: boundingBox,
          oldparagraph: paragraphText,
          paragraph: paragraphText,
        });
      });
    } else {
      boundingBox = blocks[i]['boundingBox'];

      wordsOfParagraphs = blocks[i]['paragraphs'][0]['words'];
      paragraphText = makeParagraphs(wordsOfParagraphs);

      bookTitlesWithCoordinates.push({
        display: 'on',
        boundingBox: boundingBox,
        oldparagraph: paragraphText,
        paragraph: paragraphText,
      });
    }
  }

  localStorage.setItem('bookTitles', JSON.stringify(bookTitlesWithCoordinates));
}

function makeParagraphs(wordsOfParagraphs) {
  let bookTitle = '';

  for (let i = 0; i < wordsOfParagraphs.length; i++) {
    let word = '';
    let symbolsOfWord = wordsOfParagraphs[i]['symbols'];

    for (let j = 0; j < symbolsOfWord.length; j++) {
      word = word + symbolsOfWord[j]['text'];
    }
    bookTitle = bookTitle + word + ' ';
  }

  return bookTitle;
}
