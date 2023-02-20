//Displays and handles the filling tool.
function FillTool() {
  this.icon = "assets/fill.jpg";
  this.name = "Fill";
  let firstPress = true;

  // TODO: change these functions
  function expandToNeighbours(paintingQueue, currentPixel) {
    x = currentPixel.x;
    y = currentPixel.y;

    // Add limiting pixels to painting queue
    if (x - 1 > 0) paintingQueue.push(createVector(x - 1, y));
    if (x + 1 < width) paintingQueue.push(createVector(x + 1, y));
    if (y - 1 > 0) paintingQueue.push(createVector(x, y - 1));
    if (y + 1 < height) paintingQueue.push(createVector(x, y + 1));

    return paintingQueue;
  }

  function bucketFill(seed, fillColour) {
    loadPixels();

    index = 4 * (width * seed.y + seed.x);
    seedColour = [
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
      pixels[index + 3],
    ];

    // If fillColour is same as base colour return to avoid unnecesary painting processing
    if (arraysAreEquals(fillColour, seedColour)) return;

    let paintingQueue = [];
    paintingQueue.push(seed);

    while (paintingQueue.length) {
      let currentPixel = paintingQueue.shift();
      index = 4 * (width * currentPixel.y + currentPixel.x);
      let colour = [
        pixels[index],
        pixels[index + 1],
        pixels[index + 2],
        pixels[index + 3],
      ];

      if (!arraysAreEquals(colour, seedColour)) {
        continue;
      }

      for (let i = 0; i < 4; i++) {
        pixels[index + i] = fillColour[0 + i];
      }

      paintingQueue = expandToNeighbours(paintingQueue, currentPixel);
    }

    updatePixels();
  }

  this.draw = function () {
    // Only paint when mouse is clicked the first time to avoid unnecesary painting processing
    if (mouseIsPressed && isInCanvas(mouseX, mouseY)) {
      if (firstPress) { // TODO: can we remove this?
        firstPress = false;
        bucketFill(createVector(mouseX, mouseY), color(selectedColour).levels);
      }
    } else {
      firstPress = true;
    }
  };
}
