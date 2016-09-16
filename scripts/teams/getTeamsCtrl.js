var getTeamsApp = angular.module("getTeamsApp",[]);

getTeamsApp.controller('getTeams', function($http, $scope){
  $http.get('http://localhost:3000/api/teams').success(function(data){
    $scope.teams = data;
  });
});
