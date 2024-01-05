var mymap= window.tiles;
window.edgeTiles = [];



function createTilePointers(tileList) {

  tileList.forEach(tile => {
  tile.occupied = false; // Initialize all tiles as unoccupied
});
    console.log("in");
    // Define the offsets for the surrounding tiles
    const offsets = {
        "topRight": [16, -21],
        "right": [32, 0],
        "bottomRight": [16, 21],
        "bottomLeft": [-16, 21],
        "left": [-32, 0],
        "topLeft": [-16, -21]
    };
  
    // Iterating through each tile in the tile list
    tileList.forEach(tile => {
        const directions = Object.keys(offsets); // Get all the direction keys from offsets
        tile.adjacent = {}; // Initialize the adjacent field with an empty object
        
        directions.forEach(direction => {
            const [offsetX, offsetY] = offsets[direction];
            const newCoords = [tile.coords[0] + offsetX, tile.coords[1] + offsetY];
            // Find the existing neighboring tile in tileList if it exists
            const neighborTile = tileList.find(t => t.coords[0] === newCoords[0] && t.coords[1] === newCoords[1]);
            // If neighbor tile is found, add it to the adjacent field with the direction as key
            if (neighborTile) {
                tile.adjacent[direction] = neighborTile;
            }
        });
        if (Object.keys(tile.adjacent).length < 6) {
          edgeTiles.push(tile);
      }
    });
  
   
   
  }
  function isAdjacent(currentTile, targetTile) {
    return Object.values(currentTile.adjacent).some(adjTile => adjTile === targetTile);
  }


  


  
    
    
  createTilePointers(mymap.tileList, 32,16);




   function moveKey(event) {
    if(event.key === 'd' || event.key === 'D') {
        console.log("ben");
        const rightTile = ben.currentTile.adjacent['right'];
        console.log(rightTile);
        ben.changeTile(rightTile);
        console.log(ben);
        //movePlayerToRightTile(player);
    }
    if(event.key === 'A' || event.key === 'a') {
      console.log("ben");
      const rightTile = ben.currentTile.adjacent['left'];
      console.log(rightTile);
      ben.changeTile(rightTile);
      console.log(ben);
      
  }
    if(event.key === 'q' || event.key === 'Q') {
      console.log("ben");
      const rightTile = ben.currentTile.adjacent['topLeft'];
      console.log(rightTile);
      ben.changeTile(rightTile);
      console.log(ben);
   
   }
   if(event.key === 'E' || event.key === 'e') {
    console.log("ben");
    const rightTile = ben.currentTile.adjacent['topRight'];
    console.log(rightTile);
    ben.changeTile(rightTile);
    console.log(ben);
 
 } 
   if(event.key === 'Z' || event.key === 'z') {
    console.log("ben");
    const rightTile = ben.currentTile.adjacent['bottomLeft'];
    console.log(rightTile);
    ben.changeTile(rightTile);
    console.log(ben);

}
  if(event.key === 'C' || event.key === 'c') {
  console.log("ben");
  const rightTile = ben.currentTile.adjacent['bottomRight'];
  console.log(rightTile);
  ben.changeTile(rightTile);
  console.log(ben);

}

};
