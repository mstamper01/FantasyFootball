var DB = require('./teamsDB');

var getTeam = function(id, connection,callback){
    DB.getTeamFromDB(connection, id, function(results){
      if(results ==="Error Querying Database") throw new err();
      callback(results);
    });
}

var getTeams = function(connection, callback){
  DB.getTeamsFromDB(connection,function(results){
    if(results === "Error Querying Database") throw new err();
    else
      callback(results);
  });
}

var updateTeam = function(record, connection, callback){
  DB.updateTeamToDB(connection, record, function(results){
    if(results === "Error Updating Database")
      callback(false);
    else
      callback(true);
  });
}

module.exports.getTeam = getTeam;
module.exports.getTeams = getTeams;
module.exports.updateTeam = updateTeam;
