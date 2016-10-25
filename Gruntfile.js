module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src: 'src',
    build: 'build',
    dist: 'lib',
    ts: {
      main: {
        options : { sourceMap: false, declaration: true },
        src: [ '<%= src %>/main/ts/**/*.ts' ],
        outDir: '<%= build %>/ts'
      },
      test: {
        options : { sourceMap: false },
          src: [ '<%= src %>/test/ts/**/*.ts',
                 '<%= build %>/**/*.d.ts' ],
          outDir: '<%= build %>/ts'
        }
    },
    concat: {
      main: {
        src: ['<%= build %>/ts/**/*.js',
             '!<%= build %>/ts/**/*_test.js'],
        dest: '<%= dist %>/<%= pkg.name %>.js'
      },
      test: {
        src: ['<%= build %>/ts/**/*_test.js'],
        dest: '<%= dist %>/<%= pkg.name %>_test.js'
      }
    },
    uglify: {
      options: { ASCIIOnly : true },
      build: {
        src: '<%= dist %>/<%= pkg.name %>.js',
        dest: '<%= dist %>/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      build: {
        options: {
          spawn: false
        },
        files: ['<%= src %>/main/ts/**/*.ts'],
        tasks: ['ts'],
      }
    },
    nodeunit: {
      all: ['<%= dist %>/*_test.js'],
      options: {
        reporter: 'default',
        reporterOptions: {
          output: '<%= dist %>'
        }
      }
    },
    clean: {
      build : { src: ['<%= build %>', '.tscache'] },
      dist : { src: ['<%= dist %>'] }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask('default', ['ts', 'concat', 'uglify']);

};
