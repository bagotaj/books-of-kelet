function createMainBookTitlesTable() {
  const tableBody = document.getElementById('tableBody');

  for (const imageTitle in dbbooks) {
    const bookTitlesData = dbbooks[imageTitle]['bookdata'];

    bookTitlesData.sort(function (a, b) {
      var titleA = a.paragraph.toUpperCase();
      var titleB = b.paragraph.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }

      return 0;
    });

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
          showBookshelves(imageTitle);
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
