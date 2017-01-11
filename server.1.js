var sourceZipFilePath = "./source/";
var destExtractPath = "./destination/";

var gulpFn = require('gulp-fn');
var decompress = require('gulp-decompress');
var es = require('event-stream');
var gutil = require('gulp-util');
var gulp = require('gulp');
var log = gutil.log;

var file_paths = []; 

var logFile = function (es) {
  return es.map(function (file, cb) {
    //log(file.path);
    file_paths.push(file.path);
    console.log(JSON.stringify(file_paths));
    return cb();
  });
};

gulp.task('default', () => {
  return gulp.src(sourceZipFilePath + '/*.{tar,tar.bz2,tar.gz,zip}')
    .pipe(gulpFn(function (file) {
       console.log(file.path);
    }))
    .pipe(decompress({ makeFolders: true }))
    .pipe(gulp.dest(destExtractPath))
    .pipe(logFile(es));
   
});



gulp.start(['default']);

