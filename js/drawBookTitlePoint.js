function drawBookTitlePoint(vertices) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const pointX = vertices[0]['x'];
  const pointY = vertices[0]['y'];

  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.arc(
    pointX / imgNewSizeRatio,
    pointY / imgNewSizeRatio,
    5,
    0,
    2 * Math.PI
  );
  ctx.fill();
}
