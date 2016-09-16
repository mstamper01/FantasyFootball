var DB = require('./nflTeamsDB');

var getNFLTeams = function(connection, callback){
  DB.getNFLTeamsFromDB(connection, function(results){
    if(results==="Error Querying Database") throw new err();
    callback(results);
  });
}

module.exports.getNFLTeams = getNFLTeams;
