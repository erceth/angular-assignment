angular.module("controller.userDetail", ["service.user", "service.post"])

.controller("userDetailCtrl", function($scope, $stateParams, User, Post) {
	$scope.userDetail = {};
	User.getUsers(function(allUsers) {
		$scope.userDetail.user = _.find(allUsers, function(u) {
			return u.id === parseInt($stateParams.userId, 10);
		});
	});
	Post.getPosts(function(allPosts) {
		$scope.userDetail.posts = allPosts.filter(function(p) {
			return p.userId === parseInt($stateParams.userId, 10);
		});
	})
});
