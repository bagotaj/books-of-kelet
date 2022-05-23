const buttonAddNewItem = document.getElementById('addNewItemButton');

const index = 'newBookTitleInput';
const type = 'save';

const coordinatesInputField = document.getElementById('coordinatesInput');

buttonAddNewItem.addEventListener('click', () => {
  dataManipulation(type, index, newCoords);
  coordinatesInputField.value = '';
});

function addNewBookCoords(newCoords) {
  coordinatesInputField.value =
    'x: ' + newCoords.x + ', ' + 'y: ' + newCoords.y;
}
