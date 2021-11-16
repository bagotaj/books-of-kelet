let clicked = false;
let color = 'red';
let blink;

function drawBookTitlePoint(vertices) {
  let pointX = vertices[0]['x'];
  let pointY = vertices[0]['y'];

  if (clicked) {
    clearInterval(blink);
  }

  blink = setInterval(() => {
    blinkTitlePoint(pointX, pointY);
  }, 1000);
}

function blinkTitlePoint(pointX, pointY) {
  clicked = true;

  ctxBookTitle.clearRect(0, 0, canvas.width, canvas.height);

  ctxBookTitle.beginPath();
  ctxBookTitle.fillStyle = 'red';
  ctxBookTitle.arc(
    pointX / imgSizeRatioBookTitle,
    pointY / imgSizeRatioBookTitle,
    5,
    0,
    2 * Math.PI
  );
  if (color === 'red') {
    color = '';
  } else {
    ctxBookTitle.fill();
    color = 'red';
  }
}
