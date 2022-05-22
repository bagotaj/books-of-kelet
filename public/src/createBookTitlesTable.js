function createBookTitlesTable() {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  for (let i = 0; i < bookTitles.length; i++) {
    if (bookTitles[i]['display'] === 'on') {
      const text = bookTitles[i]['paragraph'];

      let tr = document.createElement('tr');

      let input = document.createElement('input');
      input.id = i;
      input.value = text;

      let buttonSave = document.createElement('button');
      buttonSave.innerText = 'Mentés';
      buttonSave.setAttribute('type', 'button');
      buttonSave.setAttribute('class', 'normalbtn');
      buttonSave.addEventListener('click', () => dataManipulation('save', i));
      let buttonDelete = document.createElement('button');
      buttonDelete.innerText = 'Törlés';
      buttonDelete.setAttribute('type', 'button');
      buttonDelete.setAttribute('class', 'normalbtn');
      buttonDelete.addEventListener('click', () =>
        dataManipulation('delete', i)
      );

      const fieldOfColumns = [input, buttonSave, buttonDelete];

      for (let i = 0; i < fieldOfColumns.length; i++) {
        let td = document.createElement('td');

        td.appendChild(fieldOfColumns[i]);
        tr.appendChild(td);
      }

      tableBody.appendChild(tr);
    } else {
      continue;
    }
  }
}
