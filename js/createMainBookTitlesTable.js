function createMainBookTitlesTable() {
  const tableBody = document.getElementById('tableBody');
  const sortedBookTitles = makeSortedBookTitles();

  for (let i = 0; i < sortedBookTitles.length; i++) {
    if (sortedBookTitles[i]['display'] === 'on') {
      const bookTitlePointCoords =
        sortedBookTitles[i]['boundingBox']['vertices'];
      const text = sortedBookTitles[i]['paragraph'];

      let td = document.createElement('td');
      let tr = document.createElement('tr');

      const canvasTop = document.getElementById('canvas');

      let p = document.createElement('p');
      p.innerText = text;
      p.addEventListener('click', () => {
        showBookshelves(
          sortedBookTitles[i]['imageTitle'],
          sortedBookTitles[i]['shelfName']
        );
        drawBookTitlePoint(bookTitlePointCoords);
        canvasTop.scrollIntoView({
          behavior: 'smooth',
        });
      });
      td.appendChild(p);
      tr.appendChild(td);

      tableBody.appendChild(tr);
    } else {
      continue;
    }
  }
}
