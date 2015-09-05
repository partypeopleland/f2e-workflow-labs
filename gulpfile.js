var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


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
	gulp.src('asserts/vendor/bootstrap/**/*.js')
	.pipe(gulp.dest('output1'));	
})

gulp.task('output2',["clean2"],function(){
	gulp.src('asserts/vendor/bootstrap/**/*.js',{base:'asserts/vendor'})
	.pipe(gulp.dest('output2'));	
});

gulp.task('clean2',function(cb){
	//沒檔案可以刪除，程式會掛在這邊
	del(['output2/bootstrap/**','!output2/bootstrap'])
		.then(function (paths) {
		console.log('Deleted files/folders:\n', paths.join('\n'));
		cb();
		})
});

gulp.task('output3',["default"],function(){
	gulp.src([
		'asserts/vendor/**/*.js',
		'asserts/vendor/**/*.css'],{base:
		'asserts/vendor'})
		.pipe(gulp.dest('output3'));
})

gulp.task('output4',["default"],function(){
	gulp.src([
		'asserts/vendor/angular/angular*.js',
		'asserts/vendor/angular-animate/angular-*.js'
		])
		.pipe(gulp.dest('output4'));
})

gulp.task('watch',function(){
	gulp.watch('asserts/vendor/**/*.js',['output2']);
	
})

gulp.task('watch2',function(){
	gulp.watch('app/**/*.js',['default']);
})

//23 載入 gulp-concat 模組，並將多支 js 檔案合併成一支 讓前端頁面使用
//24 將所有 app 下的 js 檔案都進行 uglify 醜化處理，合併後輸出到 assets 資料夾
//25 將所有 app 下的 js 檔案都進行 uglify 醜化處理，合併後更名為 *.min.js 輸出到 assets 資料夾
gulp.task('concat-app',function(){
	
	gulp.src('app/**/*.module.js')
	.pipe(gulp.dest('src/app'))
	.pipe(concat('app.modules.js'))
	.pipe(gulp.dest('asserts'))
	.pipe(uglify())
	.pipe(rename(function(path){
		path.extname=".min.js"
	}))
	.pipe(gulp.dest('asserts'))
	
	gulp.src(['app/**/*.js','!app/**/*.module.js'])
	.pipe(gulp.dest('src/app'))
	.pipe(concat('app.bundles.js'))
	.pipe(gulp.dest('asserts'))
	.pipe(uglify({mangle:false}))
	.pipe(rename(function(path){
		path.extname=".min.js"
	}))
	.pipe(gulp.dest('asserts'))
	
})