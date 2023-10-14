/**@type {HTMLCancasElement} */


const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const set2 = new Image();
set2.src = 'Hex_v01_grid.png';

const tileset = new Image();
tileset.src = 'fantasyhextiles_v3.png';


const intro1 = new Image();
intro1.src = 'pixle_art_of_a__1-transformed.png';



const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height =1000;
//console.log( mymap.tileList[1].coords[0]);


function start(){
    document.getElementById("beginbutton").style.display = "none";

    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    
    for (let i = 0; i < mymap.tileList.length; i++) {
        //console.log(mymap.tileList[i].coords)
        dx =mymap.tileList[i].coords[0];
        //console.log(mymap.tileList[i].coords[0]);
        dy =mymap.tileList[i].coords[1];
        //let rand = getRandomInt(5);
        console.log(mymap.tileList[i].coords[1]);
        let mult = 2;
        if(mymap.tileList[i].type == "ocean"){
            mult =7
        }
        ctx.drawImage(set2, 32*mult, 0, 32, 48, dx, dy, 32, 48);
        
       
      } 
    //ctx.drawImage(set2, 0, 0, 32, 48, 516, 474, 32, 48);
    //ctx.drawImage(set2, 0, 0, 32, 48, 532, 495, 32, 48);
    //ctx.drawImage(set2, 0, 0, 32, 48, 500, 495, 32, 48);
    //ctx.drawImage(set2, 0, 0, 32, 48, 516, 516, 32, 48);

       requestAnimationFrame(start);

   
    
    
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



function animate(){ 

    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 
    ctx.drawImage(intro1,0,0);
    requestAnimationFrame(animate);
    
}
animate();



    //ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 
   















