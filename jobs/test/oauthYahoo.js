var qs = require('qs');
var OAuth = require('OAuth');
var client = "dj0yJmk9dXRYSzQzTzV0b0RPJmQ9WVdrOU0yeERaMHBzTjJFbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0xMQ--";
var secret = "0a7bfa3fbb7f67310d08705d95ff00254db478f7";

function yahooSearch(consumerKey, consumerSecret, query, count,
callback_error_data_response){
 var webSearchUrl = 'http://fantasysports.yahooapis.com/fantasy/v2/player/273.p.5479/stats';

  var finalUrl = webSearchUrl + '?' + qs.stringify({
    q: query,  //search keywords
    format: 'json',
    count: count,
  });

  var oa = new OAuth.OAuth(webSearchUrl, webSearchUrl, consumerKey, consumerSecret, "1.0", null, "HMAC-SHA1");
  oa.setClientOptions({ requestTokenHttpMethod: 'GET' });
  oa.getProtectedResource(finalUrl, "GET", '','', callback_error_data_response);
}

// Use this function to make a call back. Make sure to provide the right key, secret and query for this to work correctly
yahooSearch(client, secret, '', 10, function(error, data, response){
// enter some code here and access the results from the "data" variable in JSON format
  console.log(data);
});
