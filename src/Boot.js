class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        this.load.image('background', 'img/farming_Landscape.jpg');
        this.load.image(`titleAuthor`, 'img/titleAuthor.png');
        this.load.image('logo-enclave', 'img/image.png');
        this.load.image('loading-background', 'img/loading-background.png');
        //this.load.image('corn', 'img/tiles/corn/corn-stage-3.png');
        WebFont.load({ custom: { families: ['Berlin'], urls: ['fonts/BRLNSDB.css'] } });
    }
    create() {
        EPT.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };
        EPT.Lang.updateLanguage('en');
        EPT.text = EPT.Lang.text[EPT.Lang.current];
        this.scene.start('Preloader');
    }
}