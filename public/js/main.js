angular.module("app", ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "templates/home.html",
                controller: "homeCtrl"
            })
            .state('post', {
                url: "/post/:postId",
                templateUrl: "templates/postDetail.html",
                controller: "postDetailCtrl"
            })
            .state('user', {
                url: "/user/:userId",
                templateUrl: "templates/userDetail.html",
                controller: "userDetailCtrl"
            });

   //          $locationProvider.html5Mode({
			//     enabled: true,
			//     requireBase: false
			// });
    })
    .controller("AppCtrl", function AppCtrl ($scope) {
    	$scope.app = {};
    	$scope.$on("loading", function(event, data) {
	        $scope.app.loading = data;
	    });
    });

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

angular.module("app")

.controller("postDetailCtrl", function($scope, $stateParams, Post, User, Comment) {
	$scope.postDetail = {};
	$scope.$emit("loading", true);
	Post.getPosts(function(allPosts) {
		$scope.postDetail.post = _.find(allPosts, function(p) {
			return p.id === parseInt($stateParams.postId, 10);
		});
		User.getUsers(function(allUsers) {
			$scope.postDetail.post.user = _.find(allUsers, function(u) {
				return u.id === $scope.postDetail.post.userId;
			});
		});
		$scope.$emit("loading", false);
	});
	Comment.getComments(function(allComments) {
		$scope.postDetail.comments = allComments.filter(function(c) {
			return c.postId === parseInt($stateParams.postId, 10);
		});
	});
});

angular.module("app")

.controller("userDetailCtrl", function($scope, $stateParams, User, Post) {
	$scope.userDetail = {};
	$scope.$emit("loading", true);
	var userCallDone = false;
	User.getUsers(function(allUsers) {
		$scope.userDetail.user = angular.copy(_.find(allUsers, function(u) {
			return u.id === parseInt($stateParams.userId, 10);
		}));
		userCallDone = true;
		stopLoadingScreen();
	});

	var postCallDone = false;
	Post.getPosts(function(allPosts) {
		$scope.userDetail.posts = allPosts.filter(function(p) {
			return p.userId === parseInt($stateParams.userId, 10);
		});
		postCallDone = true;
		stopLoadingScreen();
	})

	function stopLoadingScreen() {
		if (userCallDone && postCallDone) {
			$scope.$emit("loading", false);
		}
	}

	$scope.saveUser = function() {
		$scope.$emit("loading", true);
		User.saveUser($scope.userDetail.user, function() {
			$scope.userDetail.edit = false;
			$scope.$emit("loading", false);
			$scope.userDetail.checkConsoleMessage = true;
		});
	};
});

angular.module("app")
.service("Comment", function($http, Url) {
	var allComment = null;
	return {
		/*
		retrieves all comments from api
		callback parameter is a function that getComments calls to return comments
		*/
		getComments: function(callback) {
			if (allComment) {
				callback(allComment);
			} else {
				$http({
                    method: 'GET',
                    url: Url.getUrl() + "comments",
                    headers: {
                        "Accept-Language": "en-US"
                    }
                }).then(function(response) {
                	allComment = response.data;
                	callback(allComment);
                });
			}
		}
	}
});

angular.module("app")
.service("Post", function($http, Url) {
	var allPosts = null;
	return {
		/*
		retrieves all posts from api
		callback parameter is a function that getPosts calls to return posts
		*/
		getPosts: function(callback) {
			if (allPosts) {
				callback(allPosts);
			} else {
				$http({
                    method: 'GET',
                    url: Url.getUrl() + "posts",
                    headers: {
                        "Accept-Language": "en-US"
                    }
                }).then(function(response) {
                	allPosts = response.data;
                	callback(allPosts);
                });
			}
		},
		likedPost: function(postId) {
			var post = _.find(allPosts, function(p) {
				return p.id === postId;
			});
			post.liked = true;
		},
		unlikedPost: function(postId) {
			var post = _.find(allPosts, function(p) {
				return p.id === postId;
			});
			post.liked = false;
		}
	}
});

angular.module("app")
.service("Url", function() {
	var url = "http://jsonplaceholder.typicode.com/";
	return {
		getUrl: function(callback) {
			return url;
		}
	};
});

angular.module("app")
.service("User", function($http, Url) {
	var allUsers = null;
	return {
		/*
		retrieves all users from api
		callback parameter is a function that getUsers calls to return users
		*/
		getUsers: function(callback) {
			if (allUsers) {
				callback(allUsers);
			} else {
				$http({
                    method: "GET",
                    url: Url.getUrl() + "users",
                    headers: {
                        "Accept-Language": "en-US"
                    }
                }).then(function(response) {
                	allUsers = response.data;
                	callback(allUsers);
                });
			}
		},
		saveUser: function(user, callback) {
			var foundUser = _.find(allUsers, function(u) {
				return u.id === user.id;
			});
			foundUser.name = user.name;
			foundUser.username = user.username;
			$http({
				method: "PUT",
				url: Url.getUrl() + "users/" + user.id,
				data: user
			}).then(function(response) {
				console.log("Save User:", response);
				callback();
			});
		}
	}
});
