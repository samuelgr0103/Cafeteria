const { src,dest,
    watch,
    series,
    parallel
} = require('gulp');
//css y sass
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
//Imagenes
const imagemin= require('gulp-imagemin');
const webp=require('gulp-webp');
const avif=require('gulp-avif');

function css() {
    // compilar sass
    // paso: 1 - identificar archivos
   return src('src/scss/app.scss')
   .pipe(sourcemaps.init())
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(postcss([autoprefixer(),cssnano()]))
   .pipe(sourcemaps.write('.'))
   .pipe(dest('build/css'));
}
function imagenes() {
    return src('src/img/**/*')
    .pipe(imagemin({optimizationLevel:3}))
    .pipe(dest('build/img'));
}
function versionwebp(){
    const opciones={
        quality:50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'));
}
function versionAvif(){
    const opciones={
        quality:50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'));

}
function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);

}

    

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionwebp=versionwebp;
exports.versionAvif=versionAvif;
exports.default = series(imagenes,versionwebp,versionAvif, css, dev);

// series- Se inicia una tarea y termina hasta que termina la tarea
// parallel- Todas inician al mismo tiempo
