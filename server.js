var express = require('express');
var app = express();
var http = require('http').Server(app);
var dbConfig = require('config').get('DBConnection');
var mysql = require('mysql');
var draft = require('./api/draft/draft');
var players = require('./api/players/players');
var teams = require('./api/teams/teams');
var nflTeams = require('./api/nflTeams/nflTeams');
var week = require('./api/week/week');
var bodyParser = require('body-parser');

var connection = mysql.createConnection(dbConfig);
connection.connect();

console.log("DB connected");

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/pics", express.static(__dirname + '/pics'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/files", express.static(__dirname + '/files'));
app.use("/pages", express.static(__dirname + '/pages'));
app.use("/semantic", express.static(__dirname + '/semantic'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//WebPages
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/draft', function(req,res){
  res.sendFile(__dirname + '/pages/draftInsert.html');
});
app.get('/players', function(req, res){
  res.sendFile(__dirname + '/pages/players/players.html')
});
app.get('/players/updatePlayer', function(req,res){
  res.sendFile(__dirname + '/pages/players/updatePlayer.html')
});
app.get('/players/addPlayer', function(req,res){
  res.sendFile(__dirname + '/pages/players/newPlayer.html')
});
app.get('/teams', function(req,res){
  res.sendFile(__dirname + '/pages/teams/teams.html')
});
app.get('/teams/updateTeam', function(req,res){
  res.sendFile(__dirname + '/pages/teams/updateTeam.html')
});


//Draft
app.get('/api/draft/', function(req, res){
  try{
    draft.getDraftPicks(connection, function(draftPicks){
      res.json(draftPicks);
    });
  }
  catch(err)
  {
    res.status(500).send("Error calling out to db");
  }
});

app.post('/api/draft/', function(req, res){
    draft.insertDraftPick(req.body, connection, function(status){
      if(status)
        res.sendStatus(200);
      else
        res.status(500).send("Error processing request");
    });
});

app.put('/api/draft/', function(req,res){
  draft.updateDraftPick(req.body, connection, function(status){
    if(status)
      res.sendStatus(200);
    else
      res.status(500).send("Error processing request");
  });
});

app.delete('/api/draft/:pick', function(req, res){
  draft.deleteDraftPick(req.params.pick,connection,function(status){
    if(status)
      res.sendStatus(200);
    else
      res.status(500).send("Error processing request");
  });
});

//Players
app.get('/api/players/:id', function(req, res){
  try{
    players.getPlayer(req.params.id, connection, function(player){
      res.json(player);
    });
  }
  catch(err)
  {
    console.log(err);
    res.status(500).send("Error calling out to db");
  }
});

app.get('/api/players', function(req,res){
  players.getPlayers(connection, function(players){
    res.json(players);
  });
});

app.post('/api/players', function(req,res){
  players.addPlayer(req.body, connection, function(status){
    if(status)
      res.sendStatus(200);
    else
      res.status(500).send("Error processing request");
  });
});

app.put('/api/players', function(req,res){
  players.updatePlayer(req.body, connection, function(status){
    if(status)
      res.sendStatus(200);
    else
      res.status(500).send("Error processing request");
  });
});

app.delete('/api/players/:id', function(req,res){
  players.deletePlayer(req.params.id, connection, function(status){
    if(status)
      res.sendStatus(200);
    else
      res.status(500).send("Error processing request");
  });
});

//teams
app.get('/api/teams/:id', function(req, res){
  try{
    teams.getTeam(req.params.id, connection, function(team){
      res.json(team);
    });
  }
  catch(err)
  {
    res.status(500).send("Error calling out to db");
  }
});

app.get('/api/teams/', function(req,res){
  teams.getTeams(connection, function(players){
    res.json(players);
  });
});

app.put('/api/teams/', function(req, res){
  teams.updateTeam(req.body, connection, function(status){
    if(status)
      res.sendStatus(200);
    else
      res.status(500).send("Error processing request");
  });
});

//nflTeams
app.get('/api/nfl/', function(req, res){
  try{
      nflTeams.getNFLTeams(connection, function(nflTeams){
          res.json(nflTeams);
      });
  }
  catch(err)
  {
    console.log(err);
    res.status(500).send("Error processing request");
  }
});

//Weeks
app.get('/api/week/:fant_team/:week', function(req, res){
  try{
    week.getWeek(req.params.fant_team, req.params.week, connection, function(week){
        res.json(week);
    });
  }
  catch(err)
  {
    console.log(err);
    res.status(500).send("Error processing request");
  }
});
app.put('/api/week/', function(req, res){
  week.updateWeek(req.body, connection, function(status){
    if(status)
      res.sendStatus(200);
    else
      res.status(500).send("Error updating request")
  });
});
app.post('/api/week/', function(req, res){
  try{
      week.addWeek(req.body, connection, function(results){
        res.sendStatus(200);
      });
  }
  catch(err)
  {
    console.log(err);
    res.status(500).send("Error processing request");
  }
});
