function createABCLinkButtons() {
  const theadTR = document.querySelector('#theadABC');

  const td = document.createElement('td');
  const abc = [
    'A',
    'Á',
    'B',
    'C',
    'Cs',
    'D',
    'Dz',
    'Dzs',
    'E',
    'É',
    'F',
    'G',
    'Gy',
    'H',
    'I',
    'Í',
    'J',
    'K',
    'L',
    'Ly',
    'M',
    'N',
    'Ny',
    'O',
    'Ó',
    'Ö',
    'Ő',
    'P',
    'Q',
    'R',
    'S',
    'Sz',
    'T',
    'Ty',
    'U',
    'Ú',
    'Ü',
    'Ű',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'Zs',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  for (let i = 0; i < abc.length; i++) {
    const a = document.createElement('a');
    a.value = abc[i];
    a.innerText = abc[i];
    a.href = '#';

    if (i === 0) {
      a.classList.add('a-clicked');
    }

    a.addEventListener('click', (e) => {
      td.getElementsByClassName('a-clicked')[0].classList.remove('a-clicked');
      a.classList.add('a-clicked');
      sortedBookTitlesByABC = makeSortedBookTitlesByABC(e.target.value);
      createMainBookTitlesTable();
    });

    td.appendChild(a);
  }

  theadTR.appendChild(td);
}
