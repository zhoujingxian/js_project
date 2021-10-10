const {
    src,
    dest,
    watch
} = require("gulp");
const sass = require("gulp-sass")(require("sass"))

function buildStyles() {
    return src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./www/css'))
}
exports.bs = buildStyles;

exports.watch = function () {
    watch('./src/sass/*.scss', buildStyles)
}