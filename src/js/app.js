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
                url: "/post/:postID",
                templateUrl: "templates/postDetail.html",
                controller: "postDetailCtrl"
            })
            .state('user', {
                url: "/user/:userID",
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
