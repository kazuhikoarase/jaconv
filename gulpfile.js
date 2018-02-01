
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const ts = require('gulp-typescript');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jasmine = require('gulp-jasmine');

var targetName = 'jaconv';

var tsSrc = [
  'src/main/ts/**/*.ts',
  'src/test/ts/**/*.ts'
];
var tsProject = ts.createProject({
  noImplicitAny: true,
  sourceMap: false,
  declaration: true
});

gulp.task('clean', function() {
  return del([ 'build/ts', 'lib/*' ]);
});

gulp.task('build', function() {
  return gulp.src(tsSrc)
    .pipe(tsProject() )
    .pipe(gulp.dest('build/ts/') );
});

gulp.task('watch', function(){
  gulp.watch(tsSrc, ['concat-main']).on('change', function(event) {
    console.log(event.path + ' [' + event.type + ']');
  });
});

gulp.task('concat-main', ['build'], function() {
  return gulp.src([ 'build/ts/**/*.js', '!build/ts/**/*.spec.js' ])
    .pipe(concat(targetName + '.js') )
    .pipe(gulp.dest('lib/') );
});

gulp.task('concat-main.d', ['build'], function() {
  return gulp.src([ 'build/ts/**/*.d.ts', '!build/ts/**/*.spec.d.ts' ])
    .pipe(concat(targetName + '.d.ts') )
    .pipe(gulp.dest('lib/') );
});

gulp.task('concat-test', ['build'], function() {
  return gulp.src([ 'build/ts/**/*.spec.js' ])
    .pipe(concat(targetName + '.spec.js') )
    .pipe(gulp.dest('lib/') );
});

gulp.task('compress', ['concat-main'], function () {
  return gulp.src('lib/' + targetName + '.js')
    .pipe(uglify({ output : { ascii_only : true } }) )
    .pipe(rename({ suffix: '.min' }) )
    .pipe(gulp.dest('lib/') );
});

gulp.task('jasmine', ['concat-main','concat-test'], function() {
  return gulp.src('lib/' + targetName + '.spec.js')
  .pipe(jasmine() );
});

gulp.task('default', ['compress', 'concat-main.d', 'jasmine']);
