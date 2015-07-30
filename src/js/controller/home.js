angular.module("controller.home", ["service.user"])

.controller("homeCtrl", function($scope, User) {
	$scope.home = "no place like it!";
	User.getUsers();
});