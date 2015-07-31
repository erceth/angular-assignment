angular.module("controller.home", ["service.user", "service.post"])

.controller("homeCtrl", function($scope, Post, User) {
	$scope.home = {};
	Post.getPosts(function(posts) {
		$scope.home.posts = posts;
	});

	$scope.getUserById = function(id) {
		User.getUserById(id);
	};
});
