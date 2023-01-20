//Displays and handles the line weight selector.
function LineWeight() {
  //an object with the lineWeights
  const lineWeights = {
    small: 2,
    medium: 5,
    large: 10,
  };

  const weightClick = function () {
    //remove the old border
    const current = select("#" + selectedLine);
    current.style("border", "0");

    //get the new line weight from the id of the clicked element
    const line = this.id();

    //set the selected line weight
    strokeWeight(lineWeights[line]);
    selectedLine = line;

    //add a new border to the selected line weight
    this.style("border", "2px solid blue");
  };

  //load in the line weights
  this.loadLineWeights = function () {
    //set the strokeWeight property to be small at the start of the programme running
    strokeWeight(lineWeights.small);

    //for each line weight create a new div in the html for the swatches
    for (const line in lineWeights) {
      //using JQuery add the line weight option
      const lineElement = createDiv();
      lineElement.id(line);
      lineElement.class("swatches lineWeightContainer");

      const weight = createDiv();
      select("#" + line).child(weight);
      weight.class("lineWeight");
      weight.style("width", lineWeights[line] + "px");
      console.log(lineWeights[line] + "px");

      select(".lineWeightSelector").child(lineElement);

      lineElement.mouseClicked(weightClick);
    }

    select("#small").style("border", "2px solid blue");
  };
  //call the loadLineWeights function now it is declared
  this.loadLineWeights();
}
