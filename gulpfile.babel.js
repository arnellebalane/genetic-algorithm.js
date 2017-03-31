const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


const sourcePath = 'source/**/*.js';
const buildPath = 'build';


gulp.task('buildjs', _ => {
    return gulp.src(sourcePath, { base: 'source' })
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(buildPath));
});


gulp.task('build', ['buildjs']);


gulp.task('watch', _ => {
    gulp.watch(sourcePath, ['buildjs']);
});


gulp.task('default', ['build', 'watch']);
