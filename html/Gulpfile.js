var gulp = require('gulp');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('bs', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("stylesheets"))
        .pipe(bs.reload({stream: true}));
});



// scss编译后的css将注入到浏览器里实现更新
gulp.task('serve', ['sass'], function() {

    bs.init({
        server: "./"
    });

    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
    gulp.watch("js/**/*.js").on('change', bs.reload);
});


gulp.task('default', ['serve']);