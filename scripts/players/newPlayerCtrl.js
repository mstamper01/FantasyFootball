var newPlayerApp = angular.module("newPlayerApp",[]);
newPlayerApp.controller('addPlayer', function($scope, $http){
  $http.get('http://localhost:3000/api/teams').success(function(data){
    $scope.teams = data;
  });

  $http.get('http://localhost:3000/api/nfl').success(function(data){
    $scope.nfl_teams = [];
    for(var i = 0; i<data.length;i++)
    {
      $scope.nfl_teams.push(data[i].abbreviation);
    }
    $scope.nfl = $scope.nfl_teams[0];
  });

  $scope.positions = ['QB','WR','RB','TE','DEF','K'];
  $scope.position = $scope.positions[0];

  $scope.insertPlayer = function(){
    var newFantTeam;
    if($scope.fantTeam == null)
      newFantTeam = null;
    else
      newFantTeam = $scope.fantTeam.team_id;

    var newPlayer = {
      name : $scope.name,
      position : $scope.position,
      fant_team : newFantTeam,
      nfl_team : $scope.nfl
    }

    $http.post('http://localhost:3000/api/players/', newPlayer, []).success(function(){
        window.location.href='/players';
    });
  }
});
