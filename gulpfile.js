//
// myapp
//

const del = require('del');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const order = require('gulp-order');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const jasmine = require('gulp-jasmine');

var targetName = 'jaconv';

var src = `src`;
var lib = `lib`;

var mainTsSrc = [ `${src}/main/ts/**/*.ts` ];
var testTsSrc = [ `${src}/test/ts/**/*.ts` ];

var mainTsProject = ts.createProject({
  noImplicitAny : true,
  declaration : true,
  outFile : `${targetName}.js`
});

var testTsProject = ts.createProject({
  noImplicitAny : true,
  declaration : false,
  outFile : `${targetName}.spec.js`
});

gulp.task('clean', function() {
  return del([ lib ]);
});

gulp.task('build-main', function() {
  return gulp.src(mainTsSrc)
    .pipe(plumber({
      errorHandler : notify.onError({
        title : 'error in <%= error.plugin %>',
        message : '<%= error.message %>'
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(mainTsProject() )
    .pipe(sourcemaps.write('.') )
    .pipe(gulp.dest(lib) );
});

gulp.task('build-test', function() {
  return gulp.src(testTsSrc)
    .pipe(plumber({
      errorHandler : notify.onError({
        title : 'error in <%= error.plugin %>',
        message : '<%= error.message %>'
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(testTsProject() )
    .pipe(sourcemaps.write('.') )
    .pipe(gulp.dest(lib) );
});

gulp.task('build', gulp.series('build-main', 'build-test') );

gulp.task('jasmine', gulp.series('build', function() {
  return gulp.src(`${lib}/${targetName}.spec.js`)
    .pipe(jasmine() );
}) );

gulp.task('compress', gulp.series('jasmine', function () {
  return gulp.src(`${lib}/${targetName}.js`)
    .pipe(uglify({ output : { ascii_only : true } }) )
    .pipe(rename({ suffix: '.min' }) )
    .pipe(gulp.dest(lib) );
}) );

gulp.task('watch', gulp.series('jasmine', function() {
  gulp.watch(mainTsSrc.concat(testTsSrc),
      gulp.series('jasmine') ).on('change', function(path) {
    console.log(path);
  });
}) );

gulp.task('default', gulp.series('compress') );
