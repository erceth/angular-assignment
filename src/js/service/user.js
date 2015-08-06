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
