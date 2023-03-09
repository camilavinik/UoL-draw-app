function mirrorDrawTool() {
  this.name = "mirrorDraw";
  this.icon = "assets/mirrorDraw.jpg";

  // Which axis is being mirrored (x or y) x is default
  this.axis = "x";
  // Line of symmetry is halfway across the screen
  this.lineOfSymmetry = width / 2;

  // This changes in the jquery click handler. So storing it as
  // a variable self now means we can still access it in the handler
  let self = this;

  // Where was the mouse on the last time draw was called.
  // set it to -1 to begin with
  let previousMouseX = -1;
  let previousMouseY = -1;

  // Mouse coordinates for the other side of the Line of symmetry.
  let previousOppositeMouseX = -1;
  let previousOppositeMouseY = -1;

  this.draw = function () {
    // Display the last save state of pixels
    updatePixels();

    // Do the drawing if the mouse is pressed
    if (mouseIsPressed) {
      // If the previous values are -1 set them to the current mouse location
      // and mirrored positions
      if (previousMouseX == -1) {
        previousMouseX = mouseX;
        previousMouseY = mouseY;
        previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
        previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
      }

      // If there are values in the previous locations
      // draw a line between them and the current positions
      else {
        line(previousMouseX, previousMouseY, mouseX, mouseY);
        previousMouseX = mouseX;
        previousMouseY = mouseY;

        // These are for the mirrored drawing the other side of the
        // line of symmetry
        let oX = this.calculateOpposite(mouseX, "x");
        let oY = this.calculateOpposite(mouseY, "y");
        line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
        previousOppositeMouseX = oX;
        previousOppositeMouseY = oY;
      }
    }
    // If the mouse isn't pressed reset the previous values to -1
    else {
      previousMouseX = -1;
      previousMouseY = -1;

      previousOppositeMouseX = -1;
      previousOppositeMouseY = -1;
    }

    // After the drawing is done save the pixel state. We don't want the
    // line of symmetry to be part of our drawing

    loadPixels();

    // Push the drawing state so that we can set the stroke weight and colour
    push();
    strokeWeight(3);
    stroke("red");
    // Draw the line of symmetry
    if (this.axis == "x") {
      line(width / 2, 0, width / 2, height);
    } else {
      line(0, height / 2, width, height / 2);
    }
    // Return to the original stroke
    pop();
  };

  /*calculate an opposite coordinate the other side of the
   *symmetry line.
   *@param n number: location for either x or y coordinate
   *@param a [x,y]: the axis of the coordinate (y or y)
   *@return number: the opposite coordinate
   */
  this.calculateOpposite = function (n, a) {
    // If the axis isn't the one being mirrored return the same
    // value
    if (a != this.axis) {
      return n;
    }

    // If n is less than the line of symmetry return a coorindate
    // that is far greater than the line of symmetry by the distance from
    // n to that line.
    if (n < this.lineOfSymmetry) {
      return this.lineOfSymmetry + (this.lineOfSymmetry - n);
    }

    // Otherwise a coordinate that is smaller than the line of symmetry
    // by the distance between it and n.
    else {
      return this.lineOfSymmetry - (n - this.lineOfSymmetry);
    }
  };

  // When the tool is deselected update the pixels to just show the drawing and
  // hide the line of symmetry. Also clear options
  this.unselectTool = function () {
    updatePixels();
    // Clear options
    select(".options").html("");
  };

  // Adds a button and click handler to the options area. When clicked
  // toggle the line of symmetry between horizonatl to vertical
  this.populateOptions = function () {
    select(".options").html(
      "<button id='directionButton'>Make Horizontal</button>"
    );
    // Click handler
    select("#directionButton").mouseClicked(function () {
      let button = select("#" + this.elt.id);
      if (self.axis == "x") {
        self.axis = "y";
        self.lineOfSymmetry = height / 2;
        button.html("Make Vertical");
      } else {
        self.axis = "x";
        self.lineOfSymmetry = width / 2;
        button.html("Make Horizontal");
      }
    });
  };
}
