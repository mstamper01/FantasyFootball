var getPlayerFromDB = function (connection, id, callback){
  var queryString = "SELECT * FROM players WHERE pid = " + id + ";";

  connection.query(queryString, function(err, results){
    if (!err)
      callback(results[0]);
    else{
      console.log(err);
      callback("Error Querying Database");
    }
  });
}

var getPlayersFromDB = function(connection, callback){
  var queryString="SELECT * FROM players";

  connection.query(queryString, function(err, results){
    if (!err)
      callback(results);
    else{
        console.log(err);
        callback("Error Querying Database");
    }
  });
}

var addPlayerToDB = function(connection, record, callback){
  var queryString= "INSERT INTO players (name, position, nfl_team, fant_team) VALUES (?,?,?,?)";

  connection.query(queryString, [record.name, record.position, record.nfl_team, record.fant_team], function(err, results){
    if (!err)
      callback(results);
    else{
        console.log(err);
        callback("Error Inserting into the Database");
    }
  });
}

var updatePlayerToDB = function(connection, record, callback){
  var queryString = "UPDATE players SET name = ?, position = ?, nfl_team = ?, fant_team = ? WHERE pid = ?";

  connection.query(queryString, [record.name, record.position, record.nfl_team, record.fant_team, record.pid], function(err, results){
    if (!err)
      callback(results);
    else{
      console.log(err);
      callback("Error Updating the Database");
    }
  });
}

var deletePlayerFromDB = function(connection, id, callback){
  var queryString = "DELETE FROM players WHERE pid = ?";

  connection.query(queryString, id, function(err, results){
    if (!err)
      callback(results);
    else{
      console.log(err);
      callback("Error Deleting from the Database");
    }
  });
}

module.exports.getPlayerFromDB = getPlayerFromDB;
module.exports.getPlayersFromDB = getPlayersFromDB;
module.exports.addPlayerToDB = addPlayerToDB;
module.exports.updatePlayerToDB = updatePlayerToDB;
module.exports.deletePlayerFromDB = deletePlayerFromDB;
