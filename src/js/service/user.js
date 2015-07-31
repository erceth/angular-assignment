angular.module("service.user", [])
.service("User", function($http) {
	var allUsers = null;
	return {
		getUsers: function(callback) {
			if (allUsers) {
				return ;
			} else {
				//http://jsonplaceholder.typicode.com/users
			}

			console.log("calling all users");
		}
	}
});
