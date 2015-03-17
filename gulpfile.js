var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var distDest = 'dist/';
var cssDistDest = distDest + 'css/';

gulp.task('less', function () {
    var files = [
        'src/less/demeter-nr.less',
        'src/less/demeter.less',
        'src/less/animations.less',
        'src/less/prettify.less'
    ];
    gulp.src(files)
        .pipe(less())
        .pipe(gulp.dest(cssDistDest));
    gulp.src('tests/jade/tests.less')
        .pipe(less())
        .pipe(gulp.dest('tests/html'));
    gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(rename(function (path) {
            path.basename += "-min";
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cssDistDest));
});

gulp.task('jade', function () {
    var files = [
        'tests/jade/*.jade'
    ];
    gulp.src(files)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('tests/html'));
});

gulp.task('default', ['less', 'jade']);

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('tests/jade/*.jade', ['jade']);
});