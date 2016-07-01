var gulp = require('gulp');
var mocha = require('gulp-mocha');
var sync    = require('run-sequence');

var paths = {
	testIntegration: 'server/api/**/*.integration.js',
	api: ['server/api/**/*.js', 'server/auth/**/*.js']
};

// Tests
gulp.task('test:integration', function () {
	return gulp.src([paths.testIntegration], {read: false})
		.pipe(mocha({
      reporter: 'spec',
      globals: {
        request: require('supertest'),
				expect: require('chai').expect
      }
    }));
});

// Watch
gulp.task('watch-test', function () {
	gulp.watch(paths.api, ['test:integration']);
});

gulp.task('test', ['test:integration', 'watch-test']);