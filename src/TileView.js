let controls;
let worldLayer;

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
    this.load.image("tiles", "../assets/tilesets/tilesets.png");
    this.load.tilemapTiledJSON("map", "../assets/tilemaps/untitled.json");
  }
  
create() {
    const map = this.make.tilemap({ key: "map" });
        
    // Handle Enter key press
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keyEnter.on('down', function (key, event) { this.clickContinue(); }, this);
    
    // Fade in camera
    this.cameras.main.fadeIn(250, 0, 0, 0);


    // const tileset = map.addTilesetImage("tiles");
    const tileset = map.addTilesetImage("tilesets","tiles");
    

    // // Parameters: layer name (or index) from Tiled, tileset, x, y
    worldLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
    

  
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
  
  }
  
  
update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    controls.update(delta);
    
    // Convert the mouse position to world position within the camera
    const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    
    // Draw tiles (only within the groundLayer)
    if (this.input.manager.activePointer.isDown) {
      worldLayer.putTileAtWorldXY(37, worldPoint.x, worldPoint.y);
    }
  }

}

