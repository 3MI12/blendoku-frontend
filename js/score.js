// JavaScript Document
$(document).ready(function(){
	var time; 
	var score = 0;
	var skill = 2;
		
	setInterval(function(){
							score += skill*3; 
							$('.score').text(score);							
							}, 300);
});