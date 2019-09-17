const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require ('gulp-rm');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () => {
    console.log(env);
    return src( "dist/**/*", { read: false })
    .pipe(rm())
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
    return src(["src/icons/**/*.svg", "src/icons/**/*.png","src/icons/**/*.gif"]).pipe(dest("dist/icons"));
});
task('copy:img', () => {  
    return src(["src/img/**/*.jpg", "src/img/**/*.png"]).pipe(dest("dist/img"));
});
task('copy:fonts', () => {  
    return src(["src/fonts/*.woff", "src/fonts/*.woff2"]).pipe(dest("dist/fonts"));
});

task ("styles", () => {
    return src ("src/css/main.scss")
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod', autoprefixer({        
        cascade: false
    })))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))    
    .pipe(dest('dist'));
});

task('js', () => {
    return src("src/js/*.js")
    .pipe(gulpif(env === 'dev',sourcemaps.init()))
    .pipe(concat("main.js", {newLine: ";"}))
    // .pipe(babel({
    //     presets: ['@babel/env']
    //   }))
    // .pipe(uglify())
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
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
task("watch", ()=> {
    watch('src/js/*.js', series('js'));
    watch('src/css/**/*.scss', series('styles'));
    watch('src/*.html', series('copy:html'));
});
task("build",
 series(
   'clean',
   parallel('copy:html', 'styles', 'js', "copy:icons","copy:img"))
);
task("default", 
series("clean",
parallel("copy:icons","copy:img","copy:fonts","styles","js","copy:html"),
parallel ("watch","server")));