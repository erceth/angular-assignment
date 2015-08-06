angular.module("app", ["ui.router", "controller.home", "controller.userDetail", "controller.postDetail"])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
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
    .controller("AppCtrl", function($scope) {
    });

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

angular.module("service.comment", ["service.url"])
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

angular.module("service.post", ["service.url"])
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
		}
	}
});

angular.module("service.url", [])
.service("Url", function() {
	var url = "http://jsonplaceholder.typicode.com/";
	return {
		getUrl: function(callback) {
			return url;
		}
	};
});

angular.module("service.user", ["service.url"])
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
                    method: 'GET',
                    url: Url.getUrl() + "users",
                    headers: {
                        "Accept-Language": "en-US"
                    }
                }).then(function(response) {
                	allUsers = response.data;
                	callback(allUsers);
                });
			}
		}
	}
});
