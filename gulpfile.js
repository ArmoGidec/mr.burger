const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMedia = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');

const plugins = [
    autoprefixer({ browsers: ['last 2 version'] })
];

function styles() {
    return src('app/css/main.scss', { sourcemaps: true })
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(groupMedia())
        .pipe(postcss(plugins))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css/'), { sourcemaps: '.' });
}

function svgSprite() {
    return src('app/icons/*.svg')
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename('sprite.svg'))
        .pipe(dest('build/sprite/'));
}

function scripts() {
    return src('app/js/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(dest('build/js/'));
}

function scriptsVendors() {
    return src(['node_modules/jquery/dist/jquery.js', 'app/js/modules/*.js'])
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(concat('vendors.min.js'))
        .pipe(dest('build/js/'));
}

function copyFonts() {
    return src('app/fonts/**/*.{otf,ttf}').pipe(dest('build/fonts'));
}

function copyHtml() {
    return src('app/*.html')
        .pipe(plumber())
        .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
        .pipe(dest('build'));
}

function favicon() {
    return src('app/*.ico').pipe(dest('build/'));
}

function images() {
    return src('app/images/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(imagemin()) // если картинок будет много, то и времени будет уходить много
        .pipe(dest('build/images/'));
}

function clean() {
    return del('build/');
}

function watcher() {
    watch('app/css/**/*.scss', styles);
    watch('app/js/**/*.js', scripts);
    watch('app/*.html', copyHtml);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: 'build/'
        },
        open: false,
        port: 3001
    });
    browserSync.watch('build/**/*.*', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.scriptsVendors = scriptsVendors;
exports.copyHtml = copyHtml;
exports.favicon = favicon;
exports.images = images;
exports.svgSprite = svgSprite;
exports.clean = clean;
exports.watch = watch;

exports.build = series(
    clean,
    parallel(styles, svgSprite, scripts, scriptsVendors, copyHtml, copyFonts, favicon, images)
);

exports.default = series(
    clean,
    parallel(styles, svgSprite, scripts, scriptsVendors, copyHtml, copyFonts, favicon, images),
    parallel(watcher, serve)
);