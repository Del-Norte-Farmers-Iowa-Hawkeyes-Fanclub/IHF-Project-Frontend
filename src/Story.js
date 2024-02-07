class Story extends Phaser.Scene {
    constructor() {
        super('Story');
        this.selectedTile; 
        this.tilemapData = []; 
        this.mapSize = 14
    }

    preload() {
        // Load your tile images
		this.load.image('background-color', 'img/tiles/background.png');
		this.load.image('erase', 'img/tiles/blank-tile.png');
        this.load.image('corn', 'img/tiles/corn/Corn stage 2.png');
        this.load.image('corn2', 'img/tiles/corn/corn-stage-3.png');
        this.load.image('corn-button', 'img/buttons/corn-button.png')
        this.load.image('erase-button', 'img/buttons/erase-button.png')
        
        // tile options (tile, button)
        this.erase = ['erase', 'erase-button']
        this.corn = ['corn', 'corn-button']
    }

    create() {
        this.add.sprite(0, 0, 'background-color').setOrigin(0, 0);

        // Create a grid of tiles
        for (let i = 0; i < this.mapSize; i++) {
            this.tilemapData[i] = [];
            for (let j = 0; j < this.mapSize; j++) {
                this.tilemapData[i][j] = null;
            }
        }

        // Display tiles on the sidebar for selection
        this.displaySidebarTiles();

        // Handle input events
        this.input.on('pointerdown', this.handlePointerDown, this);

        this.cameras.main.fadeIn(250, 0, 0, 0);
    }

    update() {
        // Update logic, if needed
    }

    displaySidebarTiles() {
        const sidebar = this.add.group();

        const tiles = [this.erase, this.corn]; // Add more tile keys as needed

        tiles.forEach((tileKey, index) => {
            const tile = this.add.image(70*this.mapSize, index * 70 + 50, tileKey[1]).setInteractive();
            tile.setScale(2);
            tile.on('pointerdown', () => {
                this.selectedTile = tileKey[0]; // Changed to use 'this.selectedTile'

				tiles.forEach((otherTile) => {
                    if (otherTile !== tileKey[0]) {
                        sidebar.getByName(otherTile).clearTint();
                    }
                });
                tile.setTint(0x00ff00); // Change color to highlight (e.g., green)
            }, this);

            sidebar.add(tile, false, tileKey); // Add tile with a name
        });
    }

    handlePointerDown(pointer) {
        if (this.selectedTile) { // Changed to use 'this.selectedTile'
            const row = Math.floor(pointer.y / 60);
            const col = Math.floor(pointer.x / 60);

            if (row >= 0 && row < this.mapSize && col >= 0 && col < this.mapSize) {
                // Place the selected tile on the grid
                if (this.tilemapData[row][col]) {
                    this.tilemapData[row][col].destroy();
                }

                const tile = this.add.image(col * 60 + 30, row * 60 + 30, this.selectedTile); // Changed to use 'this.add.image'
                tile.setScale(4);
                this.tilemapData[row][col] = tile;
            }
        }
    }
};
