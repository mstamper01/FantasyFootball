var players = require('./players.js');

players.getPlayers(function(data){
  console.log(data);
});

players.getPlayer(2, function(data){
  console.log(data);
});
