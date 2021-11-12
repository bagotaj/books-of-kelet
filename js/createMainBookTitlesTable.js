function createMainBookTitlesTable() {
  const tableBody = document.getElementById('tableBody');

  for (const bookTitlesOnImage in dbbooks) {
    const bookTitlesData = dbbooks[bookTitlesOnImage]['bookdata'];

    for (let i = 0; i < bookTitlesData.length; i++) {
      if (bookTitlesData[i]['display'] === 'on') {
        const bookTitlePointCoords =
          bookTitlesData[i]['boundingBox']['vertices'];
        const text = bookTitlesData[i]['paragraph'];

        let td = document.createElement('td');
        let tr = document.createElement('tr');

        const canvasTop = document.getElementById('canvas');

        let p = document.createElement('p');
        p.innerText = text;
        p.addEventListener('click', () => {
          showBookshelves(bookTitlesOnImage);
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
}
