//Displays and handles the filling tool.
function FillTool() {
  this.icon = "assets/scissors.jpg";
  this.name = "Fill";
  this.baseColour = null;

  const isInside = (x, y) => {
    //if its the same colour as base
    console.log("IS INSIDE? ", get(x, y).toString() === this.baseColour.toString(), "EL PIXEL: " ,x, y)

    return get(x, y).toString() === this.baseColour.toString();
  };

  const paint = (x, y) => point(x, y);

  const fill = (x, y) => {
    // console.log("START FILL WITH: ", selectedColour)
    if (!isInside(x, y)) return;
    let s = [];
    s.push({ x1: x, x2: x, y: y, dy: 1 });
    s.push({ x1: x, x2: x, y: y - 1, dy: -1 });

    while (s.length) {
        // console.log('ENTERED FIRST WHILE')
      let { x1, x2, y, dy } = s.pop();
      let x = x1;
      if (isInside(x, y)) {
        while (isInside(x - 1, y)) {
          paint(x - 1, y);
          x = x - 1;
        }
      }
      if (x < x1) {
        s.push({ x1: x, x2: x1 - 1, y: y - dy, dy: -dy });
      }
      while (x1 <= x2) {
        // console.log('ENTERED SECOND WHILE')
        while (isInside(x1, y)) {
            console.log("PAINTED", x1, y)
          paint(x1, y);
          x1 = x1 + 1;
          s.push({ x1: x, x2: x1 - 1, y: y + dy, dy: dy });
          if (x1 - 1 > x2) {
            s.push({ x1: x2 + 1, x2: x1 - 1, y: y - dy, dy: -dy });
          }
        }
        x1 = x1 + 1;
        while (x1 < x2 && !isInside(x1, y)) {
            console.log('ENTERED THIRD WHILE')
          x1 = x1 + 1;
        }
        x = x1;
      }
    }
  };

  this.draw = function () {
    //only draw when mouse is clicked
    if (mouseIsPressed) {
      this.baseColour = get(mouseX, mouseY);
      console.log("BASE COLOUR IS: ", this.baseColour)
      fill(mouseX, mouseY);
    }
  };
}
