var getWeekFromDB = function(connection, team,week, callback){
  var queryString = "SELECT * FROM fant_week WHERE fant_team=? AND week=?";
  connection.query(queryString,[team,week],function(err,results){
    if(!err)
      callback(results[0]);
    else {
      console.log(err);
      callback("Error Querying Database");
    }
  });
}

var addWeekToDB = function(connection, weekToInsert, callback){
  var queryString = "INSERT INTO fant_week SET ?";
  connection.query(queryString, weekToInsert, function(err,results){
    if(!err)
      callback(results);
    else {
      console.log(err);
      callback("Error Inserting to the Database");
    }
  });
}

var updateWeekToDB = function(connection, week, callback){
  var updateString = "UPDATE fant_week SET data = ? WHERE fant_team=? AND week = ?";
  connection.query(updateString,[week.data,week.fant_team,week.week], function(err,results){
    if(!err)
      callback(results);
    else {
      console.log(err);
      callback("Error Updating Database");
    }
  });
}

module.exports.getWeekFromDB = getWeekFromDB;
module.exports.addWeekToDB = addWeekToDB;
module.exports.updateWeekToDB = updateWeekToDB;
