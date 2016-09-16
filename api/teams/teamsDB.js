var getTeamFromDB = function (connection, id, callback){
  var queryString = "SELECT * FROM teams WHERE team_id = ?;";
  connection.query(queryString, id, function(err, results){
    if (!err)
      callback(results[0]);
    else{
      console.log(err);
      callback("Error Querying Database");
    }
  });
}

var getTeamsFromDB = function(connection, callback){
  var queryString = "SELECT * FROM teams;"
  connection.query(queryString, function(err, results){
    if (!err)
      callback(results);
    else{
      console.log(err);
      callback("Error Querying Database");
    }
  });
}

var updateTeamToDB = function(connection, record, callback){
  var queryString = "UPDATE teams SET team_name = ? , team_manager = ? , team_slogan = ? , pic = ? WHERE team_id = ? ;";
  connection.query(queryString,[record.team_name, record.team_manager, record.team_slogan, record.pic, record.team_id], function(err,results){
    if (!err)
      callback(results);
    else{
      console.log(err);
      callback("Error Updating Database");
    }
  });
}

module.exports.getTeamFromDB = getTeamFromDB;
module.exports.getTeamsFromDB = getTeamsFromDB;
module.exports.updateTeamToDB = updateTeamToDB;
