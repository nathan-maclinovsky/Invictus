/**@type {HTMLCancasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const set2 = new Image();
set2.src = 'Hex_v01_grid.png';

const intro1 = new Image();
intro1.src = 'pixle_art_of_a__1-transformed.png';

const shroom_sheet = new Image();
const numberOfEnemies = 1;
shroom_sheet.src = 'Attack3.png';
let gameFrame = 0;
const shroomarray = [];




const CANVAS_WIDTH = canvas.width = 1500;
const CANVAS_HEIGHT = canvas.height =1500;
//console.log( mymap.tileList[1].coords[0]);
class Shroom{
  constructor(tile){
    
    
    this.x = 500;
    this.y = 500;
    //this.x = tile[0];
    //this.y = tile[1];
    this.frame = 0;
    this.power =  Math.floor(Math.random() * 10) + 1;
    this.spriteWidth = 150;
    this.spriteHeight= 165;
 }
 update(){
  if(gameFrame % 10 ===0 ){
  this.frame>5 ? this.frame = 0 : this.frame++;
 }
}
draw(){
  ctx.drawImage(shroom_sheet,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.spriteWidth,this.spriteHeight);
}


}
function nobutton(){
  document.getElementById("beginbutton").style.display = "none";
  start();
}
for(let i = 0; i< numberOfEnemies; i++){
  shroomarray.push(new Shroom(mymap.tileList[100]));
 
}

function start(){
    gameFrame ++;
    
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    for (let i = 0; i < mymap.tileList.length; i++) {
        dx =mymap.tileList[i].coords[0];
        dy =mymap.tileList[i].coords[1];
        let mult = 2;

        if(mymap.tileList[i].type == "ocean"){
            mult =7
        }
        ctx.drawImage(set2, 32*mult, 0, 32, 48, dx, dy, 32, 48);
        
       
      } 
      shroomarray.forEach(Shroom => {
        Shroom.update();
        Shroom.draw(); 
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
   















