var gulp = require('gulp');
var decompress = require('gulp-decompress');
var gulpFn = require('gulp-fn');
var es = require('event-stream');
var foreach = require('gulp-foreach');

//paths
var sourceZipFilePath = "./source/";
var destExtractPath = "./destination/";

var current_zip_file = '';
var myOutput = new Object();


gulp.task('default', () => {
  return gulp.src(sourceZipFilePath + '/*.{tar,tar.bz2,tar.gz,zip}')
    .pipe(foreach(
      function (stream, file) {
        return stream
          .pipe(gulpFn(function (file) {
            current_zip_file = file.path;
            myOutput[file.path] = [];
          }))
          .pipe(decompress({ makeFolders: true }))
          .pipe(gulp.dest(destExtractPath))
          .pipe(gulpFn(function (file) {
            myOutput[current_zip_file].push(file.path);
          })
          );
      }
    )).on('end', function() {
      //array of files in zip  
      console.log(JSON.stringify(myOutput))
    });
})
gulp.start(['default']);

