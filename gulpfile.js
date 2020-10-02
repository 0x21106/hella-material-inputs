const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const minifyJS = require('gulp-minify')
const browserSync = require('browser-sync').create()

const merge = require('merge-stream')
const http = require('http')




// copy html to dist folder
function html() {
    return gulp.src(__dirname + '/app/index.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream())
}

function globalCSS() {
    return gulp.src('./app/assets/css/*.scss')
        .pipe(sass())
        .pipe(cleanCSS({ compability: 'ie8' }))
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(browserSync.stream())
}

// hella input lib
function hella_inputsJS() {
    return gulp.src('./app/assets/libs/hella-inputs/*.js')
        .pipe(minifyJS())
        .pipe(gulp.dest(`./dist/assets/libs/hella-inputs/`))
        .pipe(browserSync.stream())
}

function hella_inputsCSS() {
    return gulp.src('./app/assets/libs/hella-inputs/*.scss')
        .pipe(sass())
        .pipe(cleanCSS({ compability: 'ie8' }))
        .pipe(gulp.dest(`./dist/assets/libs/hella-inputs/`))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    })
    gulp.watch('./app/assets/libs/hella-inputs/*.scss', hella_inputsCSS)
    gulp.watch('./app/assets/libs/hella-inputs/*.js', hella_inputsJS)
    gulp.watch('./app/*.html', html)
    gulp.watch('./app/assets/css/*.scss', globalCSS)

}


exports.watch = watch