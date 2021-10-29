function createBookTitlesTable(edit) {
  const bookTitles = JSON.parse(localStorage.getItem('bookTitles'));

  const tableBody = document.getElementById('tableBody');

  for (let i = 0; i < bookTitles.length; i++) {
    const bookTitlePointCoords = bookTitles[i]['boundingBox']['vertices'];
    const text = bookTitles[i]['paragraph'];

    let td = document.createElement('td');
    let tr = document.createElement('tr');

    if (edit) {
      let input = document.createElement('input');
      input.value = text;
      td.appendChild(input);
    } else {
      let p = document.createElement('p');
      p.innerText = text;
      p.addEventListener('click', () =>
        drawBookTitlePoint(bookTitlePointCoords)
      );
      td.appendChild(p);
    }

    tr.appendChild(td);
    tableBody.appendChild(tr);
  }
}
