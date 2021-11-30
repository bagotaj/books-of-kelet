let bookTitles = makeSortedBookTitles();
const blocks = db[0]['fullTextAnnotation']['pages'][0]['blocks'];
const canvasTop = document.getElementById('canvas');
const imgNewSizeRatio = 6.048;
const imgSizeRatioBookTitle = 7.56;
const listOfImages = [
  { column: 1, images: ['IMG_3365', 'IMG_3366', 'IMG_3367'] },
  { column: 4, images: ['IMG_3424', 'IMG_3425', 'IMG_3426'] },
  { column: 5, images: ['IMG_3421', 'IMG_3422', 'IMG_3423'] },
];
const numberPerPage = 50;
let sortedBookTitlesByABC = makeSortedBookTitlesByABC();
const textAnnotations = db[0]['textAnnotations'];
