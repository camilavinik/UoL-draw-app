// A tool for drawing rectangles to the screen. Allows the user to preview
// the rectangle to the current mouse position before drawing the rectangle to the
// pixel array.
function RectangleTool() {
  this.icon = "assets/rectangle.jpg";
  this.name = "rectangle";

  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  // Draws the rectangle to the screen
  this.draw = function () {
    // Only draw when mouse is clicked
    if (mouseIsPressed) {
      //if it's the start of drawing a new rectangle
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        // Save the current pixel Array
        loadPixels();
      } else {
        // Update the screen with the saved pixels to hide any previous
        // rectangle between mouse pressed and released
        updatePixels();
        // Draw the rectangle
        const width = mouseX - startMouseX;
        const height = mouseY - startMouseY;
        rect(startMouseX, startMouseY, width, height);
      }
    } else if (drawing) {
      // Save the pixels with the most recent rectangle and reset the
      // drawing bool and start locations
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  };
}
