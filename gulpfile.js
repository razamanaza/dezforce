const gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify");

gulp.task('browser-sync', () => {
	browsersync({
		server: {
			baseDir: 'src'
		},
		notify: false,
	})
});

gulp.task('sass', () => {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/font-awesome/css/font-awesome.min.css',
		'src/sass/**/*.scss'
	])
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	//.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(concat('main.min.css'))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('src/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('fonts', () => {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('src/fonts'))
		.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('js', () => {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'src/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest('src/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('watch', ['fonts', 'sass', 'js', 'browser-sync'], () => {
	gulp.watch('node_modules/font-awesome/fonts/*', ['fonts']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch(['node_modules/jquery/dist/jquery.min.js', 'src/js/common.js'], ['js']);
	gulp.watch('src/*.html', browsersync.reload)
});

gulp.task('default', ['watch']);
