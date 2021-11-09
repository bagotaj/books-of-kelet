function createBookTitlesTable(edit) {
  const tableBody = document.getElementById('tableBody');

  for (let i = 0; i < bookTitles.length; i++) {
    if (bookTitles[i]['display'] === 'on') {
      const bookTitlePointCoords = bookTitles[i]['boundingBox']['vertices'];
      const text = bookTitles[i]['paragraph'];

      let td = document.createElement('td');
      let tr = document.createElement('tr');

      if (edit) {
        let input = document.createElement('input');
        input.id = i;
        input.value = text;

        let buttonSave = document.createElement('button');
        buttonSave.innerText = 'Mentés';
        buttonSave.addEventListener('click', () => dataManipulation('save', i));
        let buttonDelete = document.createElement('button');
        buttonDelete.innerText = 'Törlés';
        buttonDelete.addEventListener('click', () =>
          dataManipulation('delete', i)
        );

        const fieldOfColumns = [input, buttonSave, buttonDelete];

        for (let i = 0; i < fieldOfColumns.length; i++) {
          let td = document.createElement('td');

          td.appendChild(fieldOfColumns[i]);
          tr.appendChild(td);
        }
      } else {
        const canvasTop = document.getElementById('canvas');
        let p = document.createElement('p');
        p.innerText = text;
        p.addEventListener('click', () => {
          drawBookTitlePoint(bookTitlePointCoords);
          canvasTop.scrollIntoView();
        });
        td.appendChild(p);
        tr.appendChild(td);
      }

      tableBody.appendChild(tr);
    } else {
      continue;
    }
  }
}
