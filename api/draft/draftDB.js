var getDraftPicksFromDB = function(connection, callback){
  var queryString = "select team_name, name, round, position, nfl_team, pick FROM draft LEFT JOIN teams ON draft.fant_team = teams.team_id LEFT JOIN players on draft.pid = players.pid;";

  connection.query(queryString, function(err, results){
    if (!err)
      callback(results);
    else
      callback("Error Querying Database");
    });
}

var updateDraftPickToDB = function(connection, record, callback){
  var updateString = "UPDATE draft SET round = " + record.round + ", pid = " + record.pid + ", fant_team = " + record.fant_team + " WHERE pick = " + record.pick + ";";

  connection.query(updateString, function(err, results){
    if (!err)
      callback(results);
    else{
      console.log(err);
      callback("Error Updating Database");
    }
    });
}

var insertDraftPickToDB = function(connection, record, callback){
  var insertString ="INSERT INTO draft SET ?";
    connection.query(insertString, record, function(err, results){
      if(!err)
        callback(results);
      else{
        console.log(err);
        callback("Error Inserting the Database");
      }
    });
}

var deleteDraftPickFromDB = function(connection, id, callback){
  var deleteString = "DELETE FROM draft WHERE pick = " + id;
  connection.query(deleteString, id, function(err, results){
    if(!err)
      callback(results);
    else{
      console.log(err);
      callback("Error Deleting from the Database");
    }
  });
}

module.exports.getDraftPicksFromDB = getDraftPicksFromDB;
module.exports.insertDraftPickToDB = insertDraftPickToDB;
module.exports.updateDraftPickToDB = updateDraftPickToDB;
module.exports.deleteDraftPickFromDB = deleteDraftPickFromDB;
