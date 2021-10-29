function drawTextAnnotations(imgNewSizeRatio) {
  const bookTitles = JSON.parse(localStorage.getItem('bookTitles'));

  console.log(bookTitles);

  for (let i = 0; i < bookTitles.length; i++) {
    // let textCoordinate = bookTitles[i]['boundingBox']['vertices'][0];
    let text = bookTitles[i]['paragraph'];

    ctx.fillText(text, 800, 50 + 15 * i);

    // ctx.fillText(
    //   text,
    //   textCoordinate['x'] / imgNewSizeRatio,
    //   textCoordinate['y'] / imgNewSizeRatio
    // );
  }
}
