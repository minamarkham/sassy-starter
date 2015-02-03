/*

    Grunt installation:
    -------------------
    npm install -g grunt-cli
    npm install -g grunt-init
    npm init (creates a `package.json` file)

    Simple Dependency Install:
    --------------------------
    npm install (from the same root directory as the `package.json` file

    Tasks:
    --------------------------
    grunt (default is to watch both sass and coffeescript files)
    grunt sass (compile once)
    grunt watch (you can also explicitly call the watch task)

    All commands are detailed by running the following:
    --------------------------
    grunt --help

*/

'use strict';

module.exports = function(grunt) {

  // CONFIG ===================================/

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // configure sass --> grunt sass
    sass: {                                       // Task
      dev: {                                      // Target
        options: {                                // Target options
          style: 'expanded',
          require: 'susy'
        },
        files: {                                  // Dictionary of files
          'css/styles.css': 'scss/styles.scss',   // 'destination': 'source'
          // 'css/ie.css': 'scss/ie.scss',
          // 'css/themes/*.css':'scss/themes/*.scss'
        }
      },
      prod: {                                     // Target
        options: {                                // Target options
          style: 'compressed',
          require : 'susy'
        },
        files: {                                  // Dictionary of files
          'css/styles.css': 'scss/styles.scss',   // 'destination': 'source'
          // 'css/ie.css': 'scss/ie.scss',
          // 'css/themes/*.css':'scss/themes/*.scss'
        }
      }
    },

    // configure sass documentation --> grunt sassdoc
    sassdoc: {
      default: {
        src: 'scss',
        dest: 'docs',
        options: {
          package: 'package.json'
        }
      }
    },

    // clean

    clean: {
        src: ['!img/*.png', '!img/*.gif' , '!img/svgs/*.svg', 'img/build']
     },

    // configure concatenation --> grunt concat
    concat: {
      dist: {
        src: [
          'js/libs/*.js' // All JS in the libs folder
        ],
        dest: 'js/plugins.js'
      }
    },

    // configure minification --> grunt uglify
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

    //jshint javascript hint
    //
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'js/global.js'
      ]
    },


    datauri: {
        default: {
            options: {
                classPrefix: 'data-icon-'
            },
            src: [
                "img/*.png",
                "img/*.gif",
            ],
            dest: [
                "scss/utilities/lib/_base64placeholder.scss"
            ]
        }
    },



    // configure file watching --> grunt watch
    watch: {
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
            spawn: false,
        },
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:dev'],
        options: {
            livereload: true,
            spawn: false,
        }
      },
      html: {
        files: ['**/*.html'],
        tasks: ['sass:dev'],
        options: {
            spawn: false,
        }
      },
      imgUri: {
        files: ['img/*.png', 'img/*.gif', 'img/svgs/*.svg'],
        tasks: [ 'clean', 'imagebuild'],
        options: {
            spawn: true,
        }
      },
      docs: {
        files: ['scss/**/*.scss'],
        tasks: ['sassdoc'],
        options: {
            spawn: false,
        }
      }

    },


    // Browser Sync
    browserSync: {
              dev: {
                  bsFiles: {
                      src : ['css/*.css', 'js/**/*.js', '*.html']
                  },
                  options: {
                      server: {
                          baseDir: './'
                      },
                      // proxy: "local.dev", // enable if needed.
                      watchTask: true,
                      notify : false,
                      scrollProportionally: true
                  }
              }
          },

    // configure image optimization --> grunt imagemin
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'img/build'
        }]
      }
    },

    svgmin: {
      dist: {
          files: [{
              expand: true,
              cwd: 'img/svgs',
              src: ['*.svg'],
              dest: 'img/build/svgmin'
          }]
      }
  },


    svgstore: {
      options: {
        prefix : 'icon-', // This will prefix each ID
        // cleanup: ['fill'],
        // svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
        //   viewBox : '0 0 100 100',
        //   xmlns: 'http://www.w3.org/2000/svg'
        // }
      },
      default: {
        files: {
          'img/build/svgmin/defs.svg': ['img/build/svgmin/*.svg'],
        },
      },
  },


  // // perf
  //  devperf: {
  //   options: {
  //     urls: [
  //       'http://www.telegrafi.com',
  //     ],
  //     numberOfRuns: 5,
  //     timeout: 120,
  //     openResults: true,
  //     resultsFolder: './devperf'
  //   }
  // },

  pagespeed: {
  options: {
    nokey: true,
    url: 'http://localhost'
  },
  desktop: {
    options: {
      url: 'http://localhost',
      locale: 'en_GB',
      strategy: 'desktop',
      threshold: 80
    }
  },
  mobile: {
    options: {
      url: 'http://localhost',
      locale: 'en_GB',
      strategy: 'mobile',
      threshold: 80
    }
  },
},

  parker: {
    options: {
      // metrics: [
      //   "TotalRules",
      //   "TotalSelectors",
      //   "TotalIdentifiers",
      //   "TotalDeclarations"
      // ],
      // file: "report.md",
      // colophon: true,
      // usePackage: true
    },
    src: [
      'css/*.css'
    ]
  }


});


  // DEPENDENT PLUGINS =========================/

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sassdoc');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-datauri');
  grunt.loadNpmTasks('grunt-contrib-clean');




  // perf
  // grunt.loadNpmTasks('grunt-devperf');
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-phantomas');
  grunt.loadNpmTasks('grunt-parker');

  // TASKS =====================================/

  grunt.registerTask( 'default', ['browserSync', 'watch','imagemin', 'svgstore', 'datauri'] ); // default 'grunt'
  grunt.registerTask( 'build', [ 'clean', 'imagemin','sass:prod', 'svgmin', 'svgstore', 'datauri'] ); // optimize images, compress css
  grunt.registerTask( 'perf', ['pagespeed', 'parker'] );
  grunt.registerTask ( 'imagebuild', ['imagemin', 'svgmin', 'svgstore', 'datauri'] );

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
