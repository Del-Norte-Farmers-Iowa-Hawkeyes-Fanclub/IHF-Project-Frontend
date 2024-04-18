// Register Leaderboard as a GameObjectFactory
Phaser.GameObjects.GameObjectFactory.register('GameWorld', function () {
    var scene = new GameWorld();
    this.scene.add(scene.scene.key, scene);
    return scene;
});

class GameWorld extends Phaser.Scene {
    constructor() {
        super('GameWorld');
    }

    preload(){

    }

    create(){

    }

    clickContinue() {
        // Play click sound and fade out scene
        EPT.Sfx.play('click');
        EPT.fadeOutScene('MainMenu', this);
    }
}