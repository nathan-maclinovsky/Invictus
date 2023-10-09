/**@type {HTMLCancasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const intro1 = new Image();
intro1.src = 'pixle_art_of_a__1-transformed.png';

const tileset = new Image();
tileset.src = 'fantasyhextiles_v3.png';
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height =1000;


function start(){
    document.getElementById("beginbutton").style.display = "none";
    console.log("ben");
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(tileset,500,500);
    requestAnimationFrame(start);  
}


function animate(){ 
    console.log("intro");
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 
    ctx.drawImage(intro1,0,0);
    requestAnimationFrame(animate);
    
}
animate();



