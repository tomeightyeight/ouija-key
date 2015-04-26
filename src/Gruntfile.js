module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			options: {
				banner: '/* Ouija v0.0.1, built <%=  grunt.template.today() %> */'
			},

			lib: {
				src: [
					'./application/lib/*.js'
				],
				
				dest: './public/js/vendor.compiled.js'
			},

			app: {
				src: [
					'./application/app.js'
				],

				dest: './public/js/app.compiled.js'
			}
		}
	});

	// Load the plugin that prvides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);
}