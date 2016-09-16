var DB = require('./draftDB');
var getDraftPicks = function(connection, callback){

  //calling database
  var response = DB.getDraftPicksFromDB(connection, function(results){
    if(results ==="Error Querying Database") throw new err();

    callback(formatDraftPicks(results));
  });
}

var insertDraftPick = function(record,connection, callback){
  var response = DB.insertDraftPickToDB(connection,record, function(results){
    if(results === "Error Inserting the Database"){
      callback(false);
    }
    else{
      callback(true);
    }
  });
}

var updateDraftPick = function(record, connection, callback){
  var response = DB.updateDraftPickToDB(connection, record, function(results){
    if(results === "Error Updating Database"){
      callback(false);
    }
    else{
        callback(true);
    }
  });
}

var deleteDraftPick = function(pick, connection, callback){
  var response = DB.deleteDraftPickFromDB(connection, pick, function(results){
    if(results === "Error Deleting from the Database"){
      callback(false);
    }
    else{
        callback(true);
    }
  });
}

function formatDraftPicks(draftPicks){
    var rounds = 16;
    var picks = 10;

    var response = [];
    for(var i = 0; i< rounds;i++)
    {
      response[i] = new Object();
      response[i].round = i+1;
      response[i].picks = [];
      for(var x = 1; x<=picks;x++)
      {
        response[i].picks[x-1] = new Object();
        response[i].picks[x-1] = draftPicks[((i*10)+x)-1];
      }
    }
    return response;
}

module.exports.getDraftPicks = getDraftPicks;
module.exports.insertDraftPick = insertDraftPick;
module.exports.updateDraftPick = updateDraftPick;
module.exports.deleteDraftPick = deleteDraftPick;
