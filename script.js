/**@type {HTMLCancasElement} */


const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const set2 = new Image();
set2.src = 'Game assets/Hex_v01_grid.png';

const playerSprite = new Image();
playerSprite.src = 'Game assets/NinjaSprites/Idle.png';


const intro1 = new Image();
intro1.src = 'Game assets/pixle_art_of_a__1-transformed.png';

const house = new Image();
house.src = 'Game assets/top-down-town-tileset.png';

const shroom_sheet = new Image();
const numberOfEnemies = 1;
shroom_sheet.src = 'Game assets/Idle.png';

const necromancer = new Image();
necromancer.src = 'Game assets/Necromancer_creativekind-Sheet.png';

let gameFrameSpeed = 5;
let shroomgameFrameSpeed = 15;
let gamestart = false;
var usedTiles = [];

let gameFrame = 0;
const shroomarray = [];
const necromancerArray = [];
const enemyarray= [];
const towers = [];

var mymap= window.tiles;
var fps = 160;
const CANVAS_WIDTH = canvas.width = 1500;
const CANVAS_HEIGHT = canvas.height =1500;


class Item{
  constructor(){
    this.name;
    this.power;
  }
}
// Function that returns a Promise for the FPS

// Calling the function to get the FPS

class Enemy{
  constructor(tile, spriteSheetSrc){
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
  ctx.drawImage(this.spriteSheet,this.leftStart+this.frame*this.spriteWidth,this.topStart+this.state*this.spriteHeight,this.cutOutWidth,this.cutOutHight,this.x-this.xOffSet,this.y-this.yOffSet,this.cutOutWidth,this.cutOutHight);
}

changeTile(tile){
  if(tile.occupied == false ){
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


function checkTiles() {
  enemyarray.forEach(Enemy => {
    if(Enemy.currentTile == ben.currentTile){
      console.log("on the same tile");
    }

     
  });
}

function  getDistance(tileA, tileB) {
  // Calculate the Euclidean distance between two tiles.
  // You might need to adjust this function if you require a more accurate distance
  // measurement for a hex grid.
  const dx = tileA.coords[0] - tileB.coords[0];
  const dy = tileA.coords[1] - tileB.coords[1];
  return Math.sqrt(dx * dx + dy * dy);
}

class Tower extends Enemy{
  constructor(tile,assetpath){
  super(tile,'Game assets/castles/Asset 24.png');
  this.state =0;
  this.frame = 0;
  this.maxFrame=0;
  this.spriteWidth =100;
  this.spriteHeight=173;
  this.cutOutWidth=100;
  this.cutOutHight=173;
  this.yOffSet = 27;
  this.showoutline = false;
}
draw(){ 
  if(this.showoutline == true){
  ctx.strokeStyle = 'red';
  ctx.strokeRect(this.x-this.xOffSet, this.y-this.yOffSet, this.cutOutWidth, this.cutOutHight); 
  }
  ctx.drawImage(this.spriteSheet,this.leftStart+this.frame*this.spriteWidth,this.topStart+this.state*this.spriteHeight,this.cutOutWidth,this.cutOutHight,this.x-this.xOffSet,this.y-this.yOffSet,this.spriteWidth/3, this.spriteHeight/3);
}

playerSprite
}
class Player extends Enemy{
  constructor(tile){
    tile.occupied = true;
    super(tile,'Game assets/NinjaSprites/Idle.png');
    this.power = 5;
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
    // this.yOffSet=0;

  }
}
var ben = new Player(mymap.tileList[((722/2)+32)]);





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
    // this.yOffSet=0;

  }

}
 
var usedTilesforTower = [];
function genTower() {
  var random = Math.floor(Math.random() * 4) + 1;
  for(let i = 0; i < random; i++) {
    var randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * edgeTiles.length);
    } while (usedTilesforTower.includes(randomNumber)); // Keep generating a new number until it's unique
    usedTilesforTower.push(randomNumber); // Add the used tile to the usedTiles array
    towers.push(new Tower(edgeTiles[randomNumber]));
  }
}

function nobutton() {
  document.getElementById("beginbutton").style.display = "none";
  genTower();
 
  // Check if startMusic is defined globally
  
  start(); // start the game
}
function setFPS(){
  fps = 2;
  enemyarray.forEach(Enemy => {
    Enemy.updateDelay(fps);
     
  });
  console.log(enemyarray);

}


function spawnEnemy(){
  
  if(enemyarray.length < 10){
  var random = Math.floor(Math.random() * towers.length);
  var enemyType = Math.floor(Math.random() *2) +1;
  if(enemyType == 1 && towers[random].currentTile.occupied == false){
    enemyarray.push(new Wizard(towers[random].currentTile));
  }
  if(enemyType == 2 && towers[random].currentTile.occupied == false){
    enemyarray.push(new Necromancer(towers[random].currentTile));
  }
}
}

function start(){
    gameFrame ++;
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    for (let i = 0; i < mymap.tileList.length; i++) {
        dx =mymap.tileList[i].coords[0];
        dy =mymap.tileList[i].coords[1];
        let xmult = 2;
        let ymult = 0
        if(mymap.tileList[i].type == "Mountain"){
            xmult =2;
            ymult =9;

        }
        ctx.drawImage(set2, 32*xmult, 48*ymult, 32, 48, dx, dy, 32, 48);
        //ctx.fillRect(dx, dy, 32, 48);
        
       
      }
    ctx.drawImage(house, 180, 0, 100, 200, mymap.tileList[722/2].coords[0]-16, mymap.tileList[722/2].coords[1]+6, 30, 60); 
    
    
    towers.forEach(Enemy => {
      Enemy.update();
      Enemy.draw();
      
    });
    
    enemyarray.forEach(Enemy => {
      Enemy.update();
      Enemy.draw();
      
    });

    ben.update();
    ben.draw();
    if(ben.playerTurn == false){
      enemyarray.forEach(Enemy => {
        Enemy.moveTowardsPlayer(Enemy,ben);
         
      });
      ben.playerTurn = true;

    }
    spawnEnemy();
    checkTiles();
    requestAnimationFrame(start);

 }



function fight(Enemy){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



function animate(){ 
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 
    ctx.drawImage(intro1, canvas.width / 2 - intro1.width / 2,canvas.height / 2 - intro1.height / 2);
    requestAnimationFrame(animate);
    
}
animate();



function onCanvasClick(event) {

  // Calculate the canvas position
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;


  // Find the clicked tile
  const clickedTile = mymap.tileList.find(tile => {
    const tileX = tile.coords[0];
    const tileY = tile.coords[1];
    const tileWidth = 32; 
    const tileHeight = 21; 
    return mouseX >= tileX && mouseX <= tileX + tileWidth &&
           mouseY >= tileY && mouseY <= tileY + tileHeight;
});

  

  if (clickedTile && isAdjacent(ben.currentTile, clickedTile)) {
    ben.changeTile(clickedTile);
}
}

canvas.addEventListener('click', onCanvasClick);




function resetPlayerPosition() {
  ben.changeTile(mymap.tileList[((722/2)+32)]);
}

   
document.getElementById('settingsMenuIcon').addEventListener('click', function() {
  var dropdown = document.getElementById('settingsDropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});


















