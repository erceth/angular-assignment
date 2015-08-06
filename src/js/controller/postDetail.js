angular.module("controller.postDetail", ["service.post", "service.user", "service.comment"])

.controller("postDetailCtrl", function($scope, $stateParams, Post, User, Comment) {
	$scope.postDetail = {};
	Post.getPosts(function(allPosts) {
		$scope.postDetail.post = _.find(allPosts, function(p) {
			return p.id === parseInt($stateParams.postId, 10);
		});
		User.getUsers(function(allUsers) {
			$scope.postDetail.post.user = _.find(allUsers, function(u) {
				return u.id === $scope.postDetail.post.userId;
			});
		});
	});
	Comment.getComments(function(allComments) {
		$scope.postDetail.comments = allComments.filter(function(c) {
			return c.postId === parseInt($stateParams.postId, 10);
		});
	});
	console.log($stateParams);
});
