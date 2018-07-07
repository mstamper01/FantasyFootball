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

getPlayersByTeamFromDB = function(connection, id, callback){
  var queryString = "SELECT pid FROM team_player WHERE team_id=?;";
  connection.query(queryString,[id], function(err,results){
    if(!err)
      callback(results)
    else{
      console.log(err);
      callback("Error Querying Database");
    }
  });
}
getTeamOfPlayer = function(connection, id, callback){
  var queryString = "SELECT team_id FROM team_player WHERE pid=?";
  connection.query(queryString,[id], function(err, results){
    if(!err)
    {
      callback(results)
    }
    else{
      console.log(err);
      callback("Error getting query");
    }
  });
}

var addPlayerToDB = function(connection, record, callback){
  var queryString= "INSERT INTO players (name, position, nfl_team) VALUES (?,?,?)";

  connection.query(queryString, [record.name, record.position, record.nfl_team], function(err, results){
    if (!err)
      callback(results);
      if(!isNaN(record.fant_team))
      {
          addPlayerTeamToDB(connection, record.name, record.fant_team);
      }
    else{
        console.log(err);
        callback("Error Inserting into the Database");
    }
  });
}

var addPlayerTeamToDB = function(connection, name, team)
{
  var queryString = "INSERT INTO team_player (team_id, pid) VALUES (?,?)";
  getPlayerIDByName(connection, name, function(id){
    console.log("PLayer id: " + id);
    connection.query(queryString, [team, id], function(err, results){
      if (err)
      {
          console.log(err);
      }
    });
  });
}

var updatePlayerTeamToDB = function(connection, name, team)
{
  var queryString = "UPDATE team_player SET team_id = ? WHERE pid=?";
  console.log("SHOULD BE UPDATING!");
    getPlayerIDByName(connection, name, function(id){
        hasTeam(connection, id, function(flag){
          if(!flag){
              console.log("SHOULD BE NOPE!");
              console.log(queryString);
            connection.query(queryString, [team, id], function(err, results){
              if(err)
                console.log(err);
            });
          }
        });
      });
}
var getPlayerIDByName = function(connection, name, callback)
{
  var queryString = "SELECT pid from players WHERE name = ?";
  connection.query(queryString, [name], function(err, results){
    if(!err)
    {
      callback(results[0].pid);
    }
    else{
      console.log(err);
      callback("Error Querying Database");
    }
  });
}

var updatePlayerToDB = function(connection, record, callback){
  var queryString = "UPDATE players SET name = ?, position = ?, nfl_team = ? WHERE pid = ?";

  connection.query(queryString, [record.name, record.position, record.nfl_team, record.pid], function(err, results){
    if (!err)
      callback(results);
      if(!isNaN(record.fant_team))
      {
          updatePlayerTeamToDB(connection, record.name, record.fant_team);
      }
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

var hasTeam = function(connection, id, callback){
  getTeamOfPlayer(connection, id, function(results){
    if(results=="Error getting query")
      callback(false);
    if(results.length != 0){
      console.log("HAS TEAM!");
      callback(true);
    }
    callback(false);
  });
}

module.exports.getPlayerFromDB = getPlayerFromDB;
module.exports.getPlayersFromDB = getPlayersFromDB;
module.exports.addPlayerToDB = addPlayerToDB;
module.exports.updatePlayerToDB = updatePlayerToDB;
module.exports.deletePlayerFromDB = deletePlayerFromDB;
module.exports.getPlayersByTeamFromDB = getPlayersByTeamFromDB;
