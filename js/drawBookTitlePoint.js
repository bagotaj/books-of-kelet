let clicked = false;
let color = 'red';

function drawBookTitlePoint(vertices) {
  pointX = vertices[0]['x'];
  pointY = vertices[0]['y'];

  const blink = setInterval(() => {
    blinkTitlePoint(pointX, pointY);
  }, 1000);

  if (clicked) {
    clearInterval(blink);
  }
}

function blinkTitlePoint(pointX, pointY) {
  clicked = true;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(
    pointX / imgNewSizeRatio,
    pointY / imgNewSizeRatio,
    5,
    0,
    2 * Math.PI
  );
  if (color === 'red') {
    color = '';
  } else {
    ctx.fill();
    color = 'red';
  }
}
