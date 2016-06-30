var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test:integration', function () {
	return gulp.src(['server/api/**/*.integration.js'], {read: false})
		.pipe(mocha({
      reporter: 'spec',
      globals: {
        request: require('supertest'),
				expect: require('chai').expect
      }
    }));
});

gulp.task('test', ['test:integration']);