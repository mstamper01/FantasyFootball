var needle = require('needle');
var options = {
  json:"true"
}

needle.get('http://localhost:3000/api/players',options,function(err,resp){
  if(err)
    console.log(err);
  else {
  //  console.log(resp);
    for(var i = 0; i<resp.body.length;i++)
    {
      resp.body[i].fant_team = null
      needle.put('http://localhost:3000/api/players',resp.body[i], options, null);
    }
  }
});
