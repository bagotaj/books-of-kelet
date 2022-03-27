function createBookTitleCanvas() {
  const result = document.getElementById('canvasBookTitles');
  let canvasHeight = setCanvasHeightIndex();

  result.height = canvasHeight * 0.8;
  result.width = result.height * 1.335;
  return result;
}

const canvasBookTitle = createBookTitleCanvas();
const ctxBookTitle = canvasBookTitle.getContext('2d');
