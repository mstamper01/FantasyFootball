var needle = require('needle');
var option = {
  json:"true"
}

var get = function(url, callback){
  needle.get(url, function(err, resp){
    if(err)
      throw new err();
    else
      callback(resp.body);
  });
}

var post = function(url, body){
  needle.post(url, body, option, function(err, resp){
    if(err)
      throw new err("Error POSTing");
  });
}

var put = function(url,body){
  needle.put(url, body, option, function(err, resp){
    if(err)
      throw new err("Error PUTting");
  });
}

var del = function(url){
  needle.delete(url, function(err,resp){
    if(err)
      throw new err("Error DELETE-ing");
  });
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = del;
