class Story extends Phaser.Scene {
    constructor() {
        super('Story');
        this.selectedTile; 
        this.tilemapData = []; 
        this.mapSize = 12; // map is a square (equal width and height)
        this.tileSize = 60; 
        this.week = 1
        this.money = 100
        this.eco = 0
    }

    preload() {
        // Load your tile images
		this.load.image('background-color', 'img/tiles/background.png');
		this.load.image('erase', 'img/tiles/blank-tile.png');
        this.load.image('corn0', 'img/tiles/corn/corn-stage-0.png');
        this.load.image('corn1', 'img/tiles/corn/corn-stage-1.png');
        this.load.image('corn2', 'img/tiles/corn/corn-stage-2.png');
        this.load.image('corn3', 'img/tiles/corn/corn-stage-3.png');
        this.load.image('corn-button', 'img/buttons/corn-button.png')
        this.load.image('erase-button', 'img/buttons/erase-button.png')
        this.load.image('week-button', 'img/buttons/week-button.png')
        
        // tile options (tile, button)
        this.erase = ['erase', 'erase', 'erase-button']
        this.corn = ['corn', 'corn0', 'corn-button']
    }

    create() {
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

        this.add.sprite(0, 0, 'background-color').setOrigin(0, 0);

        // Create a grid of tiles
        for (let i = 0; i < this.mapSize; i++) {
            this.tilemapData[i] = [];
            for (let j = 0; j < this.mapSize; j++) {
                this.tilemapData[i][j] = []; 
                for (let k = 0; k < 3; k++) {
                    this.tilemapData[i][j][k] = null;
                }
            }
        }

        // Display tiles on the sidebar for selection
        this.displaySidebarTiles();

        // display grid
        this.drawGrid();

        // Display the week button
        this.displayWeekButton();

         // Update the displayed data text
        this.updateText();

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
            const tile = this.add.image(this.tileSize*this.mapSize + 250, index * this.tileSize + this.tileSize + 120, tileKey[2]).setInteractive();
            tile.setScale(2);
            tile.on('pointerdown', () => {
                this.selectedTile = tileKey; // Changed to use 'this.selectedTile'

				tiles.forEach((otherTile) => {
                    if (otherTile !== tileKey[1]) {
                        //sidebar.getByName(otherTile).clearTint();
                    }
                });
                //tile.setTint(0xb3f7ff); // Change color to highlight (e.g., green)
            }, this);
            //sidebar.add(tile, false, tileKey); // Add tile with a name
        });
    }

    displayWeekButton() {
        const weekButton = this.add.image(this.tileSize*this.mapSize + 250, this.tileSize * 6 + 100, 'week-button').setInteractive();

        weekButton.on('pointerdown', () => {
            console.log('week')
            this.week++; // Increment week
            this.updateStages()
            this.updateText()
        }, this);

        // Display current week
        this.weekText = this.add.text(900, 50, `Week: ${this.week}`, { fontSize: '24px', fill: '#fff' });
        this.ecoText = this.add.text(900, 110, `Eco Points: ${this.eco}`, { fontSize: '24px', fill: '#fff' });
    }

    handlePointerDown(pointer) {
        if (this.selectedTile) { // Changed to use 'this.selectedTile'
            const row = Math.floor(pointer.y / 60);
            const col = Math.floor((pointer.x - 100) / 60);

            if (row >= 0 && row < this.mapSize && col >= 0 && col < this.mapSize) {
                if (pointer.leftButtonDown()) {
                    // Place the selected tile on the grid
                    for (let i = 0; i < this.mapSize; i++) {
                        if(i == row){
                            for (let j = 0; j < this.mapSize; j++) {
                                if(j == col){
                                    if(this.tilemapData[i][j][0]){
                                        console.log(this.tilemapData)
                                        this.tilemapData[i][j][0].destroy();
                                        this.tilemapData[i][j] = [null, null, null];
                                    }
                                }
                            }
                        }
                    }
                        
                    // if (this.tilemapData[row][col]) {
                    //     this.tilemapData[row][col].forEach((dataPoint) => {
                    //         if (dataPoint) {
                    //             console.log(dataPoint)
                    //             dataPoint = null; // Change texture of the image at index 0
                    //         }// else {
                    //             //this.tilemapData[row][col][index] = null; // Set data point to null
                    //             //dataPoint.destroy(); // Destroy the Phaser object
                    //         //}
                    //     });
                    // }
                    
                    if(this.selectedTile != this.erase){
                        const tile = this.add.image(col * 60 + 130, row * 60 + 30, this.selectedTile[1]);
                    tile.setScale(4);
                    this.tilemapData[row][col][0] = tile; // Store the image at index 0
    
                    // Example: Store additional data points
                    // You can add more data points as needed
                    this.tilemapData[row][col][1] = this.selectedTile[0];
                    this.tilemapData[row][col][2] = 0;
                    this.tilemapData[row][col][3] = this.selectedTile[0] + 1;
    
                    tile.setScale(4);
                    }
                } else if (pointer.rightButtonDown()) {
                    // Handle right mouse button
                    // Display the name of the tile to the left of the tilemap
                    this.displayTileData(this.tilemapData[row][col], row, col);
                    console.log(this.selectedTile)
                    console.log(this.tilemapData)
                } 
            }
        }
    }

    displayTileData(tileData, row, col) {
        if (this.tileName) {
            this.tileName.destroy(); // Clear existing tile name text
        }
        if (this.tileStage) {
            this.tileStage.destroy(); // Clear existing tile name text
        }
        if (this.tilePos) {
            this.tilePos.destroy(); // Clear existing tile name text
        }
        this.tileName = this.add.text(10, 50, tileData[1], { fontSize: '16px', fill: '#fff' }); // displays tile name
        this.tileStage = this.add.text(10, 80, 'Stage: '+tileData[2], { fontSize: '16px', fill: '#fff' }); // displays tile stage
        this.tilePos = this.add.text(10, 110, '('+row+', '+col+')', { fontSize: '16px', fill: '#fff' }); // displays tile stage
    }

    drawGrid(){
        // colors
        const white = 0xffffff; 
        const lightBrown = 0xeaa81e

            // Loop through the grid and create squares
        for (var i = 0; i < this.mapSize; i++) {
            for (var j = 0; j < this.mapSize; j++) {
                // Calculate position for each square
                var posX = i * this.tileSize + 100;
                var posY = j * this.tileSize;

                // Create the square shape
                var graphics = this.add.graphics({
                    x: posX,
                    y: posY
                });
                graphics.fillStyle(lightBrown); // Fill color of the square
                graphics.fillRect(0, 0, this.tileSize, this.tileSize); // Draw the square
                graphics.lineStyle(1, white); // Line style for the grid lines
                graphics.strokeRect(0, 0, this.tileSize, this.tileSize); // Draw the grid lines
            }
        }
    }
    updateText() {
        this.weekText.setText(`Week: ${this.week}`);

        //this.moneyText = this.add.text(900, 80, `Money: ${this.money}`, { fontSize: '24px', fill: '#fff' });
        //this.moneyText.setText(`Money: ${this.money}`);

        this.ecoText.setText(`Eco Points: ${this.eco}`);
    }
    updateStages(){
        // iterate through all tiles in array (1st and 2nd layers only)
        for (let i = 0; i < this.mapSize; i++) {
            for (let j = 0; j < this.mapSize; j++) {
                if (this.tilemapData[i][j][0] && this.tilemapData[i][j][2] < 2 && this.tilemapData[i][j][1] != 'erase'){ // check that a tile is present
                    this.eco += 1
                    this.tilemapData[i][j][2] += 1; // update the stage of every tile
                    this.tilemapData[i][j][0] = this.tilemapData[i][j][0].setTexture(this.tilemapData[i][j][3].slice(0, -1) + (this.tilemapData[i][j][2])) // replace the image of every tile
                }
            }
        }
    }
};
