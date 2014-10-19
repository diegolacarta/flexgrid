// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');

/* stylus plugins */
var jeet = require('jeet');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');


var stylusPlugins = [autoprefixer(), rupture(), jeet()];

var inject = require("gulp-inject");
var browserSync = require('browser-sync');


// Get one .styl file and render
gulp.task('compile-stylus', function () {
  gulp.src('./demo/demo.styl')
    .pipe(stylus({
      use: stylusPlugins,
      linenos: true
    }))
    .pipe(gulp.dest('./demo/css'));

  gulp.src('./stylus/main.styl')
    .pipe(stylus({
      use: stylusPlugins,
      linenos: true
    }))
    .pipe(gulp.dest('./demo/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('inject-css', function () {
  var target = gulp.src('./demo/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./src/**/*.js', './demo/**/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./demo/'));
});

gulp.task('browser-sync', function() {
  browserSync({
    files: "demo/css/*.css",
    server: {
      baseDir: "./",
      index: "demo/index.html"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Default gulp task to run
gulp.task('default', ['compile-stylus', 'inject-css', 'browser-sync'], function () {
  gulp.watch(["./**/*.styl"], ['compile-stylus']);
  gulp.watch("./demo/index.html", ['bs-reload']);
});