var updateTeamApp = angular.module("updateTeamApp",[]);

updateTeamApp.controller('editTeam', function($http, $scope, $location) {
  //console.log($location.search().id);
  $http.get('http://localhost:3000/api/teams/'+ $location.search().id).success(function(data){
    $scope.name = data.team_name;
    $scope.manager = data.team_manager;
    $scope.slogan = data.team_slogan;
    $scope.id = data.team_id;
  });

  $scope.updateTeam = function(){
    var updateTeam = {
      team_id : $scope.id,
      team_name : $scope.name,
      team_manager: $scope.manager,
      team_slogan : $scope.slogan,
      pic : null
    }
    console.log(JSON.stringify(updateTeam));
    $http.put('http://localhost:3000/api/teams',updateTeam,[]).success(function(){
      alert("Player updated!");
      window.location.href='/teams/';
    });
  }
});
