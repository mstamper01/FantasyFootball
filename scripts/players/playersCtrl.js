playersApp.controller('getPlayers',function($scope, $http) {
  $http.get('http://localhost:3000/api/players').success(function(data){
    $scope.players = data;
  });
  $http.get('http://localhost:3000/api/teams').success(function(data){
    $scope.teams = data;
  });

  $scope.deletePlayer = function(player){
    console.log(player);
    if(confirm("Are you sure you want to delete " + player.name + "?"))
    {
      $http.delete('http://localhost:3000/api/players/'+player.pid,[]);
    }
  }
});
