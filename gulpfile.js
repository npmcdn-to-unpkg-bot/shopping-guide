/**
 * Created by youpeng on 16/8/29.
 * EMAIL:youpeng@shunshunliuxue.com
 * TEL:13381398183
 */

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');



// 检查脚本
gulp.task('lint', function() {
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// 合并，压缩文件
gulp.task('scripts', function() {
  gulp.src(['./public/**/*.js', '!./public/lib/**/*.js'])
    .pipe(ngAnnotate())
    .pipe(ngmin({dynamic: false}))
    .pipe(uglify({outSourceMap: false}))
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./public/dist'))
});

// gulp.task('usemin', function() {
//   return gulp.src('./public/index.html')
//     .pipe(usemin({
//       css: [ rev() ],
//       html: [ minifyHtml({ empty: true }) ],
//       js: [ngAnnotate(), uglify(), rev() ],
//       inlinejs: [ uglify() ],
//       inlinecss: [ minifyCss(), 'concat' ]
//     }))
//     .pipe(gulp.dest('./public/build/'));
// });



// 静态服务器 + 监听 scss/html 文件
// gulp.task('serve', ['sass'], function() {
//
//   browserSync.init({
//     server: "./app"
//   });
//
//   gulp.watch("app/scss/*.scss", ['sass']);
//   gulp.watch("app/*.html").on('change', browserSync.reload);
// });

// 默认任务
gulp.task('default', function() {
  gulp.run('lint', 'scripts');

  // 监听文件变化
  gulp.watch('./js/*.js', function() {
    gulp.run('lint', 'sass', 'scripts');
  });
});

