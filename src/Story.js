class Story extends Phaser.Scene {
    constructor() {
        super('Story');
        this.selectedTile; 
        this.tilemapData = []; 
    }

    preload() {
        // Load your tile images
		this.load.image('background-color', 'img/tiles/background.png');
		this.load.image('erase', 'img/tiles/corn/Corn stage 1.png');
        this.load.image('corn', 'img/tiles/corn/Corn stage 2.png');
        this.load.image('corn2', 'img/tiles/corn/corn-stage-3.png');
        // Add more tiles as needed
    }

    create() {
        this.add.sprite(0, 0, 'background-color').setOrigin(0, 0);

        // Create a grid of tiles
        for (let i = 0; i < 10; i++) {
            this.tilemapData[i] = [];
            for (let j = 0; j < 10; j++) {
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

        const tiles = ['erase','corn', 'corn2']; // Add more tile keys as needed

        tiles.forEach((tileKey, index) => {
            const tile = this.add.image(700, index * 70 + 50, tileKey).setInteractive();
            tile.setScale(2);
            tile.on('pointerdown', () => {
                this.selectedTile = tileKey; // Changed to use 'this.selectedTile'
            }, this);

            sidebar.add(tile);
        });
    }

    handlePointerDown(pointer) {
        if (this.selectedTile) { // Changed to use 'this.selectedTile'
            const row = Math.floor(pointer.y / 60);
            const col = Math.floor(pointer.x / 60);

            if (row >= 0 && row < 10 && col >= 0 && col < 10) {
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
