angular.module("app")
.service("Url", function() {
	var url = "http://jsonplaceholder.typicode.com/";
	return {
		getUrl: function(callback) {
			return url;
		}
	};
});
