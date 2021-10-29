function drawBoundingBoxes(imgNewSizeRatio) {
  for (let i = 0; i < blocks.length; i++) {
    const vertices = blocks[i]['boundingBox']['vertices'];

    for (let j = 0; j < vertices.length; j++) {
      const pointX = vertices[j]['x'];
      const pointY = vertices[j]['y'];

      ctx.beginPath();
      ctx.fillStyle = 'green';
      ctx.arc(
        pointX / imgNewSizeRatio,
        pointY / imgNewSizeRatio,
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }
}
