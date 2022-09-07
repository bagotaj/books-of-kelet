function createMainBookTitlesTable(books) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  if (books === undefined || books.length === 0) {
    let p = document.createElement('p');
    let td = document.createElement('td');
    let tr = document.createElement('tr');
    p.innerText = 'Nincs ilyen könyv.';
    td.appendChild(p);
    tr.appendChild(td);
    tableBody.appendChild(tr);
  } else {
    for (let i = 0; i < books.length; i++) {
      const bookTitlePointCoords = books[i]['boundingBox']['vertices'];
      const text = books[i]['paragraph'];

      let td = document.createElement('td');
      let td2 = document.createElement('td');
      let tr = document.createElement('tr');

      let p = document.createElement('p');
      let p2 = document.createElement('p');
      p.innerText = text;
      p.addEventListener('click', () => {
        let canvasWrapperLabel = document.querySelector(
          '#canvas-wrapper-label'
        );

        let canvasLabel = document.querySelector('#canvas-label');

        let hasDisplaynoneClass =
          canvasWrapperLabel.classList.contains('displaynone');

        if (!hasDisplaynoneClass) {
          canvasWrapperLabel.setAttribute('class', 'displaynone');
          canvasLabel.classList.remove('displaynone');
        }

        backgroundBookShelfImage = {};
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

      a.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg> moly.hu`;
      a.href = `https://moly.hu/kereses?q=${text}`;
      a.target = '_blank';

      p2.appendChild(a);
      td2.appendChild(p2);
      tr.appendChild(td2);

      tableBody.appendChild(tr);
    }
  }
}
