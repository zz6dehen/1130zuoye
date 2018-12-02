var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin')
var fs = require('fs');
var path = require('path');
var url = require('url');
var dis = require('./src/json/dis.json')
gulp.task('sass', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('sass'))
})

//开发环境
gulp.task('dev', gulp.series('sass', 'watch'))

//起服务
gulp.task('webserver', function() {
    return gulp.src('./build')
        .pipe(webserver({
            prot: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end()
                } else if (pathname === '/dis') {
                    res.end(JSON.stringify({ code: 1, list: dis }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;

                    res.end(fs.readFileSync(path.join(__dirname, 'build', pathname)))
                }
                // console.log(pathname)
                // res.end()
            }
        }))
})

//压缩css
gulp.task('mincss', function() {
    return gulp.src('./src/css/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('./build/css'))
})

//压缩js
gulp.task('babel', function() {
    return gulp.src('./src/scripts/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/script'))
})

//压缩html
gulp.task('htmlmin', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'))
})

//上线
gulp.task('build', gulp.parallel('mincss', 'babel', 'htmlmin'))