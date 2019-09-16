const {src, dest, task, series, watch} = require('gulp');
const rm = require ('gulp-rm');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

task('clean', () => {
    return src( "dist/**/*", { read: false }).pipe(rm())
  });
task('copy:scss', () => {  
    return src("src/css/main.scss")
    .pipe(dest("dist"))
    .pipe(reload({stream:true}));
});
task('copy:html', () => {  
    return src("src/*.html").pipe(dest("dist"));
});
task('copy:icons', () => {  
    return src(["src/icons/**/*.svg", "src/icons/**/*.png"]).pipe(dest("dist/icons"));
});
task('copy:img', () => {  
    return src(["src/img/**/*.jpg", "src/img/**/*.png"]).pipe(dest("dist/img"));
});

task ("styles", () => {
    return src ("src/css/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ["last 2 versions"],
        cascade: true
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())    
    .pipe(dest('dist'));
});

task('js', () => {
    return src("src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js", {newLine: ";"}))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
})
task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});
watch('src/css/**/*.scss', series('styles'));
watch('src/*.html', series('copy:html'));
task("default", series("clean", "copy:html","copy:icons","copy:img","styles","js","server"));