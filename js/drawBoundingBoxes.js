function drawBoundingBoxes(imgNewSizeRatio) {
  for (let i = 0; i < bookTitles.length; i++) {
    const vertices = bookTitles[i]['boundingBox']['vertices'];

    const pointX = vertices[0]['x'];
    const pointY = vertices[0]['y'];

    if (vertices.length === 1) {
      ctx2.beginPath();
      ctx2.fillStyle = 'red';
      ctx2.arc(
        pointX / imgNewSizeRatio,
        pointY / imgNewSizeRatio,
        5,
        0,
        2 * Math.PI
      );
      ctx2.fill();
    } else {
      ctx2.beginPath();
      ctx2.fillStyle = 'green';
      ctx2.moveTo(
        vertices[0]['x'] / imgNewSizeRatio,
        vertices[0]['y'] / imgNewSizeRatio
      );
      ctx2.lineTo(
        vertices[1]['x'] / imgNewSizeRatio,
        vertices[1]['y'] / imgNewSizeRatio
      );
      ctx2.lineTo(
        vertices[2]['x'] / imgNewSizeRatio,
        vertices[2]['y'] / imgNewSizeRatio
      );
      ctx2.lineTo(
        vertices[3]['x'] / imgNewSizeRatio,
        vertices[3]['y'] / imgNewSizeRatio
      );
      ctx2.fill();
    }
  }
}
