let bookTitles = makeSortedBookTitles();
const blocks = db[0]['fullTextAnnotation']['pages'][0]['blocks'];
const backgroundShelves = 1359;
const canvasTop = document.getElementById('canvas');
let imgNewSizeRatio = 0;
let imgSizeRatioBookTitle = 0;
const listOfImages = [
  { column: 1, images: ['IMG_3365', 'IMG_3366', 'IMG_3367'] },
  { column: 4, images: ['IMG_3424', 'IMG_3425', 'IMG_3426'] },
  { column: 5, images: ['IMG_3421', 'IMG_3422', 'IMG_3423'] },
  { column: 6, images: ['IMG_3414', 'IMG_3415'] },
];
const numberPerPage = 50;
let sortedBookTitlesByABC = makeSortedBookTitlesByABC();
const textAnnotations = db[0]['textAnnotations'];
