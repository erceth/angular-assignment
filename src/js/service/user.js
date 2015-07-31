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
