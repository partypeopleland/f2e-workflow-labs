var gulp = require('gulp');
var del = require('del');
//透過gulp-load-plugins載入套件
var $ = require('gulp-load-plugins')();
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');

//取得同目錄下的config
var config = require('./config');


gulp.task('default',["mytask1"],function(){
	console.log('My Default Task');
})

gulp.task('mytask1',["mytask2"],function(){
	console.log('Task1 Output');
})

gulp.task('mytask2',function(){
	console.log('Task2 Output');
})

gulp.task('output1',["default"],function(){
	gulp.src(config.srcBase+'/bootstrap/**/*.js')
	.pipe(gulp.dest(config.destPath1));	
})

gulp.task('output2',["clean2"],function(){
	gulp.src(config.srcBase+'/bootstrap/**/*.js',{base:config.srcBase})
	.pipe(gulp.dest(config.destPath2));	
});

gulp.task('clean2',function(cb){
	//沒檔案可以刪除，程式會掛在這邊
	del([config.destpath2 + '/bootstrap/**','!'+config.destPath2+'/bootstrap'])
		.then(function (paths) {
		console.log('Deleted files/folders:\n', paths.join('\n'));
		cb();
		})
});

gulp.task('output3',["default"],function(){
	gulp.src([
		config.srcBase+'/**/*.js',
		config.srcBase+'/**/*.css'],{base:config.srcBase})
		.pipe(gulp.dest(config.destPath3));
})

gulp.task('output4',["default"],function(){
	gulp.src([
		config.srcBase+'/angular/angular*.js',
		config.srcBase+'/angular-animate/angular-*.js'
		])
		.pipe(gulp.dest(config.destPath4));
})

gulp.task('watch',function(){
	gulp.watch(config.srcBase+'/**/*.js',['output2']);
	
})

gulp.task('watch2',function(){
	gulp.watch(config.appPath + '/**/*.js',['default']);
})

//23 載入 gulp-concat 模組，並將多支 js 檔案合併成一支 讓前端頁面使用
//24 將所有 app 下的 js 檔案都進行 uglify 醜化處理，合併後輸出到 assets 資料夾
//25 將所有 app 下的 js 檔案都進行 uglify 醜化處理，合併後更名為 *.min.js 輸出到 assets 資料夾
gulp.task('concat-app',function(){
	
	gulp.src(config.appPath + '/**/*.module.js')
	.pipe(gulp.dest('src/app'))
	.pipe($.concat('app.modules.js'))
	.pipe(gulp.dest('asserts'))
	.pipe($.uglify())
	.pipe($.rename(function(path){
		path.extname=".min.js"
	}))
	.pipe(gulp.dest('asserts'))
	
	gulp.src([config.appPath + '/**/*.js','!'+ config.appPath + '/**/*.module.js'])
	.pipe(gulp.dest('src/app'))
	.pipe($.concat('app.bundles.js'))
	.pipe(gulp.dest('asserts'))
	.pipe($.uglify({mangle:false}))
	.pipe($.rename(function(path){
		path.extname=".min.js"
	}))
	.pipe(gulp.dest('asserts'))
	
})