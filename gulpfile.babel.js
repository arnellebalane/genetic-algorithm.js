import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';


gulp.task('scripts', () => {
    gulp.src(['index.js'], { base: '.' })
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('dist'))
});


gulp.task('watch', () => {
    gulp.watch(['index.js'], ['scripts']);
});


gulp.task('default', ['scripts', 'watch']);
