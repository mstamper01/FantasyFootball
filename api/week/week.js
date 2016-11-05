var DB = require('./weekDB');

var addWeek = function(week, connection, callback){
  DB.addWeekToDB(connection, week, function(results){
    if(results === "Error Inserting to the Database") throw new err();
    callback(results);
  });
}

var getWeek = function(team, week, connection, callback){
  DB.getWeekFromDB(connection, team, week, function(results){
    if(results==="Error Querying Database") throw new err();
    callback(results);
  });
}

var updateWeek = function(week, connection, callback){
  DB.updateWeekToDB(connection, week, function(results){
    if(results==="Error Updating Database")
      callback(false);
    else
      callback(true);
  });
}

module.exports.addWeek = addWeek;
module.exports.getWeek = getWeek;
module.exports.updateWeek = updateWeek;
