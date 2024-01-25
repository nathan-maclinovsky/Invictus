const playerSprite = new Image();
playerSprite.src = 'Game assets/NinjaSprites/Idle.png';


 class Enemy{
    constructor(tile, spriteSheetSrc){
      this.health = 100;
      this.currentTile = tile;
      this.x = this.currentTile.coords[0];
      this.y = this.currentTile.coords[1];
      this.frame = 0; // Start at a random frame
      this.maxFrame = 10; // Assuming you have 16 frames 0-15
      this.frameDelay = fps/16; // Random delay between 5-14
      this.frameTimer = 0;
      this.power =1;
      this.spriteWidth =100;
      this.spriteHeight=100;
      this.offset=0;
      this.state=0;
      this.leftStart=0;
      this.topStart=0;
      this.cutOutWidth=0;
      this.cutOutHight=0;
      this.xOffSet=0;
      this.yOffSet=0;
      this.spriteSheet = new Image();
      this.spriteSheet.src = spriteSheetSrc;
      this.showoutline = true;
      this.canvasDrawWidth;
      this.canvasDrawHeight;
      this.fighting = false;
    
   }
   update(){
    this.frameTimer++;
    if(this.frameTimer % this.frameDelay === 0){
      this.frame = this.frame >= this.maxFrame ? 0 : this.frame + 1;
    }
  }
  updateDelay(newd){
    this.frameDelay = newd;
  }
  
  draw(){ 
    if(this.showoutline == true){
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.x-this.xOffSet, this.y-this.yOffSet, this.cutOutWidth, this.cutOutHight); 
    }
    if(this.fighting == true){
      ctx.drawImage(this.spriteSheet,this.leftStart+this.frame*this.spriteWidth,this.topStart+this.state*this.spriteHeight,this.cutOutWidth,this.cutOutHight,this.x-this.xOffSet,this.y-this.yOffSet,this.canvasDrawWidth*3,this.canvasDrawHeight*3);
    }
    else{
    ctx.drawImage(this.spriteSheet,this.leftStart+this.frame*this.spriteWidth,this.topStart+this.state*this.spriteHeight,this.cutOutWidth,this.cutOutHight,this.x-this.xOffSet,this.y-this.yOffSet,this.canvasDrawWidth,this.canvasDrawHeight);
    }
  }
  
  changeTile(tile){
    if(tile.occupied === false ){
    this.currentTile.occupied = false;
    tile.occupied = true;
    this.currentTile = tile;
    this.x = this.currentTile.coords[0];
    this.y = this.currentTile.coords[1];
    }
  }
  
  moveTowardsPlayer(enemy, player) {
    var moveTowardsPlayer = Math.random();
  
  
    const playerTile = player.currentTile;
    const enemyTile = enemy.currentTile;
  
    if (moveTowardsPlayer < 0.25){
        let closestTile = null;
        let minDistance = Infinity;
  
        for (const direction in enemyTile.adjacent) {
            const adjacentTile = enemyTile.adjacent[direction];
            if (adjacentTile) {
                const distance = getDistance(adjacentTile, playerTile);
                if (distance < minDistance) {
                    closestTile = adjacentTile;
                    minDistance = distance;
                }
            }
        }
  
        if (closestTile) {
            enemy.changeTile(closestTile);
        }
    }
    if (moveTowardsPlayer > 0.25 && moveTowardsPlayer < 0.5){
        // Instead of moving to the closest tile, move to a random adjacent tile.
        const adjacentTiles = Object.values(enemyTile.adjacent).filter(tile => tile !== null);
        if (adjacentTiles.length > 0) {
            const randomTileIndex = Math.floor(Math.random() * adjacentTiles.length);
            const randomTile = adjacentTiles[randomTileIndex];
            enemy.changeTile(randomTile);
        }
    }
  }
  
  }


 class Player extends Enemy{
    constructor(tile){
      tile.occupied = true;
      super(tile,'Game assets/NinjaSprites/Idle.png');
      this.power = 5;
      this.numTurms = 0;
      this.state =0;
      this.frame = 0;
      this.maxFrame=3;
      this.spriteWidth =200;
      this.spriteHeight=200;
      this.offset=0;
      this.leftStart=75;
      this.topStart=70;
      this.cutOutWidth=50;
      this.cutOutHight=70;
      this.xOffSet=9;
      this.yOffSet=35;
      this.showoutline = false;
      this.frameDelay= fps/16;
      this.playerTurn = true;
      this.spriteSheet = playerSprite;
      this.canvasDrawWidth = this.cutOutWidth;
      this.canvasDrawHeight = this.cutOutHight;
      this.inventory = {
        power: this.power,
        gold: 0,
        items: []
    };
  
    }
    changeTile(tile){
     
      if(ben.playerTurn == true){
      this.currentTile = tile;
      this.x = this.currentTile.coords[0];
      this.y = this.currentTile.coords[1];
      ben.playerTurn = false;
      this.numTurms++;
    }
  }
    
  }



 class Wizard extends Enemy {
    constructor(tile) {
      tile.occupied = true;
      
      // Pass the static sprite sheet source to the super class constructor
      super(tile, 'Game assets/WizardSprites/Idle.png');
      // You can adjust any properties specific to ShroomEnemy here
      this.power = Math.floor(Math.random() * 5) + 5; // Shroom enemies have power in this range
      this.state = 0; // Different animation state if needed
      this.frame = Math.floor(Math.random() * 7);
      this.maxFrame = 7;
      this.spriteWidth =250;
      this.spriteHeight=250;
      this.leftStart=100;
      this.topStart=70;
      this.cutOutWidth=65;
      this.cutOutHight=100;
      this.yOffSet=75;
      this.xOffSet=6;
      this.showoutline = false;
      this.canvasDrawWidth = this.cutOutWidth;
      this.canvasDrawHeight = this.cutOutHight;
      // this.yOffSet=0;
  
    }
  }


   class Necromancer extends Enemy{
    constructor(tile) { 
      tile.occupied = true;
      // Pass the static sprite sheet source to the super class constructor
      super(tile, 'Game assets/Necromancer_creativekind-Sheet.png');
      // You can adjust any properties specific to ShroomEnemy here
      this.power = Math.floor(Math.random() * 5) + 5; // Shroom enemies have power in this range
      this.state = 4; // Different animation state if needed
      this.frame = Math.floor(Math.random() * 7);
      this.maxFrame = 15;
      this.spriteWidth =160;
      this.spriteHeight=128;
      this.leftStart=55;
      this.topStart=50;
      this.cutOutWidth=55;
      this.cutOutHight=80;
      this.yOffSet=40;
      this.xOffSet=10;
      this.showoutline = false;
      this.canvasDrawWidth = this.cutOutWidth;
      this.canvasDrawHeight = this.cutOutHight;
      // this.yOffSet=0;
  
    }
  
  }

//test
let benbruhman = true;