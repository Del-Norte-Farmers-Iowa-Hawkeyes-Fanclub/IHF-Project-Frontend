Phaser.GameObjects.GameObjectFactory.register('LoginScene', function () {
    var scene = new LoginScene();
    this.scene.add(scene.scene.key, scene);
    return scene;
});

class LoginScene extends Phaser.Scene {
    constructor() {
        super('LoginScene');
    }

    preload ()
    {
        this.load.html('nameform', '/loginform.html');
    }

    create ()
    {
        
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        var fontStory = { font: '30px ' + EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5, align: 'center' };
        var textStory = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY-(0.75*this.cameras.main.centerY), EPT.text['login-title'], fontStory);
        textStory.setOrigin(0.5);
        
        //rectangle for position testing
        // this.add.rectangle(400, 300, 800, 600, 0xff0000);
        const element = this.add.dom(400, 600).createFromCache('nameform');
        console.log(element);
        // element.setPerspective(800);

        element.addListener('click');

        element.on('click', function (event)
        {

            if (event.target.name === 'loginButton')
            {
                const inputUsername = this.getChildByName('username');
                const inputPassword = this.getChildByName('password');

                
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Tween the login form out
                    this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                    this.scene.tweens.add({
                        targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                        onComplete: function ()
                        {
                            element.setVisible(false);
                        }
                    });

                    //  Populate the text with whatever they typed in as the username!
                    text.setText(`Welcome ${inputUsername.value}`);
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }

        });

        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });

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
