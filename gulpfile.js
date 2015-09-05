var gulp = require('gulp');
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

gulp.task('output2',["default"],function(){
	gulp.src('asserts/vendor/bootstrap/**/*.js',{base:'asserts'})
	.pipe(gulp.dest('output2'));	
})

gulp.task('output3',["default"],function(){
	gulp.src([
		'asserts/vendor/**/*.js',
		'asserts/vendor/**/*.css'],{base:
		'asserts/vendor'})
		.pipe(gulp.dest('output3'));
})