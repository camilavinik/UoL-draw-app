//Displays and handles the filling tool.
function FillTool() {
  this.icon = "assets/circle.jpg";
  this.name = "Fill";
  let firstPress = true;

  // TODO: change these functions
  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

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

  function floodFill(seed, fillColor) {
    loadPixels();

    index = 4 * (width * seed.y + seed.x);
    seedColor = [
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
      pixels[index + 3],
    ];

    console.log(seedColor);
    let queue = [];
    queue.push(seed);

    while (queue.length) {
      let current = queue.shift();
      index = 4 * (width * current.y + current.x);
      let color = [
        pixels[index],
        pixels[index + 1],
        pixels[index + 2],
        pixels[index + 3],
      ];

      if (!arrayEquals(color, seedColor)) {
        continue;
      }

      for (let i = 0; i < 4; i++) {
        pixels[index + i] = fillColor[0 + i];
      }

      queue = expandToNeighbours(queue, current);
    }

    updatePixels();
  }

  //TODO: do not do this when you selecting something
  this.draw = function () {
    //only paint when mouse is clicked the first time
    if (mouseIsPressed) {
      if (firstPress) { // TODO: can we remove this?
        firstPress = false;
        floodFill(createVector(mouseX, mouseY), [random(255), random(255), random(255), 255]);
      }
    } else {
      firstPress = true;
    }
  };
}
