const buttonAddNewItem = document.getElementById('addNewItemButton');

const index = 'newBookTitleInput';
const type = 'save';

buttonAddNewItem.addEventListener('click', () =>
  dataManipulation(type, index, newCoords)
);

const coordinatesInputField = document.getElementById('coordinatesInput');

function addNewBookCoords(newCoords) {
  coordinatesInputField.value =
    'x: ' + newCoords.x + ', ' + 'y: ' + newCoords.y;
}
