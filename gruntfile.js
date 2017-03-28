module.exports = function(grunt) {
	//grunt自动化任务配置
	grunt.initConfig({
		watch: {
			jade: {
				files: ['view/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['model/*.js', 'wangnan/js/**', 'schemas/*.js'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['wangnan/css/**'],
				options: {
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoreFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['./'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 4000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}

	})

	//加载插件
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')

	//注册任务
	grunt.option('force', true)
	grunt.registerTask('default', ['concurrent'])

}