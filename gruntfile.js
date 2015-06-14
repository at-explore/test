module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 8080,
          keepalive: true
        }
      }
    },

    // Concatenation
    concat: {
      
      js: {
        // List forum JS files
        src: ['js/main.js','bower_components/sass-bootstrap/dist/js/bootstrap.js'],
        dest: 'js/main-all.js'
      },
      css: {
        // List forum JS files
        src: ['bower_components/sass-bootstrap/dist/css/bootstrap.css','css/output-main.css'],
        dest: 'css/styles.css'
      },
    },

    // Minification
    uglify: {
      js: {
        src: 'js/main-all.js',
        dest: 'js/main-all.min.js'
      }
    },

    // Sass processing
    sass: {
      dist: {
        files: {
          "css/output-main.css": "css/main.scss"
        }
      }
    },

    // Growl notifications
    notify: {
      full: {
        options: {
          message: 'Project compiled'
        }
      },
      grunt: {
        options: {
          message: 'grunt file updated'
        }
      },
      js: {
        options: {
          message: 'common_js compiled'
        }
      },
      sass: {
        options: {
          message: 'Sass compiled'
        }
      }
    },

    // File Watcher
    watch: {
      grunt: {
        files: ['GruntFile.js'],
        tasks: ['notify:grunt'],
        options:{
          livereload: true
        }
      },
      js: {
        files: ['js/*.js'],
        tasks: ['concat:js', 'uglify:js', 'notify:js'],
        options:{
          livereload: true
        }
      },
      sass: {
        files: ['css/*.scss'],
        tasks: ['sass', 'concat:css', 'notify:sass'],
        options:{
          livereload: true
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'notify:full']);


};
