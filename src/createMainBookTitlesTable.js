function createMainBookTitlesTable(books) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  // const sortedBookTitles = getSortedBookTitlesByCurrentPage(currentPage);

  for (let i = 0; i < books.length; i++) {
    if (books[i]['display'] === 'on') {
      const bookTitlePointCoords = books[i]['boundingBox']['vertices'];
      const text = books[i]['paragraph'];

      let td = document.createElement('td');
      let td2 = document.createElement('td');
      let tr = document.createElement('tr');

      let p = document.createElement('p');
      p.innerText = text;
      p.addEventListener('click', () => {
        showBookshelves(
          books[i]['imageTitle'],
          books[i]['shelfName'],
          books[i]['shelfCoords']
        );
        drawBookTitlePoint(bookTitlePointCoords);
        canvasTop.scrollIntoView({
          behavior: 'smooth',
        });
      });
      td.appendChild(p);
      tr.appendChild(td);

      const a = document.createElement('a');

      a.innerText = 'moly.hu';
      a.href = `https://moly.hu/kereses?q=${text}`;
      a.target = '_blank';

      td2.appendChild(a);
      tr.appendChild(td2);

      tableBody.appendChild(tr);
    }
  }
}
