/**
* Gruntfile.js
* Charcoal-Multi-Input configuration for grunt. (The JavaScript Task Runner)
*/

module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jsonlint:{
			bower:{
				src:[
					'bower.json',
					'.bowerrc'
				]
			}
		},

		jshint:{
			gruntfile:{
				src:[
					// Self-test
					'Gruntfile.js'
				]
			},
			code:{
				src:[
					'src/**/*.js'
				]
			},
			tests:{
				src:[
					'tests/**/*.js'
				]
			}
		},
		
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'js/charcoal.forms.multiple_input.js',
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'charcoal.forms.multiple_input.<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		qunit: {
			all: ['tests/**/*.html']
		},

		watch: {

			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			tasks: ['jshint', 'qunit', 'jsdoc', 'docco']
		},

		jsdoc: {

			dist : {
				src: ['src/*.js', 'test/*.js'], 
				options: {
					destination: 'doc/jsdoc'
				}
			}
		},
		docco: {

			dist : {
				src: ['src/*.js', 'test/*.js'], 
				options: {
					output: 'doc/docco'
				}
			}
		}
		
	});

	// Load plugin(s)
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-docco');

	// Register Task(s)
	grunt.registerTask('default', [
		'jshint',
		'jsonlint',
		'concat',
		'uglify'
	]);
	grunt.registerTask('tests', [
		'jshint',
		'jsonlint',
		'qunit'
	]);
	grunt.registerTask('doc', [
		'jsdoc', 'docco'
	]);


	// Register Task(s)
	grunt.registerTask('default', [
		'jshint',
		'jsonlint'
	]);
	grunt.registerTask('tests', [
		'jshint',
		'jsonlint',
		'qunit'
	]);
	
};
