const { watch } = require("gulp");
const browsersync = require("browser-sync");

function serve(cb) {
    browsersync.init({
        server: "./"
    })

    watch(["**/*.html", "**/*.css", "**/*.js"]).on('change', browsersync.reload);
    cb();
}

exports.serve = serve;