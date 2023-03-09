// Displays and handles the stickers tool
function StickersTool() {
  // A list of all available stickers
  this.stickers = [
    {
      name: "star",
      icon: "assets/star.png",
      sticker: stickersImg.star,
    },
    {
      name: "heart",
      icon: "assets/heart.png",
      sticker: stickersImg.heart,
    },
    {
      name: "happy",
      icon: "assets/happy.png",
      sticker: stickersImg.happy,
    },
  ];
  this.selectedSticker = null;

  let self = this;

  let stickerItemClick = function () {
    // Remove any existing borders
    let items = selectAll(".stickerItem");
    for (let i = 0; i < items.length; i++) {
      items[i].style("border", "0");
    }

    let stickerName = this.id().split("stickerItem")[0];
    self.selectSticker(stickerName);

    // Call loadPixels to make sure most recent changes are saved to pixel array
    loadPixels();
  };

  // add a new sticker icon to the html page
  let addToolIcon = function (sticker, name) {
    let stickerItem = createDiv("<img src='" + sticker + "'></div>");
    stickerItem.class("stickerItem");
    stickerItem.id(name + "stickerItem");
    stickerItem.parent("stickersContainer");
    stickerItem.mouseClicked(stickerItemClick);
  };

  this.loadStickers = function () {
    this.stickers.forEach(({ icon, name }) => addToolIcon(icon, name));
  };

  this.selectSticker = function (stickerName) {
    // Unselect tool
    toolbox.unselectTool();

    // Search through the stickers for one that's name matches stickerName
    for (let i = 0; i < this.stickers.length; i++) {
      if (this.stickers[i].name == stickerName) {
        // Select the sticker and highlight it on the sticker toolbox
        this.selectedSticker = this.stickers[i];
        select("#" + stickerName + "stickerItem").style(
          "border",
          "2px solid blue"
        );
      }
    }
  };

  this.draw = function () {
    if (mouseIsPressed) {
      let coordX = mouseX - 25;
      let coordY = mouseY - 25;
      image(this.selectedSticker.sticker, coordX, coordY, 50, 50);
    }
  };

  this.unselectSticker = function () {
    // Remove any existing borders
    var items = selectAll(".stickerItem");
    for (var i = 0; i < items.length; i++) {
      items[i].style("border", "0");
    }

    // Remove selected sticker
    this.selectedSticker = null;
  };

  // Call the loadStickers function now it is declared
  this.loadStickers();
}
