// Returns true if the input point is inside the drawing canvas
function isInCanvas(x, y) {
  return x >= 0 && y < height;
}

// Returns true if both arrays have the same exact elements
function arraysAreEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
