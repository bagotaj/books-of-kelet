function getMousePosition(canvasEdit, event) {
  let rect = canvasEdit.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
