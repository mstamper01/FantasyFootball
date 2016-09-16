var DB = require('./playersDB');

var getPlayer = function(id, connection,callback){
    DB.getPlayerFromDB(connection, id, function(results){
      if(results ==="Error Querying Database") throw new err();

      callback(results);
    });
}

var getPlayers = function(connection, callback){
  DB.getPlayersFromDB(connection, function(results){
    if(results ==="Error Querying Database") throw new err();
    callback(results);
  });
}

var addPlayer = function(record, connection, callback){
  DB.addPlayerToDB(connection, record, function(results){
    if(results==="Error Inserting into the Database")
      callback(false);
    else
      callback(true);
  });
}

var updatePlayer = function(record, connection, callback){
  DB.updatePlayerToDB(connection, record, function(results){
    if(results==="Error Updating the Database")
      callback(false);
    else
      callback(true);
  });
}

var deletePlayer = function(id, connection, callback){
  DB.deletePlayerFromDB(connection, id, function(results){
    if(results==="Error Deleting from the Database")
      callback(false);
    else
      callback(true);
  });
}

module.exports.getPlayer = getPlayer;
module.exports.getPlayers = getPlayers;
module.exports.addPlayer = addPlayer;
module.exports.updatePlayer = updatePlayer;
module.exports.deletePlayer = deletePlayer;
