function makePagination(sortedBookTitlesByABC) {
  const tfoot = document.querySelector('#tableFooter');
  tfoot.innerHTML = '';

  const tr = document.createElement('tr');
  const td = document.createElement('td');

  if (sortedBookTitlesByABC !== undefined) {
    const numberOfPages = Math.ceil(
      sortedBookTitlesByABC.length / numberPerPage
    );

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
}

function getSortedBookTitlesByCurrentPage(currentPage) {
  let paginatedBookTitles;

  const trimStart = (currentPage - 1) * numberPerPage;
  const trimEnd = trimStart + numberPerPage;
  paginatedBookTitles = sortedBookTitlesByABC.slice(trimStart, trimEnd);
  console.log('getSortedFunction / byABC', paginatedBookTitles);
  return paginatedBookTitles;
}
