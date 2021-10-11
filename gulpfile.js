const {
    src,
    dest,
    watch
} = require("gulp");
const sass = require("gulp-sass")(require("sass"))


exports.watch = function () {
    watch('./www/sass/*.scss', function () {
        return src("./www/sass/*.scss")
            .pipe(sass().on("error", sass.logError))
            .pipe(dest("./dist/css"))
    })

    watch("./www/js/*.js", function () {
        return src("./www/js/*.js")
            .pipe(dest("./dist/js"))
    })

    watch("./www/**/*.html", function () {
        return src("./www/**/*.html")
            .pipe(dest("./dist"))
    })

    watch("./www/images/**/*", function () {
        return src("./www/images/**/*")
            .pipe(dest("./dist/images"))
    })
    watch("./www/libs/*.js", function () {
        return src("./www/libs/*.js")
            .pipe(dest("./dist/libs"))
    })

}