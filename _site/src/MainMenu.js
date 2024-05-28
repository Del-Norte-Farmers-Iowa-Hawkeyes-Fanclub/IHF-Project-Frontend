class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
        this.bgFilesLoaded = false;
    }
    
    create() {
        this.getData();
        let highscore = EPT.Storage.get('EPT-highscore');
        this.add.sprite(0, -80, 'background').setOrigin(0,0);
        this.add.sprite(-200, -400, `titleAuthor`).setOrigin(0,0);
        EPT.Storage.initUnset('EPT-highscore', 0);

        this.waitingForSettings = false;
                
        this.input.keyboard.on('keydown', this.handleKey, this);
        var title = this.add.sprite(EPT.world.centerX-10, EPT.world.centerY+40, 'title');

        var titleAuthor = this.add.sprite(EPT.world.centerX, EPT.world.centerY+50, 'titleAuthor');
        titleAuthor.setOrigin(-2,0);
        var fontHighscore = { font: '38px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5 };
        var textHighscore = this.add.text(EPT.world.width-30, 60, EPT.text['menu-highscore']+highscore, fontHighscore);
        textHighscore.setOrigin(1, 0);
    
        textHighscore.y = -textHighscore.height-30;
        this.tweens.add({targets: textHighscore, y: 40, duration: 500, delay: 100, ease: 'Back'});
        
        this.buttonSettings = new Button(20, 20, 'button-settings', this.clickSettings, this);
        this.buttonSettings.setOrigin(0, 0);

        var buttonEnclave = new Button(20, EPT.world.height-40, 'logo-enclave', this.clickEnclave, this, 'static');
        buttonEnclave.setOrigin(0, 1);

        this.buttonStart = new Button(EPT.world.width-20, EPT.world.height-20, 'button-start', this.clickStart, this);
        this.buttonStart.setOrigin(1, 1);
        
        this.buttonStart.x = EPT.world.width+this.buttonStart.width+20;
        this.tweens.add({targets: this.buttonStart, x: EPT.world.width-20, duration: 500, ease: 'Back'});

		buttonEnclave.x = -buttonEnclave.width-20;
        this.tweens.add({targets: buttonEnclave, x: 20, duration: 500, ease: 'Back'});

        this.buttonSettings.y = -this.buttonSettings.height-20;
        this.tweens.add({targets: this.buttonSettings, y: 20, duration: 500, ease: 'Back'});

        this.buttonShop = new Button(300,500, 'shop', this.clickShop, this);       
        this.cameras.main.fadeIn(250);

        if(!this.bgFilesLoaded) {
            this.time.addEvent({
                delay: 500,
                callback: function() {
                    this.startPreloadInTheBackground();
                },
                callbackScope: this
            }, this);
        }
    }

    async getData() {
        var email = localStorage.getItem('email');
        try {
            if (!email){
                throw new Error("Email is missing from local storage");
            }
            var data = { 
                email: email, 
            }
    
            const response = await fetch("http://localhost:6942/api/person/getEco", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(function(response){
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Error: " + response.status);
                }
            }).then(function(data){
                console.log(data);
                EPT.Storage.set('EPT-highscore', data) 
                return data;
            });
        } catch (error){
            console.error("An error occurred:", error);
            return 0;
        }
    }
    
    handleKey(e) {
        switch(e.code) {
            case 'KeyS': {
                this.clickSettings();
                break;
            }
            case 'Enter': {
                this.clickStart();
                break;
            }
            default: {}
        }
    }
    clickEnclave() {
        EPT.Sfx.play('click');
        window.top.location.href = 'https://rkmist.github.io/Del-Norte-Association-of-Sustainable-Farmers-Saftey-and-OSHA-Log-Book/';
    }
    clickSettings() {
        if(this.bgFilesLoaded) {
            EPT.Sfx.play('click');
            if(this.loadImage) {
                this.loadImage.destroy();
            }
            EPT.fadeOutScene('Settings', this);
        }
        else {
            var animationFrames = this.anims.generateFrameNumbers('loader');
            animationFrames.pop();
            this.waitingForSettings = true;
            this.buttonSettings.setAlpha(0.1);
            var loadAnimation = this.anims.create({
                key: 'loading',
                frames: animationFrames,
                frameRate: 12,
                repeat: -1
            });
            this.loadImage = this.add.sprite(30, 30, 'loader').setOrigin(0,0).setScale(1.25);
            this.loadImage.play('loading');
        }
    }

    clickShop() {
        EPT.Sfx.play('click');
        window.top.location.href = 'localhost:4000/shop.html';
    }

    clickStart() {
        if(this.bgFilesLoaded) {
            EPT.Sfx.play('click');
            if(this.loadImage) {
                this.loadImage.destroy();
            }
            EPT.fadeOutScene('Leaderboard', this);
        }
        else {
            var animationFrames = this.anims.generateFrameNumbers('loader');
            animationFrames.pop();
            this.waitingForStart = true;
            this.buttonStart.setAlpha(0.1);
            var loadAnimation = this.anims.create({
                key: 'loading',
                frames: animationFrames,
                frameRate: 12,
                repeat: -1
            });
            this.loadImage = this.add.sprite(EPT.world.width-85, EPT.world.height-85, 'loader').setOrigin(1,1).setScale(1.25);
            this.loadImage.play('loading');
        }
    }
    startPreloadInTheBackground() {
        console.log('[EPT] Starting background loading...');
        this.load.image('img/clickme');
        this.load.once('filecomplete', this.addFiles, this);
        this.load.start();
    }
    addFiles() {
        var resources = {
            'image': [
                ['clickme', 'img/clickme.png'],
                ['overlay', 'img/overlay.png'],
                ['button-beer', 'img/button-beer.png'],
                ['banner-beer', 'img/banner-beer.png'],
                ['particle', 'img/particle.png']
            ],
            'spritesheet': [
                ['button-continue', 'img/button-continue.png', {frameWidth:180,frameHeight:180}],
                ['button-mainmenu', 'img/button-mainmenu.png', {frameWidth:180,frameHeight:180}],
                ['button-restart', 'img/button-tryagain.png', {frameWidth:180,frameHeight:180}],
                ['button-achievements', 'img/button-achievements.png', {frameWidth:110,frameHeight:110}],
                ['button-pause', 'img/button-pause.png', {frameWidth:80,frameHeight:80}],
                ['button-credits', 'img/button-credits.png', {frameWidth:80,frameHeight:80}],
                ['button-sound-on', 'img/button-sound-on.png', {frameWidth:80,frameHeight:80}],
                ['button-sound-off', 'img/button-sound-off.png', {frameWidth:80,frameHeight:80}],
                ['button-music-on', 'img/button-music-on.png', {frameWidth:80,frameHeight:80}],
                ['button-music-off', 'img/button-music-off.png', {frameWidth:80,frameHeight:80}],
                ['button-back', 'img/button-back.png', {frameWidth:70,frameHeight:70}]
            ],
            'audio': [
                ['sound-click', ['sfx/audio-button.m4a','sfx/audio-button.mp3','sfx/audio-button.ogg']],
                ['music-theme', ['sfx/music-bitsnbites-liver.m4a','sfx/music-bitsnbites-liver.mp3','sfx/music-bitsnbites-liver.ogg']]
            ]
        };            
        for(var method in resources) {
            resources[method].forEach(function(args) {
                var loader = this.load[method];
                loader && loader.apply(this.load, args);
            }, this);
        };
        this.load.on('complete', function(){
            console.log('[EPT] All files loaded in the background.');
            this.bgFilesLoaded = true;
            EPT.Sfx.manage('music', 'init', this);
            EPT.Sfx.manage('sound', 'init', this);
            if(this.waitingForSettings) {
                this.clickSettings();
            }
            if(this.waitingForStart) {
                this.clickStart();
            }            
        }, this);
    }
}
