var gulp = require('gulp');
var sass = require('gulp-sass');
var ngConstant = require('gulp-ng-constant');
var exec = require('gulp-exec');

var scss_input = './public/styles/src/*.scss';
var css_output = './public/styles/';
var environment_configfile = './public/config.json';
var constants_output = './public/app/core/';


gulp.task('build', ['constants', 'sass'], function(cb) {
  console.log('Build finished');
});

gulp.task('serve', ['watch'], function(cb) {
  console.log('Running server');
  exec('node app', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('constants', function () {
  var myConfig = require(environment_configfile);
  var envConfig = myConfig[process.env.NODE_ENV];
  return ngConstant({
    name: 'app.core',
    stream: true,
    constants: envConfig,
    templatePath: './public/constant.tpl.ejs'
  })
  .pipe(gulp.dest(constants_output));
});

gulp.task('sass', function() {
  return gulp
    .src(scss_input)
    .pipe(sass())
    .pipe(gulp.dest(css_output));
});

gulp.task('watch', function() {
  console.log('Watching ' + scss_input);
  return gulp
    .watch(scss_input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
