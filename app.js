const staticServer = require('node-static');
const http = require('http');
const port = 25565;

var file = new(staticServer.Server)();

// Static server
var httpServer = http.createServer(function (req, res) {
  file.serve(req, res);
});

const io = require('socket.io')(httpServer);
io.on('connection', function(client) {
    console.log(`Connection to client ${client.id} established`);
    
    client.on('disconnect', function() {
        console.log(`Client ${client.id} has disconnected`);
    });
    
    client.on("inventory_updated", function(itemType, itemKey, item) {
    	client.broadcast.emit("inventory_updated", itemType, itemKey, item);
    	console.log(`${itemKey} was updated!`);
    });
    
    client.on("dungeon_shuffle_updated", function(dungeon, newDungeon) {
    	client.broadcast.emit("dungeon_shuffle_updated", dungeon, newDungeon);
    	console.log(`${dungeon} was updated to lead to ${newDungeon}!`);
    });
    
    client.on("item_location_updated", function(itemLocation) {
    	client.broadcast.emit("item_location_updated", itemLocation);
    	console.log(`${itemLocation.Name} was updated at ${itemLocation.Map}!`);
    });

    client.on("spawn_location_updated", function(randomizedSpawnLocations) {
    	client.broadcast.emit("spawn_location_updated", randomizedSpawnLocations);
    	console.log(`Randomized spawn locations were updated!`);
    });

    client.on("sync_all_item_locations", function(itemLocations) {
    	client.broadcast.emit("sync_all_item_locations", itemLocations);
    	console.log("Syncing all item locations...");
    });
});

httpServer.listen(port, function (err) {
  if (err) throw err
  console.log('listening on port ' + port);
});
