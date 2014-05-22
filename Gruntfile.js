/*
    Grunt installation:
    -------------------
    npm install -g grunt-cli
    npm install -g grunt-init
    npm init (creates a `package.json` file)

    Project Dependencies:
    ---------------------
    npm install grunt --save-dev
    npm install grunt-contrib-watch --save-dev
    npm install grunt-contrib-jshint --save-dev
    npm install grunt-contrib-uglify --save-dev
    npm install grunt-contrib-requirejs --save-dev
    npm install grunt-contrib-sass --save-dev
    npm install grunt-contrib-imagemin --save-dev
    npm install grunt-contrib-htmlmin --save-dev
    npm install grunt-contrib-connect --save-dev
    npm install grunt-contrib-jasmine --save-dev
    npm install grunt-template-jasmine-requirejs --save-dev
    npm install grunt-template-jasmine-istanbul --save-dev
    npm install load-grunt-tasks --save-dev
    npm install time-grunt --save-dev

    Simple Dependency Install:
    --------------------------
    npm install (from the same root directory as the `package.json` file)

    Gem Dependencies:
    -----------------
    gem install image_optim

*/

module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // configure concatenation
    concat: {
      dist: {
        src: [
          'js/libs/*.js' // All JS in the libs folder
        ],
        dest: 'js/plugins.js'
      }
    },
    // configure minification
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'js/build/plugins.js' : 'js/plugins.js',
          'js/build/global.js' : 'js/global.js'
        }
      }
    },
    // configure sass
    sass: {
      dist: {
        options: {
            require: [
              'sass-globbing'
            ],
            style: 'compressed'
        },
        files: {
            'css/styles.css': 'scss/styles.scss',
            'css/ie.css': 'scss/ie.scss'
        }
      },
      dev: {
        options: {
            require: [
              'sass-globbing'
            ],
            lineNumbers: true,
            style: 'expanded'
        },
        files: {
            'css/styles.css': 'scss/styles.scss',
            'css/ie.css': 'scss/ie.scss'
        }
      }
    },
    // configure file watching
    watch: {
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
            spawn: false,
        },
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:dev'],
        options: {
            spawn: false,
        }
      }
    },
    // configure image optimization
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'img/build/'
        }]
      }
    }
  });

  // load all the plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // run all the task(s)
  grunt.registerTask( 'default', [ 'watch'] ); // default 'grunt'
  grunt.registerTask( 'build', [ 'imagemin','sass:dist' ] ); // optimize images, compress css

};

/*
    Notes:

    When registering a new Task we can also pass in any other registered Tasks.
    e.g. grunt.registerTask('release', 'default requirejs'); // when running this task we also run the 'default' Task

    We don't do this above as we would end up running `sass:dev` when we only want to run `sass:dist`
    We could do it and `sass:dist` would run afterwards, but that means we're compiling sass twice which (although in our example quick) is extra compiling time.

    To run specific sub tasks then use a colon, like so...
    grunt sass:dev
    grunt sass:dist

*/
