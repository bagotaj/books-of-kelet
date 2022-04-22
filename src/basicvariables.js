let bookTitles = makeSortedBookTitles();
const blocks = db[0]['fullTextAnnotation']['pages'][0]['blocks'];
const backgroundShelvesWidth = 1359;
const canvasTop = document.getElementById('canvas');
let imgNewSizeRatio = 6.048;
let imgSizeRatioBookTitle = 0;
let shelvesCoordsRatio = 1;
const listOfImages = [
  { column: 1, images: ['IMG_3365', 'IMG_3366', 'IMG_3367'] },
  { column: 4, images: ['IMG_3424', 'IMG_3425', 'IMG_3426'] },
  { column: 5, images: ['IMG_3421', 'IMG_3422', 'IMG_3423'] },
  { column: 6, images: ['IMG_3414', 'IMG_3415', 'IMG_3427', 'IMG_3428'] },
];
const numberPerPage = 50;
// let sortedBookTitlesByABC = [];
// console.log('basicvariables', sortedBookTitlesByABC);
const textAnnotations = db[0]['textAnnotations'];
