boardApp.controller('getDraftPicks', function($scope,$http){
  $http.get('http://192.168.15.227:3000/api/draft').success(function(data){
    for(var i =0;i<data.length;i++)
    {
      for(var x = 0; x<data[i].picks.length;x++)
      {
        if(data[i].picks[x].position === null)
        {
          data[i].picks[x].position = "unpicked";
        }
      }
    }
    console.log(data);
    $scope.rounds = data;
  });
});
