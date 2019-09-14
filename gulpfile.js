const {src, dest, task, series, watch} = require('gulp');
const rm = require ('gulp-rm');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');

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
    return src("src/icons").pipe(dest("dist"));
});

task ("styles", () => {
    return src ("src/css/main.scss")
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ["last 2 versions"],
        cascade: true
    }))
    .pipe(dest('dist'));
});
task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        open: false
    });
});
watch('src/css/**/*.scss', series('styles'));
watch('src/*.html', series('copy:html'));
task("default", series("clean", "copy:html","copy:icons","styles","server"));