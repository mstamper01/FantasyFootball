var DB = require('./teamsDB');
var playersDB = require('../players/playersDB.js');

var getTeam = function(id, connection,callback){
    DB.getTeamFromDB(connection, id, function(team){
      if(team ==="Error Querying Database") throw new err();
      playersDB.getPlayersByTeamFromDB(connection, id, function(results){
          team.players = [];
          for(var i =0;i<results.length;i++)
          {
            team.players.push({
              pid: results[i].pid,
              url: "http://localhost:3000/api/players/" + results[i].pid
            });
          }
          callback(team);
      });
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
