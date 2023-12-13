/**@type {HTMLCancasElement} */


const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const set2 = new Image();
set2.src = 'Game assets/Hex_v01_grid.png';

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


let gameFrame = 0;
const shroomarray = [];
const necromancerArray = [];
const enemyarray= [];

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
  this.currentTile = tile;
  this.x = this.currentTile.coords[0];
  this.y = this.currentTile.coords[1];
}


}
class Tower extends Enemy{
  constructor(tile,assetpath){
  console.log("tower");
  super(tile,'Game assets/castles/Asset 24.png');
  this.state =0;
  this.frame = 0;
  this.maxFrame=0;
  this.spriteWidth =275;
  this.spriteHeight=475;
  this.cutOutWidth=275;
  this.cutOutHight=475;
  this.yOffSet = 30;
  this.showoutline = false;
}
draw(){ 
  if(this.showoutline == true){
  ctx.strokeStyle = 'red';
  ctx.strokeRect(this.x-this.xOffSet, this.y-this.yOffSet, this.cutOutWidth, this.cutOutHight); 
  }
  ctx.drawImage(this.spriteSheet,this.leftStart+this.frame*this.spriteWidth,this.topStart+this.state*this.spriteHeight,this.cutOutWidth,this.cutOutHight,this.x-this.xOffSet,this.y-this.yOffSet,this.spriteWidth/7.5, this.spriteHeight/7.5);
}


}
class Player extends Enemy{
  constructor(tile){
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
    this.inventory = {
      power: this.power,
      gold: 0,
      items: []
  };

  }
  
}


class Wizard extends Enemy {
  constructor(tile) {
    
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
var tower = new Tower(mymap.tileList[0]);
var tower2 = new Tower(mymap.tileList[400]);
enemyarray.push(ben);
enemyarray.push(tower);
enemyarray.push(tower2);
enemyarray.push(new Wizard(mymap.tileList[1]));
console.log(enemyarray);

class Necromancer extends Enemy{
  constructor(tile) { 
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

function nobutton() {
  document.getElementById("beginbutton").style.display = "none";
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



for(let i = 0; i< numberOfEnemies; i++){
  var randomNumber = Math.floor(Math.random() * 722) + 0;
  enemyarray.push(new Necromancer(mymap.tileList[randomNumber]));
  console.log(mymap.tileList[randomNumber].coords);
 
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
    enemyarray.forEach(Enemy => {
      Enemy.update();
      Enemy.draw();
       
    });
    requestAnimationFrame(start);

  //   document.onkeydown = function(event) {
  //       moveKey(event);

  // };




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
  console.log("click");
  // Calculate the canvas position
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  console.log(mouseX);
  console.log(mouseY);
  // Find the clicked tile
  const clickedTile = mymap.tileList.find(tile => {
    const tileX = tile.coords[0];
    const tileY = tile.coords[1];
    const tileWidth = 32; 
    const tileHeight = 21; 
    return mouseX >= tileX && mouseX <= tileX + tileWidth &&
           mouseY >= tileY && mouseY <= tileY + tileHeight;
});
  console.log(clickedTile);
  

  if (clickedTile && isAdjacent(ben.currentTile, clickedTile)) {
    ben.changeTile(clickedTile);
}
}

canvas.addEventListener('click', onCanvasClick);




function resetPlayerPosition() {
  ben.changeTile(mymap.tileList[((722/2)+32)]);
}

   
document.getElementById('settingsMenuIcon').addEventListener('click', function() {
  console.log("ben");
  var dropdown = document.getElementById('settingsDropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});
















