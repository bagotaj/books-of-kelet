let savedBasicsShelvesData = [];
let backgroundShelvesWidth;
let backgroundShelvesHeight;
let backgroundShelvesTitle;
const canvasTop = document.getElementById('canvas');
let imgNewSizeRatio = 6.048;
let imgSizeRatioBookTitle = 0;
let shelvesCoordsRatio = 1;
const listOfImages = [
  { column: 1, images: ['IMG_3365', 'IMG_3366', 'IMG_3367'] },
  { column: 4, images: ['IMG_3424', 'IMG_3425', 'IMG_3426'] },
  { column: 5, images: ['IMG_3421', 'IMG_3422', 'IMG_3423'] },
  { column: 6, images: ['IMG_3414', 'IMG_3415', 'IMG_3427', 'IMG_3428'] },
  { column: 7, images: ['IMG_3785', 'IMG_3787'] },
  { column: 8, images: ['IMG_3788', 'IMG_3789'] },
];
const numberPerPage = 50;

function setBackgroundShelvesVariables(dataObj) {
  backgroundShelvesWidth = dataObj.basicShelfParams.width;
  backgroundShelvesHeight = dataObj.basicShelfParams.height;
  backgroundShelvesTitle = dataObj.basicShelfTitle;
}
