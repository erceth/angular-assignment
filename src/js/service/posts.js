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
