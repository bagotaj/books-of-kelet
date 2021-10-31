function createCanvasEdit() {
  const result = document.getElementById('canvasEdit');
  result.width = window.innerWidth;
  result.height = 500;
  return result;
}

function followWindowSize(canvas, window) {
  canvas.width = result.width;
  canvas.height = result.height;
}

const canvas2 = createCanvasEdit();
const ctx2 = canvas2.getContext('2d');

let newCoords = { x: '', y: '' };

canvas2.addEventListener(
  'click',
  function (event) {
    newCoords = getMousePosition(canvas2, event);

    addNewBookCoords(newCoords);
  },
  false
);

function getMousePosition(canvas2, event) {
  var rect = canvas2.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

const edit = true;

createBookTitlesTable(edit);
