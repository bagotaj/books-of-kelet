const buttonMakeBookTitles = document.getElementById('makeBookTitlesButton');
buttonMakeBookTitles.addEventListener('click', makeBookTitles);

function makeBookTitles() {
  const bookTitlesWithCoordinates = [];

  for (let i = 0; i < blocks.length; i++) {
    const boundingBox = blocks[i]['boundingBox'];
    const wordsOfParagraphs = blocks[i]['paragraphs'][0]['words'];
    const paragraphText = makeParagraphs(wordsOfParagraphs);

    bookTitlesWithCoordinates.push({
      display: 'on',
      boundingBox: boundingBox,
      oldparagraph: paragraphText,
      paragraph: paragraphText,
    });
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