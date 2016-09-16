var api = require("./apiHelper.js");
var playersUrl = "http://localhost:3000/api/players/";

var getPlayers = function(callback){
  api.get(playersUrl, function(data){
    callback(data);
  })
}

var getPlayer = function(id, callback){
  api.get(playersUrl+id, function(data){
    callback(data);
  });
}

module.exports.getPlayers = getPlayers;
module.exports.getPlayer = getPlayer;
