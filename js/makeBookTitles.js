const button = document.getElementById('makeBookTitlesButton');
button.addEventListener('click', makeBookTitles);

function makeBookTitles() {
  const bookTitlesWithCoordinates = [];

  for (let i = 0; i < blocks.length; i++) {
    const boundingBox = blocks[i]['boundingBox'];
    const wordsOfParagraphs = blocks[i]['paragraphs'][0]['words'];
    const paragraphText = makeParagraphs(wordsOfParagraphs);

    bookTitlesWithCoordinates.push({
      boundingBox: boundingBox,
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
