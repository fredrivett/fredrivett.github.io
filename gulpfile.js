// Info: http://www.sitepoint.com/simple-gulpy-workflow-sass/

var gulp = require('gulp');
    sass = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    sassdoc = require('sassdoc'),
    runSequence = require('run-sequence');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 1%', 'Firefox ESR', 'Opera 12.1']
};




gulp.task('default', function(done) {
  runSequence(['sass', 'js'], done);
});

gulp.task('watch', ['default'], function() {
  return gulp
    .watch('assets/scss/**/*', ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});





gulp.task('js', function() {
  gulp.src('assets/js/*')
      .pipe(gulp.dest('source/js/'));
});

gulp.task('sass', function () {
  return gulp
    .src('assets/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('source/css/'));
    // .pipe(sassdoc())
    // // Release the pressure back and trigger flowing mode (drain)
    // // See: http://sassdoc.com/gulp/#drain-event
    // .resume();
});
