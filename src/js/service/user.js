angular.module("service.user", [])
.service("User", function($http) {
	
	return {
		getUsers: function() {
			console.log("calling all users");
		}
	}
});
