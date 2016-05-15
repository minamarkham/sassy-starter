var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cleanCSS    = require('gulp-clean-css'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    prefix      = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    htmlmin     = require('gulp-htmlmin'),
    size        = require('gulp-size'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    deploy      = require('gulp-gh-pages'),
    notify      = require('gulp-notify'),
    sassLint    = require('gulp-sass-lint'),
    del         = require('del'),
    vinylPaths  = require('vinyl-paths'),
    sourcemaps  = require('gulp-sourcemaps'),
    colors      = require('colors'),
    sassdoc     = require('sassdoc'),
    // Temporary solution until gulp 4
    // https://github.com/gulpjs/gulp/issues/355
    runSequence = require('run-sequence');

var bases = {
    app:  'src/',
    dist: 'dist/',
};

colors.setTheme({
  silly:   'rainbow',
  input:   'grey',
  verbose: 'cyan',
  prompt:  'grey',
  info:    'green',
  data:    'grey',
  help:    'cyan',
  warn:    'yellow',
  debug:   'blue',
  error:   'red'
});

var displayError = function(error) {
  // Initial building up of the error
  var errorString = '[' + error.plugin.error.bold + ']';
  errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

  // If the error contains the filename or line number add it to the string
  if(error.fileName)
      errorString += ' in ' + error.fileName;

  if(error.lineNumber)
      errorString += ' on line ' + error.lineNumber.bold;

  // This will output an error like the following:
  // [gulp-sass] error message in file_name on line 1
  console.error(errorString);
}

var onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Basso"
  })(err);
  this.emit('end');
};

var sassOptions = {
  outputStyle: 'expanded'
};

var prefixerOptions = {
  browsers: ['last 2 versions']
};

// BUILD SUBTASKS
// ---------------

gulp.task('clean:dist', function() {
  return gulp.src(bases.dist)
    .pipe(vinylPaths(del));
});


gulp.task('styles', function() {
  return gulp.src(bases.app + 'scss/styles.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix(prefixerOptions))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(bases.dist + 'css'))
    .pipe(reload({stream:true}))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(bases.dist + 'css'))
});

gulp.task('themes', function() {
  return gulp.src(bases.app + 'scss/themes/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix(prefixerOptions))
    .pipe(gulp.dest(bases.dist + 'css/themes'))
    .pipe(reload({stream:true}))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(bases.dist + 'css/themes'))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: bases.dist
    }
  });
});

gulp.task('deploy', function() {
  return gulp.src(bases.dist)
    .pipe(deploy());
});

gulp.task('js-app', function() {
  gulp.src(bases.app + 'js/*.js')
    .pipe(uglify())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(bases.dist + 'js'))
    .pipe(reload({stream:true}));
});

gulp.task('js-libs', function() {
  gulp.src([bases.app + 'js/libs/*.js', '!' + bases.app + 'js/libs/modernizr.js'])
    .pipe(uglify())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(bases.dist + 'js'))
    .pipe(reload({stream:true}));
});


gulp.task('copy', function() {

  // copy modernizr to dist directly
  gulp.src(bases.app + 'js/libs/modernizr.js')
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(bases.dist + 'js/libs'))
    .pipe(reload({stream:true}));

  // copy icons to dist directly
  gulp.src(bases.app + 'icons/**/*.*')
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(bases.dist))
    .pipe(reload({stream:true}));

  // copy meta files to dist directly
  gulp.src([bases.app + '*.xml', bases.app + '*.txt'])
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(bases.dist))
    .pipe(reload({stream:true}));

});

gulp.task('sass-lint', function() {
  gulp.src([bases.app + 'scss/**/*.scss', '!' + bases.app + 'scss/libs/**/*.scss', '!' + bases.app + 'scss/states/_print.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('minify-html', function() {
  gulp.src(bases.app + './*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(bases.dist))
    .pipe(reload({stream:true}));
});

gulp.task('watch', function() {
  gulp.watch(bases.app + 'scss/**/*.scss', ['styles']);
  gulp.watch(bases.app + './*.html', ['minify-html']);
  gulp.watch(bases.app + 'img/*', ['imagemin']);
});

gulp.task('imagemin', function() {
  return gulp.src(bases.app + 'img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(bases.dist + 'img'));
});

gulp.task('sassdoc', function () {
  var options = {
     dest: 'docs',
     verbose: true,
     display: {
       access: ['public', 'private'],
       alias: true,
       watermark: true,
     },
     groups: {
       'undefined': 'Ungrouped',
     },
     basePath: 'https://github.com/SassDoc/sassdoc',
   };
  return gulp.src(bases.app + 'scss/**/*.scss')
    .pipe(sassdoc(options));
});

// BUILD TASKS
// ------------

gulp.task('default', function(done) {
  runSequence('clean:dist', 'browser-sync', 'js-app', 'js-libs', 'imagemin', 'minify-html', 'styles', 'themes', 'copy', 'watch', done);
});

gulp.task('build', function(done) {
  runSequence('clean:dist', 'js-app', 'js-libs', 'imagemin', 'minify-html', 'styles', 'copy', done);
});
