let savedBasicsShelvesData = [];
let resizedLocalImageFile;
let setClickCanvas;
let setUploadImageupload;
let clickedShelfBoxKeyNumber;
let booksFromLocalStorageBoolean = false;
let maxBackgroundShelfWidth = 1359;
let maxBackgroundShelfHeight = 500;
// Index uses it
let backgroundShelvesWidth = 1359;
// Edit and Index use it
let backgroundShelvesHeight = 500;
// Index uses it
let backgroundShelvesTitle = 'kelet-header';
let backgroundBasicShelfImage = {};
let backgroundBookShelfImage = {};
let shelfCoordsObj;
const canvasTop = document.getElementById('canvas');
let imgNewSizeRatio = 6.048;
let imgSizeRatioBookTitle = 0;
let shelvesCoordsRatio = 1;
const listOfImages = [
  { column: 1, images: ['IMG_3365', 'IMG_3366', 'IMG_3367'] },
  { column: 2, images: ['IMG_3868', 'IMG_3869', 'IMG_3870', 'IMG_3871'] },
  { column: 3, images: ['IMG_3872', 'IMG_3873', 'IMG_3874', 'IMG_3875'] },
  { column: 4, images: ['IMG_3424', 'IMG_3425', 'IMG_3426'] },
  { column: 5, images: ['IMG_3421', 'IMG_3422', 'IMG_3423'] },
  { column: 6, images: ['IMG_3414', 'IMG_3415', 'IMG_3427', 'IMG_3428'] },
  { column: 7, images: ['IMG_3785', 'IMG_3787', 'IMG_3893', 'IMG_3894'] },
  { column: 8, images: ['IMG_3788', 'IMG_3789', 'IMG_3897', 'IMG_3898'] },
];
const numberPerPage = 50;

function setBackgroundShelvesVariables(dataObj) {
  backgroundShelvesWidth = dataObj.basicShelfParams.width;
  backgroundShelvesHeight = dataObj.basicShelfParams.height;
  backgroundShelvesTitle = dataObj.basicShelfTitle;
}
