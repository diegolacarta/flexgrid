var gulp = require('gulp');
var stylus = require('gulp-stylus');

/* stylus plugins */
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');

var stylusPlugins = [autoprefixer(), rupture()];

var inject = require("gulp-inject");
var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');


var appFolder = './app';
var scriptsFolder = appFolder + '/scripts';
var scriptsFiles = [scriptsFolder + '*.js', scriptsFolder + '/**/*.js'];
var cssFolder = appFolder + '/styles/css';
var stylesFolder = appFolder + '/styles';
var flexgridFolder = '../stylus';
var flexgridOutputFolder = cssFolder + '/flexgrid';
var viewsFolder = appFolder + '/views';
var index = appFolder + '/views/index.html';

gulp.task('compile-stylus-flexgrid', function () {
  gulp.src(flexgridFolder + '/main.styl')
    .pipe(stylus({
      use: stylusPlugins,
      linenos: true
    }))
    .pipe(gulp.dest(flexgridOutputFolder))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compile-stylus', function () {
  gulp.src(stylesFolder + '/*.styl')
    .pipe(stylus({
      use: stylusPlugins,
      linenos: true
    }))
    .pipe(gulp.dest(cssFolder));
});

gulp.task('inject', function () {
  var target = gulp.src(index);
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([flexgridOutputFolder + '/*.css', cssFolder + '/*.css'].concat(scriptsFiles), {read: false});

  target
      .pipe(inject(sources))
      .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
      .pipe(gulp.dest(viewsFolder));
});

gulp.task('browser-sync', function() {
  browserSync({
    files: cssFolder + '/*.css',
    server: {
      baseDir: './',
      index: index
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Default gulp task to run
gulp.task('default', ['compile-stylus-flexgrid', 'compile-stylus', 'inject', 'browser-sync'], function () {
  gulp.watch([flexgridFolder + '/**/*.styl'], ['compile-stylus-flexgrid']);
  gulp.watch([stylesFolder + '/**/*.styl'], ['compile-stylus']);
  gulp.watch([index, viewsFolder + "/**/*.html"].concat(scriptsFiles), ['bs-reload']);
});
