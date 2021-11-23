function makePagination() {
  const numberOfBookTitles = makeSortedBookTitles();
  const numberPerPage = 50;
  const currentPage = 1;
  const numberOfPages = Math.ceil(numberOfBookTitles / numberPerPage);
}

function buildPage(currentPage) {
  const trimStart = (currentPage - 1) * numberPerPage;
  const trimEnd = trimStart + numberPerPage;
  console.log(listArray.slice(trimStart, trimEnd));
}
