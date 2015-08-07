var gulp = require("gulp");
var less = require('gulp-less');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task("less", function() {
	gulp.src(["src/less/main.less"])
		.pipe(less())
		.pipe(minifyCss())
		.pipe(gulp.dest("public/styles/"));
	gulp.src(["bower_components/bootstrap/less/bootstrap.less"])
		.pipe(less())
		.pipe(concat("lib.css"))
		.pipe(minifyCss())
		.pipe(gulp.dest("public/styles/"));
});

gulp.task("js", function() {
	gulp.src("src/js/**/*")
		.pipe(concat("main.js"))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest("public/js/"));

	gulp.src(["bower_components/jquery/dist/jquery.min.js", "bower_components/bootstrap/dist/js/bootstrap.min.js", "bower_components/angular/angular.min.js", "bower_components/ui-router/release/angular-ui-router.min.js", "bower_components/underscore/underscore-min.js"])
		.pipe(concat("lib.js"))
		.pipe(gulp.dest("public/js/"));

	gulp.src("bower_components/jquery/dist/jquery.min.map")
		.pipe(gulp.dest("public/js/maps"));
});

gulp.task("html", function() {
	gulp.src(["src/index.html"])
		.pipe(gulp.dest("public/"));
	gulp.src(["src/templates/**/*"])
		.pipe(gulp.dest("public/templates"));
});

gulp.task("img", function() {
	gulp.src(["src/img/**/*"])
		.pipe(gulp.dest("public/img"));
});

gulp.task("fonts", function() {
	gulp.src(["bower_components/bootstrap/dist/fonts/**/*"])
		.pipe(gulp.dest("public/fonts"));
})



//tasks to run when developing
gulp.task("dev", ["less", "js", "html", "img", "fonts"]);

gulp.task("watch", function () {
	gulp.watch(["src/**/*"], ["dev"]);
});

gulp.task("default", ["dev", "watch"]);
