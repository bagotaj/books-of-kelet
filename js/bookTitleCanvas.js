function createBookTitleCanvas() {
  const result = document.getElementById('canvasBookTitles');
  result.width = 534;
  result.height = 400;
  return result;
}

const canvasBookTitle = createBookTitleCanvas();
const ctxBookTitle = canvasBookTitle.getContext('2d');
