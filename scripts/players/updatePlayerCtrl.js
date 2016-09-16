var updatePlayerApp = angular.module("updatePlayerApp",[]);
updatePlayerApp.controller('updatePlayer',function($scope, $http, $location, $window) {
  $http.get('http://localhost:3000/api/players/' + $location.search().pid).success(function(data){
    $scope.player = data;
    $scope.position = data.position;
    $scope.name = data.name;

    $http.get('http://localhost:3000/api/teams').success(function(data){
      $scope.teams = data;
      $scope.fantTeam = $scope.teams[$scope.player.fant_team - 1];
    });

    $http.get('http://localhost:3000/api/nfl').success(function(data){
      $scope.nfl_teams = [];
      for(var i = 0; i<data.length;i++)
      {
        $scope.nfl_teams.push(data[i].abbreviation);
      }
      $scope.nfl = $scope.player.nfl_team;
    });
  });

  $scope.positions = ['QB','WR','RB','TE','DEF','K'];

  $scope.updatePlayer = function(){
    var newFantTeam;
    if($scope.fantTeam == null)
      newFantTeam = null;
    else
      newFantTeam = $scope.fantTeam.team_id;

    var updateInfo = {
      name : $scope.name,
      position : $scope.position,
      fant_team : newFantTeam,
      nfl_team : $scope.nfl,
      pid : $scope.player.pid
    }

    $http.put('http://localhost:3000/api/players/', updateInfo, []).success(function(){
        window.location.href='/players';
    });
  }
});
