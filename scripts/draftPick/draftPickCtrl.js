draftApp.controller('loadPage', function($scope,$http){
  $http.get('http://localhost:3000/api/players/').success(function(data){
      $scope.players = data;
  });

  $http.get('http://localhost:3000/api/draft/').success(function(data){
    $scope.nextPick = getLatestDraft(data);
    $scope.round = $scope.nextPick.round;
    $scope.pick = $scope.nextPick.pick;

    $http.get('http://localhost:3000/api/teams/').success(function(data){
      $scope.teams = data;
      $scope.teams.selectedTeam = getTeam($scope.nextPick.team_name,data);
    });
  });

  $scope.addDraftPick = function()
  {
    var newPick = {
      "pid" : $scope.players.selectedPlayer.pid,
      "pick" : $scope.pick,
      "round" : $scope.round,
      "fant_team" : $scope.teams.selectedTeam.team_id
    }
    $http.put('http://localhost:3000/api/draft', newPick, []);
  }
});

function getTeam(name, teams)
{
  for(var i = 0; i<teams.length; i++)
  {
    if(name == teams[i].team_name)
      return teams[i];
  }
}
function getLatestDraft(data)
{
  for(var i = 0;i<data.length;i++)
  {
    for(var x = 0; x < data[i].picks.length; x++)
    {
      if(data[i].picks[x].name === null)
      {
        return data[i].picks[x];
      }
    }
  }
}
