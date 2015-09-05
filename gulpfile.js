var gulp = require('gulp');
var del = require('del');

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

