"use strict";

module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var paths = {
		libDir: 'library',
		prodDir: 'prod'
	};

	grunt.initConfig({

		jshint: {
			files: ['<%= paths.libDir %>/js/scripts.js'],
			options: {
				force: true,
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true,
				}
			}
		},

		uglify: {
			staging: {
				files: {
					'library/js/scripts.min.js': [
						'library/js/scripts.concat.js'
					]
				}
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['library/js/libs/*.js', 'library/js/scripts.js'],
				dest: 'library/js/scripts.concat.js'
			}
		},

		sass: {
			options: {
				banner: '/*! <%= grunt.template.today("dd-mm-yyyy h:MM:ss TT") %> */\n'
			},
			dev: {
				options: {
					style: 'expanded',
					lineNumbers: true
				},
				files: {
					'<%= paths.libDir %>/css/app.css':'<%= paths.libDir %>/scss/app.scss',
				}
			},
			prod: {
				options: {
					style: 'compressed'
				},
				files: {
					'library/css/ie.css':'library/scss/ie.scss',
					'library/css/login.css':'library/scss/login.scss',
					'library/css/style.css':'library/scss/style.scss',
				}
			},
			aux: {
				options: {
					style: 'compressed'
				},
				files: {
					'library/css/ie.css':'library/scss/ie.scss',
					'library/css/login.css':'library/scss/login.scss',
				}
			}
		},

		imagemin: {
			dist: {
				files: [{
				expand: true,
				cwd: "<%= path.library %>/images",
				dest: "<%= path.prodDir %>/images",
				src: [
					"**/*.{png,jpg,gif}"
					]
				}]
			}
		},

		watch: {
			options: {
				livereload: true
			},

			sass: {
				options: {
					livereload: false
				},
				files: ['<%= paths.libDir %>/scss/*.scss'],
				tasks: ['sass:dev']
			},

			css: {
				files: ['library/css/style.css'],
				tasks: []
			},

			php: {
				files: ['*.php', 'library/includes/*.php',' library/*.php']
			}

		}

	});

	grunt.registerTask('default', ['watch']);

};