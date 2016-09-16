var getNFLTeamsFromDB = function(connection, callback){
  var queryString = "SELECT * FROM nfl_team;"
  connection.query(queryString, function(err,results){
    if(!err){
      callback(results);
    }
    else {
      console.log(err);
      callback("Error Querying Database");
    }
  });
}

module.exports.getNFLTeamsFromDB = getNFLTeamsFromDB;
