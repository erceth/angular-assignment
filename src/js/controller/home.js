angular.module("app")

.controller("homeCtrl", function($scope, Post, User) {
	$scope.home = {};
	$scope.$emit("loading", true);
	Post.getPosts(function(posts) {
		User.getUsers(function(users) {
			_.each(posts, function(p) {
				p.user = _.find(users, function(u) {
					return u.id === p.userId;
				});
			});
			$scope.home.posts = posts;
			$scope.$emit("loading", false);
		});
	});

	$scope.likePost = function(post) {
		post.liked = true;
		Post.likedPost(post.id);
	};

	$scope.unlikePost = function(post) {
		post.liked = false;
		Post.unlikedPost(post.id);
	};

});
