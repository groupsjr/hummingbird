"use strict";

module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var paths = {
		libDir: 'library',
		prod: 'prod',
		prodDir: 'prod/library'
	};

	grunt.initConfig({
		path: paths,

		jshint: {
			files: ['<%= path.libDir %>/js/scripts.js'],
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
					'<%= path.prodDir %>/js/scripts.min.js': [
						'<%= path.libDir %>/js/scripts.concat.js'
					]
				}
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['<%= path.prodDir %>/js/libs/*.js', '<%= path.prodDir %>/js/scripts.js'],
				dest: '<%= path.prodDir %>/js/scripts.concat.js'
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
					'<%= path.libDir %>/style/app.css':'<%= path.libDir %>/sass/app.scss'
				}
			},
			prod: {
				options: {
					style: 'compressed'
				},
				files: {
					'<%= path.libDir %>/style/app.min.css':'<%= path.libDir %>/sass/app.scss',
					'<%= path.prodDir %>/style/app.css':'<%= path.libDir %>/sass/app.scss'
				}
			},
			aux: {
				options: {
					style: 'compressed'
				},
				files: {
					'<%= path.libDir %>/css/ie.css':'<%= path.libDir %>/scss/ie.scss',
					'<%= path.libDir %>/css/login.css':'<%= path.libDir %>/scss/login.scss',
				}
			}
		},

		imagemin: {
			dist: {
				files: [{
				expand: true,
				cwd: "<%= path.libDir %>/images",
				dest: "<%= path.prodDir %>/images",
				src: [
					"**/*.{png,jpg,gif}"
					]
				}]
			}
		},
		processhtml: {
			dist: {
				files: {
				"<%= path.prod %>/index.html": "<%= path.prodDir %>/index.html",
				"<%= path.prod %>/README.md": "<%= path.prodDir %>/README.md",
				}
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
				files: ['<%= path.libDir %>/scss/*.scss'],
				tasks: ['sass:dev']
			},

			css: {
				files: ['library/css/style.css'],
				tasks: []
			},

			html: {
				files: ['*.html',' library/*.html']
			}

		}

	});

	grunt.registerTask('js', ['jshint', 'concat', 'uglify' ]);
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['js', 'sass:prod', 'processhtml:dist', 'imagemin:dist' ]);

};