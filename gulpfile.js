var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),     //合并js文件
    uglify = require('gulp-uglify'),     
    cssmin = require('gulp-minify-css');


gulp.task('autoreload',function(){
	gulp.src('*')
	    .pipe(gulp.dest(''))
	    .pipe(livereload());
}).task('autoFx',['autoreload'],function(){
	gulp.src('*.css')
	    .pipe(autoprefixer({
	    	browsers: ['last 2 versions'],
	    	cascade: true,
	    	remove: true
	    }))
	    .pipe(gulp.dest('dist'));
}).task('jsConcat',['autoreload'],function(){
	gulp.src('*.js')
	    .pipe(concat('all.js'))
	    .pipe(gulp.dest('dist'));
}).task('jsmin',['jsConcat','autoreload'],function(){
	gulp.src('dist/all.js')
	    .pipe(uglify({
	    	compress: true,    //是否完全压缩
	    	preserveComments: 'all'   //保留所有注释
	    }))
	    .pipe(gulp.dest('dist'));
}).task('cssmin',['autoFx','autoreload'],function(){
	gulp.src('dist/*.css')
	    .pipe(cssmin({
	    	keepBreaks: true,
	    	keepSpecialComments: '*'   //保留所有特殊前缀，当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能会被部分删除
	    }))
	    .pipe(gulp.dest('dist'));
}).task('htmlmin',['autoreload']function(){
	var options = {
		removeComments: true,
		collapseWhitespace: true,   //压缩html
		collapseBooleanAttributes: true,
		removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        miniCSS: true
	};
	gulp.src('*.html')
	    .pipe(htmlmin(options))
	    .pipe(gulp.dest('dist'));
}).task('default',['autoreload','autoFx','jsConcat','jsmin','cssmin','htmlmin']);