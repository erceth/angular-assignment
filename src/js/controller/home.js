angular.module("controller.home", ["service.user", "service.post"])

.controller("homeCtrl", function($scope, Post, User) {
	$scope.home = {};
	Post.getPosts(function(posts) {
		User.getUsers(function(users) {
			_.each(posts, function(p) {
				p.user = _.find(users, function(u) {
					return u.id === p.userId;
				});
			});
			$scope.home.posts = posts;			
		});
	});

	$scope.likePost = function(post) {
		post.liked = true;
		//TODO: pass liked status to posts service
	};

	// var user = {
	//     "userId": 1,
	//     "id": 1,
	//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
	//     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
	//   };

	//   $scope.getUserById(user);
});
