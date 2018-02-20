var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    // cssmin      = require('gulp-cssnano'),
    prefix = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    injectPartials = require('gulp-inject-partials'),
    htmlbeautify = require('gulp-html-beautify');
// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
runSequence = require('run-sequence');

var displayError = function(error) {
    // Initial building up of the error
    var errorString = '[' + error.plugin.error.bold + ']';
    errorString += ' ' + error.message.replace("\n", ''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if (error.fileName)
        errorString += ' in ' + error.fileName;

    if (error.lineNumber)
        errorString += ' on line ' + error.lineNumber.bold;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};

var onError = function(err) {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        // message:  "Error: <%= error.message %>",
        // sound:    "Basso"
    })(err);
    this.emit('end');
};

var sassOptions = {
    outputStyle: 'expanded'
};

var prefixerOptions = {
    browsers: [
        'last 2 versions',
        'not op_mini > 0',
        'not op_mini all',
        'not op_mob > 0',
        'not ie > 0',
        'not ie_mob > 0',
        'not bb > 0',
        'not and_uc > 0',
        'not and_qq > 0',
        'not android > 0',
        'not baidu > 0',
        'not samsung > 0'
    ]
};

// BUILD SUBTASKS
// ---------------

gulp.task('styles', function() {
    return gulp.src('client/scss/*.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(prefix(prefixerOptions))
        .pipe(rename('main.css'))
        // .pipe(cssmin())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('client/css'));
});

gulp.task('sass-lint', function() {
    gulp.src('client/scss/**/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('watch', function() {
    gulp.watch('client/scss/**/*.scss', ['styles']);
    gulp.watch('client/html/**/*.html', ['html']);
});

gulp.task('html', function() {
    return gulp.src('client/html/index.html')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(injectPartials())
        .pipe(htmlbeautify({indentSize: 2}))
        .pipe(gulp.dest('./'));
});

// BUILD TASKS
// ------------

gulp.task('default', function(done) {
    runSequence('styles', 'html', 'watch', done);
});

gulp.task('build', function(done) {
    runSequence('styles', done);
});
