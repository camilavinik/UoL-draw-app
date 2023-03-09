// A tool for drawing circles to the screen. Allows the user to preview
// the circle to the current mouse position before drawing the circle to the
// pixel array.
function CircleTool() {
  this.icon = "assets/circle.jpg";
  this.name = "Circle";

  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  // Draws the circle to the screen
  this.draw = function () {
    // Only draw when mouse is clicked
    if (mouseIsPressed) {
      // If it's the start of drawing a new circle
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        // Save the current pixel Array
        loadPixels();
      } else {
        // Update the screen with the saved pixels to hide any previous
        // circle between mouse pressed and released
        updatePixels();
        // Draw the circle
        const width = (mouseX - startMouseX) * 2;
        const height = (mouseY - startMouseY) * 2;
        ellipse(startMouseX, startMouseY, width, height);
      }
    } else if (drawing) {
      // Save the pixels with the most recent circle and reset the
      // drawing bool and start locations
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  };
}
