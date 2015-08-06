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
