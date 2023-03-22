// Displays and handles the filling tool. When clicking on canvas
// paints the portion where the click was contained.
function FillTool() {
  this.icon = "assets/fill.jpg";
  this.name = "Fill";
  let firstPress = true;

  const createColourArray = (index = 0) => [
    pixels[index],
    pixels[index + 1],
    pixels[index + 2],
    pixels[index + 3],
  ];

  function bucketFill(basePixel, fillColour) {
    // Save the current pixel Array
    loadPixels();

    // Set index
    let index = (width * basePixel.y + basePixel.x) * 4;
    baseColour = createColourArray(index);

    // If fillColour is same as base colour return to avoid unnecesary painting processing
    if (arraysAreEquals(fillColour, baseColour)) return;

    // Set painting queue with only the base pixel for now
    let paintingQueue = [basePixel];

    while (paintingQueue.length) {
      // Get pixel from pixel array
      const { x, y } = paintingQueue.shift();
      // Get index
      index = (y * width + x) * 4;
      // Get current colour
      const colour = createColourArray(index);

      // If the pixel colour is the same as base, paint it
      if (arraysAreEquals(colour, baseColour)) {
        // Paint
        for (let i = 0; i < 4; i++) {
          pixels[index + i] = fillColour[0 + i];
        }

        // Add neighbour pixels to painting queue
        if (x + 1 < width) paintingQueue.push(createVector(x + 1, y));
        if (x - 1 > 0) paintingQueue.push(createVector(x - 1, y));
        if (y + 1 < height) paintingQueue.push(createVector(x, y + 1));
        if (y - 1 > 0) paintingQueue.push(createVector(x, y - 1));
      }
    }

    // Update the screen with the modified pixels
    updatePixels();
  }

  this.draw = function () {
    // Only paint when mouse is clicked the first time to avoid unnecesary painting processing
    if (mouseIsPressed && isInCanvas(mouseX, mouseY)) {
      if (firstPress) {
        // firstPress avoids triggering the bucket fill many times while the mouse is being pressed
        firstPress = false;
        bucketFill(createVector(mouseX, mouseY), color(selectedColour).levels);
      }
    } else {
      firstPress = true;
    }
  };
}
