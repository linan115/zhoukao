var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var data = fs.readFileSync('./src/data/data.json');
gulp.task('server', function() {
    gulp.src('./src/')
        .pipe(server({
            port: 8000,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') { return };
                var pathname = require('url').parse(req.url).pathname;
                pathname = pathname === '/' ? 'index.html' : pathname;
                if (pathname === '/api/ajax') {
                    res.end(data.toString());
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})

// gulp.task('watch', function() {
//     gulp.watch('./src/css/*.css', ['server'])
// })
// gulp.task('default', ['server', 'watch']);