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
