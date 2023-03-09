// A tool for cutting and pasting a fragment of the canvas in other places
function ScissorsTool() {
  this.icon = "assets/scissors.jpg";
  this.name = "Scissors";

  let step = 0;
  let selectedArea = {};
  let pasted = false;

  this.draw = function () {
    // This tool do not use strokes
    noStroke();

    // Steps
    switch (step) {
      case 0:
        if (mouseIsPressed) {
          // first click: save pixels and set cut-area start
          loadPixels();
          selectedArea.x = mouseX;
          selectedArea.y = mouseY;

          // Next step
          step++;
        }
        break;
      case 1:
        if (mouseIsPressed) {
          // First click drag: select cut-area
          selectedArea.w = mouseX - selectedArea.x;
          selectedArea.h = mouseY - selectedArea.y;
          updatePixels();
          fill(255, 50, 50, 50);
          rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
        } else {
          // Mouse unclick: next step
          step++;
        }
        break;
      case 2:
        if (!mouseIsPressed) {
          // Save selected cut-area
          updatePixels();
          selectedArea.pixels = get(
            selectedArea.x,
            selectedArea.y,
            abs(selectedArea.w),
            abs(selectedArea.h)
          );

          // Remove pixels
          fill(255);
          rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);

          // Next step
          step++;
        }
        break;
      case 3:
        if (mouseIsPressed) {
          // On click again: paste cut-area on the canvas
          // Check the area its not 0 and avoid error
          if (selectedArea.w * selectedArea.h !== 0)
            image(selectedArea.pixels, mouseX, mouseY);
          loadPixels();
          pasted = true;
        } else if (pasted) {
          // Once pasted: reset
          resetTool();
        }
        break;
    }

    function resetTool() {
      step = 0;
      pasted = false;
      selectedArea = {};
    }

    this.unselectTool = function () {
      updatePixels();
      resetTool();
    };
  };
}
