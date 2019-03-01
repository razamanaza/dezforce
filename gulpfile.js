const gulp        	= require('gulp'),
			gutil         = require('gulp-util' ),
			sass          = require('gulp-sass'),
			browsersync   = require('browser-sync'),
			concat        = require('gulp-concat'),
			uglify        = require('gulp-uglify'),
			del         	= require('del'),
			cleancss      = require('gulp-clean-css'),
			rename        = require('gulp-rename'),
			autoprefixer  = require('gulp-autoprefixer'),
			cache       = require('gulp-cache'),
			notify        = require('gulp-notify'),
			deploy      = require('gulp-gh-pages');

gulp.task('browser-sync', () => {
	browsersync({
		server: {
			baseDir: 'src'
		},
		notify: false,
	})
});

gulp.task('sass', () => {
	return gulp.src('src/sass/**/*.scss')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('src/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/font-awesome/css/font-awesome.min.css',
		'node_modules/jquery.mmenu/dist/jquery.mmenu.all.css',
		'node_modules/hamburgers/dist/hamburgers.min.css',
		'node_modules/jq-accordion/dist/css/jquery.accordion.css',
		'node_modules/owl.carousel2/dist/assets/owl.carousel.min.css',
		'node_modules/owl.carousel2/dist/assets/owl.theme.default.min.css',
	])
	.pipe(concat('libs.min.css'))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('src/css'))
});

gulp.task('fonts', () => {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('src/fonts'))
		.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('js', () => {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/jquery.mmenu/dist/jquery.mmenu.all.js',
		'node_modules/jquery.mmenu/dist/addons/pagescroll/jquery.mmenu.pagescroll.js',
		'node_modules/jquery-sticky/jquery.sticky.js',
		'node_modules/jq-accordion/dist/js/jquery.accordion.js',
		'node_modules/bootstrap/js/dist/util.js',
		'node_modules/bootstrap/js/dist/modal.js',
		'node_modules/owl.carousel2/dist/owl.carousel.min.js',
		'src/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') 
		.pipe(gulp.dest('dist/img')); 
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('watch', ['js', 'browser-sync', 'css-libs'], () => {
	gulp.watch('node_modules/font-awesome/fonts/*', ['fonts']);
	gulp.watch('src/js/common.js', ['js']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/*.html', browsersync.reload)
});


gulp.task('build', ['clean', 'img', 'sass', 'js'], () => {
	const buildCss = gulp.src([
		'src/css/libs.min.css',
		'src/css/main.css'
	])
		.pipe(cleancss())
		.pipe(gulp.dest('dist/css'));

	const buildFonts = gulp.src('src/fonts/**/*') 
		.pipe(gulp.dest('dist/fonts'));

	const buildJs = gulp.src('src/js/scripts.min.js') 
		.pipe(gulp.dest('dist/js'));

	const buildHtml = gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
		
	const buildTxt = gulp.src('src/*.txt')
		.pipe(gulp.dest('dist'));
	
	const buildSitemap = 	gulp.src('src/sitemap.xml')
		.pipe(gulp.dest('dist'));
});

gulp.task('deploy', () => {
	return gulp.src('dist/**/*')
		.pipe(deploy({ 
			remoteUrl: 'https://github.com/dezforce/dezforce.github.io.git',
			branch: 'master'
		}));
});