// Displays and handles the colour palette.
function ColourPalette() {
  // List of web colour strings
  this.colours = [
    "black",
    "silver",
    "gray",
    "white",
    "maroon",
    "red",
    "purple",
    "orange",
    "pink",
    "fuchsia",
    "green",
    "lime",
    "olive",
    "yellow",
    "navy",
    "blue",
    "teal",
    "aqua",
  ];
  // Make the start colour be black

  let colourClick = function () {
    // Remove the old selector border
    let current = select("#" + selectedColour + "Swatch");
    current?.style("border", "0");

    // Get the new colour from the id of the clicked element
    const c = this.id().split("Swatch")[0];

    // Set the selected colour and fill and stroke
    selectedColour = c;
    fill(c);
    stroke(c);

    // Add a new border to the selected colour
    this.style("border", "2px solid blue");
  };

  // Load in the colours
  this.loadColours = function () {
    // Set the fill and stroke properties to be black at the start of the programme
    // running
    fill(this.colours[0]);
    stroke(this.colours[0]);

    // For each colour create a new div in the html for the swatches
    for (let i = 0; i < this.colours.length; i++) {
      const colourID = this.colours[i] + "Swatch";

      //using JQuery add the swatch to the palette and set its background colour
      //to be the colour value.
      let colourSwatch = createDiv();
      colourSwatch.class("swatches");
      colourSwatch.id(colourID);

      select(".colourPalette").child(colourSwatch);
      select("#" + colourID).style("background-color", this.colours[i]);
      colourSwatch.mouseClicked(colourClick);
    }

    // Create color picker and add it to the html
    let colourPicker = createInput("#D8BFD8", "color");
    colourPicker.size(41, 41);
    colourPicker.position(305, height + 95);
    colourPicker.input(function () {
      colourPicker.id(this.value() + "Swatch");
      // Call colourClick and pass this reference
      colourClick.call(this);
    });
  };
  // Call the loadColours function now it is declared
  this.loadColours();
}
