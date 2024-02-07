let game, scores;
Phaser.GameObjects.GameObjectFactory.register('Leaderboard', function () {
    var scene = new Leaderboard();
    this.scene.add(scene.scene.key, scene);
    return scene;
});

class Leaderboard extends Phaser.Scene {
    constructor() {
        super('Leaderboard');
        this.scores = [];
    }
    preload() {
        this.load.bitmapFont('arcade', '/img/arcade.png', '/arcade.xml');
    }
    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        var fontStory = { font: '30px ' + EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5, align: 'center' };
        var textStory = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - (0.75 * this.cameras.main.centerY), EPT.text['leaderboard-text'], fontStory);
        textStory.setOrigin(0.5);

        var buttonContinue = new Button(this.cameras.main.width - 20, this.cameras.main.height - 20, 'button-continue', this.clickContinue, this);
        buttonContinue.setOrigin(1);

        buttonContinue.x = this.cameras.main.width + buttonContinue.width + 20;
        this.tweens.add({ targets: buttonContinue, x: this.cameras.main.width - 20, duration: 500, ease: 'Back' });

        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keyEnter.on('down', function (key, event) { this.clickContinue(); }, this);

        this.cameras.main.fadeIn(250, 0, 0, 0);
        
        this.add.bitmapText(100, 110, 'arcade', 'Eco Score | Profit Primary | Crop | Username').setTint(0xffffff);
        for (let i = 1; i < 6; i++) {
            if (scores[i-1]) {
                this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${scores[i-1].eco} | ${scores[i-1].profit} | ${scores[i-1].primaryCrop}| ${scores[i-1].username}`).setTint(0xffffff).setLetterSpacing(-5);
            } else {
                this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ---      ---    ---    ---`).setTint(0xffffff).setLetterSpacing(-5);
            }
        }
    }
    clickContinue() {
        EPT.Sfx.play('click');
        EPT.fadeOutScene('Story', this);
    }
}

$.ajax({
    type: 'GET',
    url: 'http://localhost:6942/api/person/',
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcm1pdHNhY3R1YWxseXByb25vdW5jZWR3aXRoYVRIVUhAZ21haWwuY29tIiwiaWF0IjoxNzA3MjQ4NTE2LCJleHAiOjE3MDcyNjY1MTZ9.dLWvLwp8UyRMa3kiB5h7R0ms5Tp2ppA-VUuoA2Ys2bU');
    },
    success: function(data) {
        scores = data;
    },
    error: function(xhr) {
        console.log(xhr);
    }
});

