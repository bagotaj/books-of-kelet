function makePagination() {
  const tfoot = document.querySelector('#tableFooter');

  const tr = document.createElement('tr');
  const td = document.createElement('td');

  let numberOfBookTitles = makeSortedBookTitles();

  const numberOfPages = Math.ceil(numberOfBookTitles.length / numberPerPage);

  for (let i = 0; i < numberOfPages; i++) {
    const btn = document.createElement('button');
    btn.value = i + 1;
    btn.innerText = i + 1;

    if (i === 0) {
      btn.classList.add('button-clicked');
    }

    btn.addEventListener('click', (e) => {
      td.getElementsByClassName('button-clicked')[0].classList.remove(
        'button-clicked'
      );
      btn.classList.add('button-clicked');
      createMainBookTitlesTable(e.target.value);
    });

    td.appendChild(btn);
  }

  tr.appendChild(td);
  tfoot.appendChild(tr);
}

function getSortedBookTitles(currentPage) {
  let numberOfBookTitles = makeSortedBookTitles();
  let paginatedBookTitles;

  const trimStart = (currentPage - 1) * numberPerPage;
  const trimEnd = trimStart + numberPerPage;
  paginatedBookTitles = numberOfBookTitles.slice(trimStart, trimEnd);

  return paginatedBookTitles;
}
