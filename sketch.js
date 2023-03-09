// Global variables that will store the toolbox colour palette
// amnd the helper functions
let toolbox = null;
let stickers = null;
let colourP = null;
let lineWeight = null;
let helpers = null;
let selectedColour = "black";
let selectedLine = "small";

let stickersImg = {
  star: null,
  heart: null,
  happy: null,
};

function preload() {
  stickersImg.star = loadImage("./assets/star.png");
  stickersImg.heart = loadImage("./assets/heart.png");
  stickersImg.happy = loadImage("./assets/happy.png");
}

function setup() {
  // Create a canvas to fill the content div from index.html
  canvasContainer = select("#content");
  let c = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  c.parent("content");
  pixelDensity(1);

  // Create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  // Create line weight picker
  lineWeight = new LineWeight();

  // Create a toolbox for storing the tools
  toolbox = new Toolbox();

  // Create stickers tool section
  stickers = new StickersTool();

  // Add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new mirrorDrawTool());
  toolbox.addTool(new CircleTool());
  toolbox.addTool(new RectangleTool());
  toolbox.addTool(new ScissorsTool());
  toolbox.addTool(new FillTool());
  background(255);
}

function draw() {
  // Set stroke color
  stroke(selectedColour);

  // Call the draw function from the selected tool.
  // HasOwnProperty is a javascript function that tests
  // If an object contains a particular method or property
  // If there isn't a draw method the app will alert the user
  noFill();
  if (toolbox.selectedTool?.hasOwnProperty("draw")) {
    toolbox.selectedTool.draw();
  } else if (stickers.selectedSticker.name) {
    stickers.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}
