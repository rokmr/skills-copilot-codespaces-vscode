function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'templates/member.html',
        scope: {
            member: '='
        },
        controller: function($scope) {
            $scope.skills = $scope.member.skills;
        }
    };
}