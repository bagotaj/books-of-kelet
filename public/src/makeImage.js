function makeImage(objData) {
  let img = new Image();
  img.src = objData.src;
  img.onload = objData.function;

  return img;
}
