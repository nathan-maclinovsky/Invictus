/**@type {HTMLCancasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const set2 = new Image();
set2.src = 'Game assets/Hex_v01_grid.png';

const intro1 = new Image();
intro1.src = 'Game assets/pixle_art_of_a__1-transformed.png';

const shroom_sheet = new Image();
const numberOfEnemies = 10;
shroom_sheet.src = 'Game assets/Attack3.png';

const necromancer = new Image();
necromancer.src = 'Game assets/Necromancer_creativekind-Sheet.png';

let gameFrameSpeed = 3;


let gameFrame = 0;
const shroomarray = [];
const necromancerArray = [];



const CANVAS_WIDTH = canvas.width = 1500;
const CANVAS_HEIGHT = canvas.height =1500;
//console.log( mymap.tileList[1].coords[0]);
class Shroom{
  constructor(tileCords){
    
    
    this.x = tileCords[0];
    this.y = tileCords[1];
    //this.x = tile[0];
    //this.y = tile[1];
    this.frame = 0;
    this.power =  Math.floor(Math.random() * 10) + 1;
    this.spriteWidth = 150;
    this.spriteHeight= 165;
 }
 update(){
  if(gameFrame % gameFrameSpeed ===0 ){

  this.frame>5 ? this.frame = 0 : this.frame++;
 }
}
draw(){
  ctx.drawImage(shroom_sheet,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.spriteWidth,this.spriteHeight);
}


}
class Necromancer{
  constructor(tileCords){
    this.x = tileCords[0];
    this.y = tileCords[1];
    //this.x = tile[0];
    //this.y = tile[1];
    this.frame = 0;
    this.power =  Math.floor(Math.random() * 10) + 1;
    this.spriteWidth = 160;
    this.spriteHeight= 128;
    this.state = 4;
 }
 update(){
  if(gameFrame % gameFrameSpeed ===0 ){

  this.frame>15 ? this.frame = 0 : this.frame++;
 }
}
draw(){
  //ctx.fillRect(this.x, this.y, this.spriteWidth/4, this.spriteHeight/4); 
  ctx.drawImage(necromancer,this.frame * this.spriteWidth,this.state*this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x,this.y,this.spriteWidth/4,this.spriteHeight/4);
  
  
}


}
function nobutton(){
  document.getElementById("beginbutton").style.display = "none";
  start();
}
for(let i = 0; i< numberOfEnemies; i++){
  //var randomNumber = Math.floor(Math.random() * 722) + 0;
 // shroomarray.push(new Shroom(mymap.tileList[randomNumber].coords));
  //console.log(mymap.tileList[randomNumber].coords);
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
        let mult = 2;

        if(mymap.tileList[i].type == "ocean"){
            mult =8;
        }
        ctx.drawImage(set2, 32*mult, 0, 32, 48, dx, dy, 32, 48);
        //ctx.fillRect(dx, dy, 32, 48);
        
       
      } 
    //   shroomarray.forEach(Shroom => {
    //     Shroom.update();
    //     Shroom.draw();
       
    // });
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



    //ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 
   















