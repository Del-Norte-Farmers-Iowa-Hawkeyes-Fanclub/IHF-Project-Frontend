// Define 'scores' globally to make it accessible throughout the code
let scores;

// Register Leaderboard as a GameObjectFactory
Phaser.GameObjects.GameObjectFactory.register('Leaderboard', function () {
    var scene = new Leaderboard();
    this.scene.add(scene.scene.key, scene);
    return scene;
});

// Define Leaderboard class
class Leaderboard extends Phaser.Scene {
    constructor() {
        super('Leaderboard');
        this.scores = [];
    }

    preload() {
        // Load bitmap font
        this.load.bitmapFont('arcade', '/bitmap/arcade.png', '/bitmap/arcade.xml');
    }

    create() {
        // Add background sprite
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);

        // Add leaderboard text
        // var fontStory = { font: '30px ' + EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5, align: 'center' };
        // var textStory = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - (0.85 * this.cameras.main.centerY), EPT.text['leaderboard-text'], fontStory);
        var textStory = this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY - (0.85 * this.cameras.main.centerY), 'arcade', EPT.text['leaderboard-text']).setTint(0x000000);
        textStory.setOrigin(0.5);

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
        
        // Add leaderboard text
        this.add.bitmapText(100, 110, 'arcade', 'Eco Score | Profit | Primary-Crop | Username').setTint(0x000000);

        // Display scores
        for (let i = 0; i < 5; i++) {
            const scoreData = scores[i];
            if (scoreData) {
                const { eco, cash, primaryCrop, name } = scoreData;
                const formattedEco = eco.toString().padStart(3, ' ');
                const formattedCash = cash.toString().padStart(3, ' ');
                let truncatedName = name;
                if (name.length > 8) {
                    truncatedName = name.substring(0, 7) + '.';
                }
                const text = `  ${formattedEco}       ${formattedCash}        ${primaryCrop}      ${truncatedName}`;
                this.add.bitmapText(100, 160 + 50 * (i + 1), 'arcade', text).setTint(0xffffff).setLetterSpacing(0).setTint(0x000000);
            } else {
                this.add.bitmapText(100, 160 + 50 * (i + 1), 'arcade', `   ---       ---       ----      -------`).setTint(0x000000).setLetterSpacing(0);
            }
        }
    }

    clickContinue() {
        // Play click sound and fade out scene
        EPT.Sfx.play('click');
        EPT.fadeOutScene('World', this);
    }
}

// Perform AJAX request to get scores data
$.ajax({
    type: 'GET',
    url: 'http://localhost:8012/api/person/eco',
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
