
// Register Leaderboard as a GameObjectFactory
Phaser.GameObjects.GameObjectFactory.register('GameMap', function () {
    var scene = new GameMap();
    this.scene.add(scene.scene.key, scene);
    return scene;
});

// Define Leaderboard class
class GameMap extends Phaser.Scene {
    constructor() {
        super('GameMap');
    }

    preload() {
    }

    create() {
        
    }

    clickContinue() {
        // Play click sound and fade out scene
        EPT.Sfx.play('click');
        EPT.fadeOutScene('MainMenu', this);
    }
}


