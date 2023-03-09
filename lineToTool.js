// A tool for drawing straight lines to the screen. Allows the user to preview
// the a line to the current mouse position before drawing the line to the
// pixel array.
function LineToTool() {
  this.icon = "assets/lineTo.jpg";
  this.name = "LineTo";

  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  // Draws the line to the screen
  this.draw = function () {
    // Only draw when mouse is clicked
    if (mouseIsPressed) {
      // If it's the start of drawing a new line
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        // save the current pixel Array
        loadPixels();
      } else {
        // Update the screen with the saved pixels to hide any previous
        // line between mouse pressed and released
        updatePixels();
        // Draw the line
        line(startMouseX, startMouseY, mouseX, mouseY);
      }
    } else if (drawing) {
      // Save the pixels with the most recent line and reset the
      // drawing bool and start locations
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  };
}
