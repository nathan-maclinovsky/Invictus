/**@type {HTMLCancasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const set2 = new Image();
set2.src = 'Game assets/Hex_v01_grid.png';

const intro1 = new Image();
intro1.src = 'Game assets/pixle_art_of_a__1-transformed.png';

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

var mymap= window.tiles;

const CANVAS_WIDTH = canvas.width = 1500;
const CANVAS_HEIGHT = canvas.height =1500;
//console.log( mymap.tileList[1].coords[0]);
class Shroom{
  constructor(tileCords){
    
    
    this.x = tileCords[0];
    this.y = tileCords[1];
    this.frame = 0;
    this.power =  Math.floor(Math.random() * 10) + 1;
    this.spriteWidth = 150;
    this.spriteHeight= 165;
 }
 update(){
  if(gameFrame % shroomgameFrameSpeed ===0 ){

  this.frame>2 ? this.frame = 0 : this.frame++;
 }
}
draw(){
  ctx.drawImage(shroom_sheet,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.spriteWidth,this.spriteHeight);
}


}
class Enemy{
  constructor(tileCords, spriteSheetSrc){
    this.x = tileCords[0];
    this.y = tileCords[1];
    this.frame = 0; // Start at a random frame
    this.maxFrame = 10; // Assuming you have 16 frames 0-15
    this.frameDelay = 5; // Random delay between 5-14
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
draw(){ 
  if(this.showoutline == true){
  ctx.strokeStyle = 'red';
  ctx.strokeRect(this.x-this.xOffSet, this.y-this.yOffSet, this.cutOutWidth, this.cutOutHight); 
  }
  ctx.drawImage(this.spriteSheet,this.leftStart+this.frame*this.spriteWidth,this.topStart+this.state*this.spriteHeight,this.cutOutWidth,this.cutOutHight,this.x-this.xOffSet,this.y-this.yOffSet,this.cutOutWidth,this.cutOutHight);
}

}

class Wizard extends Enemy {
  constructor(tileCords) {
    console.log("ben");
    // Pass the static sprite sheet source to the super class constructor
    super(tileCords, 'Game assets/WizardSprites/Idle.png');
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
shroomarray.push(new Wizard(mymap.tileList[1].coords));






class Necromancer {
  constructor(tileCords){
    this.x = tileCords[0];
    this.y = tileCords[1];
    this.frame = Math.floor(Math.random() * 16); // Start at a random frame
    this.maxFrame = 15; // Assuming you have 16 frames 0-15
    this.frameDelay = Math.floor(Math.random() * 6) + 5; // Random delay between 5-14
    this.frameTimer = 0;
    this.power = Math.floor(Math.random() * 10) + 1;
    this.spriteWidth = 160;
    this.spriteHeight = 128;
    this.offset = 40;
    this.state = 4;
 }
 update(){
  this.frameTimer++;
  if(this.frameTimer % this.frameDelay === 0){
    this.frame = this.frame >= this.maxFrame ? 0 : this.frame + 1;
  }
}
draw(){ 
  // ctx.strokeStyle = 'red';
  // ctx.strokeRect(this.x-10, this.y-40, 55, 80); 
  ctx.drawImage(necromancer,55+this.frame*this.spriteWidth,50+this.state*this.spriteHeight,55,80,this.x-10,this.y-40,55,80);
}
}

function nobutton() {
  document.getElementById("beginbutton").style.display = "none";
  // Check if startMusic is defined globally
  if (typeof window.startMusic === 'function') {
    window.startMusic();
  }
  start(); // start the game
}



for(let i = 0; i< numberOfEnemies; i++){
  var randomNumber = Math.floor(Math.random() * 722) + 0;
  shroomarray.push(new Wizard(mymap.tileList[randomNumber].coords));
  console.log(mymap.tileList[randomNumber].coords);
  var randomNumber = Math.floor(Math.random() * 722) + 0;
  necromancerArray.push(new Necromancer(mymap.tileList[randomNumber].coords));
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
      shroomarray.forEach(Enemy => {
        Enemy.update();
        Enemy.draw();
       
    });
      necromancerArray.forEach(Necromancer => {
        Necromancer.update();
        Necromancer.draw();
        
         
    });
    requestAnimationFrame(start);



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



   















