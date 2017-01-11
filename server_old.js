const decompress = require('gulp-decompress');
const gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');

var sourceZipFilePath = "./source/myzip.zip";
var destExtractPath = "./destination/";

gulp.task('default', () => {
    return gulp.src(sourceZipFilePath)
        .pipe(decompress({strip: 1}))
        .pipe(debug())
        .pipe(gulp.dest(destExtractPath));
});

gulp.run(['default']);