var gulp = require('gulp');
gulp.task('default',["mytask1","mytask2"],function(){
	console.log('My Default Task');
})

gulp.task('mytask1',function(cb){
	console.log('Task1 Output');
	cb();
})

gulp.task('mytask2',function(cb){
	console.log('Task2 Output');
	cb();
})