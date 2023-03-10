// Displays and handles the line weight selector.
function LineWeight() {
  // An object with the lineWeights
  const lineWeights = {
    small: 2,
    medium: 5,
    large: 10,
  };

  const weightClick = function () {
    // Remove the old border
    const current = select("#" + selectedLine);
    current.style("border", "0");

    // Get the new line weight from the id of the clicked element
    const line = this.id();

    // Set the selected line weight
    strokeWeight(lineWeights[line]);
    selectedLine = line;

    // Add a new border to the selected line weight
    this.style("border", "2px solid blue");
  };

  // Load in the line weights
  this.loadLineWeights = function () {
    // Set the strokeWeight property to be small at the start of the programme running
    strokeWeight(lineWeights.small);

    // For each line weight create a new div in the html for the swatches
    for (const line in lineWeights) {
      // Using JQuery add the line weight option
      const lineElement = createDiv();
      lineElement.id(line);
      lineElement.class("swatches lineWeightContainer");

      const weight = createDiv();
      select("#" + line).child(weight);
      weight.class("lineWeight");
      weight.style("width", lineWeights[line] + "px");

      select(".lineWeightSelector").child(lineElement);

      lineElement.mouseClicked(weightClick);
    }

    select("#small").style("border", "2px solid blue");
  };
  // call the loadLineWeights function now it is declared
  this.loadLineWeights();
}
