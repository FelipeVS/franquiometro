var gulp = require('gulp');
var sass = require('gulp-sass');
var ngConstant = require('gulp-ng-constant');

var scss_input = './public/styles/src/*.scss';
var css_output = './public/styles/';
var environment_configfile = './public/config.json';
var constants_output = './public/app/core/';

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

gulp.task('build', function(cb) {

});

gulp.task('sass', function() {
  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src(scss_input)
    // Run Sass on those files
    .pipe(sass())
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(css_output));
});

gulp.task('watch', function() {
  console.log('Watching ' + scss_input);
  return gulp
    // Watch the input folder for change
    .watch(scss_input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
