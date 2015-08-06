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
