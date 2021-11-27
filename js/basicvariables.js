let bookTitles = makeSortedBookTitles();
const blocks = db[0]['fullTextAnnotation']['pages'][0]['blocks'];
const imgNewSizeRatio = 6.048;
const imgSizeRatioBookTitle = 7.56;
const listOfImages = [
  'IMG_3365',
  'IMG_3366',
  'IMG_3367',
  'IMG_3424',
  'IMG_3425',
  'IMG_3426',
  'IMG_3421',
];
const numberPerPage = 50;
let sortedBookTitlesByABC = makeSortedBookTitlesByABC();
const textAnnotations = db[0]['textAnnotations'];
