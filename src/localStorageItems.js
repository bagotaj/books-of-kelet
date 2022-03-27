function getItemFromLocalStorage(keyName) {
  const data = JSON.parse(localStorage.getItem(keyName));

  return data;
}

function saveItemToLocalStorage(keyName, keyValue) {
  localStorage.setItem(keyName, JSON.stringify(keyValue));
}
