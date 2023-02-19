//Displays and handles the filling tool.
function FillTool() {
  this.icon = "assets/circle.jpg";
  this.name = "Fill";
  let firstPress = true;

  // TODO: change these functions
  function expandToNeighbours(queue, current) {
    x = current.x;
    y = current.y;

    if (x - 1 > 0) {
      queue.push(createVector(x - 1, y));
    }

    if (x + 1 < width) {
      queue.push(createVector(x + 1, y));
    }

    if (y - 1 > 0) {
      queue.push(createVector(x, y - 1));
    }

    if (y + 1 < height) {
      queue.push(createVector(x, y + 1));
    }

    return queue;
  }

  function floodFill(seed, fillColour) {
    loadPixels();

    index = 4 * (width * seed.y + seed.x);
    seedColour = [
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
      pixels[index + 3],
    ];

    // If fillColour is same as base colour return to avoid unnecesary painting
    if (arraysAreEquals(fillColour, seedColour)) return;

    console.log('seedColour: ', seedColour);
    let queue = [];
    queue.push(seed);

    while (queue.length) {
      let current = queue.shift();
      index = 4 * (width * current.y + current.x);
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

      queue = expandToNeighbours(queue, current);
    }

    updatePixels();
  }

  this.draw = function () {
    //only paint when mouse is clicked the first time
    if (mouseIsPressed && isInCanvas(mouseX, mouseY)) {
      if (firstPress) { // TODO: can we remove this?
        firstPress = false;
        floodFill(createVector(mouseX, mouseY), color(selectedColour).levels);
      }
    } else {
      firstPress = true;
    }
  };
}
