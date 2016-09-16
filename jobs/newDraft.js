var needle = require('needle');
var options = {
  json :"true"
}

var rounds = 16;
var picks = 10;
var pickOrder = [6,9,1,4,3,2,5,10,7,8];

for(var i = 0; i < rounds; i++)
{
  for(var x = 1; x <= picks; x++)
  {
    var team;

    if(i%2 === 0)
      team = pickOrder[x-1];
    else
      team = pickOrder[10-x];

    var pick = {
      "round" : i+1,
      "pick" : (i*10)+x,
      "pid" : null,
      "fant_team":team
    };
    //console.log(pick);
    //reset_pick(pick);
  }
}

function reset_pick(pick){
  needle.delete('http://localhost:3000/api/draft/'+pick.pick,null,options,function(err, resp){
    if(err)
      console.log(err);
    else
        console.log("Delete: " + resp.body);

    needle.post('http://localhost:3000/api/draft/', pick, options, function(err, resp){
      console.log("Insert: " + resp.body);
    });
  });
}
