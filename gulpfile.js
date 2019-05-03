// const { src, dest, parallel } = require('gulp');
// const terser = require('gulp-terser');
// const minifyCss = require('gulp-csso');
// let browserSync = require('browser-sync').create();
// let rename = require('gulp-rename');

// function css() {
//   return src('styles/*.css')
//     .pipe(minifyCss())
//     .pipe(rename(function (path) {
//       path.extname = "sheet.css"
//     }))
//     .pipe(dest('build/css'))
// }

// // function js() {
// //   return gulp.src('main/*', )
// //     .pipe(concat('app.min.js'))
// //     .pipe(dest('build/js', ))
// // }

// exports.default = parallel(css);


const{src,dest,series,parallel,watch} = require('gulp');
const minifyCSS = require('gulp-csso');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const browsersync = require('browser-sync').create();

function css() {
   return src('styles/*.css')
       .pipe(minifyCSS())
       .pipe(rename(function(path){
          path.extname= '.min.css';
       }))
       .pipe(dest('build/css'));
}

function js() {
   return src('app/*.js')
       .pipe(terser())
       .pipe(rename(function(path){
           path.extname= '.min.js';
        }))
       .pipe(dest('build/js'));
}
function liveReload(){
   browsersync.init({
       server: {
           baseDir:"./"
       }

   });
}
function reload(cb){
   browsersync.reload();
   cb();
}
watch('*',series(css,js,reload));

exports.default = parallel(css,js,liveReload);