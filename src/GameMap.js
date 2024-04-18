

let controls;

// Register Leaderboard as a GameObjectFactory
Phaser.GameObjects.GameObjectFactory.register('World', function () {
    var scene = new World();
    this.scene.add(scene.scene.key, scene);
    return scene;
});

// Define Leaderboard class
class World extends Phaser.Scene {
    constructor() {
        super('World');
    }
  
preload() {
    this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxemon-town.json");
  }
  
create() {
    const map = this.make.tilemap({ key: "map" });
  
    // Add continue button
    var buttonContinue = new Button(this.cameras.main.width - 20, this.cameras.main.height - 20, 'button-continue', this.clickContinue, this);
    buttonContinue.setOrigin(1);
    buttonContinue.x = this.cameras.main.width + buttonContinue.width + 20;
    this.tweens.add({ targets: buttonContinue, x: this.cameras.main.width - 20, duration: 500, ease: 'Back' });

    // Handle Enter key press
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keyEnter.on('down', function (key, event) { this.clickContinue(); }, this);
    
    // Fade in camera
    this.cameras.main.fadeIn(250, 0, 0, 0);

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
  
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("Below Player", tileset, 75, 0);
    const worldLayer = map.createLayer("World", tileset, 75, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 75, 0);
  
    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;
  
    // Set up the arrows to control the camera
    const cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    });
  
    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, "Arrow keys to scroll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000",
      })
      .setScrollFactor(0);

      clickContinue() {
        // Play click sound and fade out scene
        EPT.Sfx.play('click');
        EPT.fadeOutScene('MainMenu', this);
    };
  }
  
  
update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    controls.update(delta);
  }

}