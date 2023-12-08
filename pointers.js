var mymap= window.tiles;


function createTilePointers(tileList) {
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
    });
  
    // log each tile and its adjacent tiles for debugging
    // tileList.forEach(tile => {
    //     console.log(`Tile at (${tile.coords.join(', ')}): Adjacent tiles:`);
    //     Object.entries(tile.adjacent).forEach(([direction, adj]) => {
    //         console.log(`  Direction ${direction}: Tile at (${adj.coords.join(', ')})`);
    //     });
    // });
  }
  
    
    
  createTilePointers(mymap.tileList, 32,16);