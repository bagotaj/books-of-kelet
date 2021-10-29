function createCanvas() {
  const result = document.getElementById('canvas');
  result.width = window.innerWidth;
  result.height = window.innerHeight;
  return result;
}

function followWindowSize(canvas, window) {
  canvas.width = result.width;
  canvas.height = result.height;
}

const canvas = createCanvas();
const ctx = canvas.getContext('2d');

const blocks = db[0]['fullTextAnnotation']['pages'][0]['blocks'];
const textAnnotations = db[0]['textAnnotations'];

drawBooksImage();
