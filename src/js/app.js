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
