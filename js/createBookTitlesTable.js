function createBookTitlesTable(edit) {
  const bookTitles = getItemFromLocalStorage('bookTitles');

  const tableBody = document.getElementById('tableBody');

  for (let i = 0; i < bookTitles.length; i++) {
    const bookTitlePointCoords = bookTitles[i]['boundingBox']['vertices'];
    const text = bookTitles[i]['paragraph'];

    let td = document.createElement('td');
    let tr = document.createElement('tr');

    if (edit) {
      let buttonSave = document.createElement('button');
      buttonSave.innerText = 'Mentés';
      let buttonDelete = document.createElement('button');
      buttonDelete.innerText = 'Törlés';
      let input = document.createElement('input');
      input.value = text;

      const fieldOfColumns = [input, buttonSave, buttonDelete];

      for (let i = 0; i < 3; i++) {
        let td = document.createElement('td');

        td.appendChild(fieldOfColumns[i]);
        tr.appendChild(td);
      }
    } else {
      let p = document.createElement('p');
      p.innerText = text;
      p.addEventListener('click', () =>
        drawBookTitlePoint(bookTitlePointCoords)
      );
      td.appendChild(p);
      tr.appendChild(td);
    }

    tableBody.appendChild(tr);
  }
}
