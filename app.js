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

    client.on("sync_settings", function(settings) {
      client.broadcast.emit("sync_settings", settings);
      console.log("Syncing all given settings...");
    });

    client.on("sync_all_dungeon_types", function(dungeons) {
      client.broadcast.emit("sync_all_dungeon_types", dungeons);
      console.log("Syncing all dungeon types...")
    });

    client.on("sync_dungeon_type", function(dungeonName, dungeonType) {
      client.broadcast.emit("sync_dungeon_type", dungeonName, dungeonType);
      console.log(`Setting ${dungeonName} to be type ${dungeonType}.`);
    });

    client.on("current_location_changed", function(locationName) {
      client.broadcast.emit("current_location_changed", locationName);
      console.log(`Sending location change: ${locationName}`);
    });
});

httpServer.listen(port, function (err) {
  if (err) throw err
  console.log('listening on port ' + port);
});
