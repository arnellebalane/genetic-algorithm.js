import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';


gulp.task('scripts', () => {
    gulp.src(['src/**/*.js'], { base: 'src' })
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('dist'))
});


gulp.task('watch', () => {
    gulp.watch(['src/**/*.js'], ['scripts']);
});


gulp.task('default', ['scripts', 'watch']);
