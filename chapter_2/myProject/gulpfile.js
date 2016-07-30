var gulp = require('gulp'),
    sass = require('gulp-sass');
browserSync = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src(['app/sass/**/*.sass'])
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
})


gulp.task('brSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },

    });
})

gulp.task('watch', ['brSync', 'sass', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload)
    gulp.watch('app/js/*.js', browserSync.reload)
})
