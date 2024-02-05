Phaser.GameObjects.GameObjectFactory.register('LoginScene', function () {
    var scene = new LoginScene();
    this.scene.add(scene.scene.key, scene);
    return scene;
});

class LoginScene extends Phaser.Scene {
    constructor() {
        super('LoginScene');
    }

    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);

        var fontStory = { font: '48px ' + EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
        var textStory = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, EPT.text['screen-story-howto'], fontStory);
        textStory.setOrigin(0.5);

        var buttonContinue = new Button(this.cameras.main.width - 20, this.cameras.main.height - 20, 'button-continue', this.clickContinue, this);
        buttonContinue.setOrigin(1);

        buttonContinue.x = this.cameras.main.width + buttonContinue.width + 20;
        this.tweens.add({ targets: buttonContinue, x: this.cameras.main.width - 20, duration: 500, ease: 'Back' });

        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keyEnter.on('down', function (key, event) { this.clickContinue(); }, this);

        this.cameras.main.fadeIn(250, 0, 0, 0);
    }

    clickContinue() {
        EPT.Sfx.play('click');
        EPT.fadeOutScene('Story', this);
    }
}