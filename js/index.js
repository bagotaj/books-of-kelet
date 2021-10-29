function createCanvas() {
  const result = document.getElementById('canvas');
  result.width = window.innerWidth;
  result.height = 500;
  return result;
}

function followWindowSize(canvas, window) {
  canvas.width = result.width;
  canvas.height = result.height;
}

const canvas = createCanvas();
const ctx = canvas.getContext('2d');

// drawBooksImage();
createBookTitlesTable();
