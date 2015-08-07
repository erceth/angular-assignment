angular.module("controller.userDetail", ["service.user", "service.post"])

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
