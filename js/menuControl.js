// JavaScript Document
$(document).ready(function(){
	
	var tutorialGUI	= '<div class="tutorialGUI"></div>';
	
	
	$('.menu li.start').click(function(){
		$('#foreground').animate({opacity: "0"},1500, function(){$('.back').addClass('open');
																 $('#left').addClass('open');
																 });
		$('#foreground').animate({left: "-100%"},1);
	});
	
	$('.menu li.tutorial').click(function(){
		$('#foreground').animate({opacity: "0"},1500,function(){
														$('.back').addClass('open');
														$('#left').addClass('open');
														$('#left .finish').css('display', 'none');
														
														$('.tutorialGUI').addClass('open');
														});	
		$('#foreground').animate({left: "-100%"},1);
	});
	
	$('.menu li.level').click(function(){
		$('#foreground').animate({opacity: "0"},1500,function(){
														$('.back').addClass('open');
														$('#left').addClass('open');
														$('#left .finish').css('display', 'none');
														$('.difficultySelection').addClass('open');
														});	
		$('#foreground').animate({left: "-100%"},1);														
	});
	
	$('.difficultySelection .easy').click(function(){
		$('.difficultySelection').removeClass('open');
		$('.allLevels').addClass('open');
	});
	
	
	
	$('.back').click(function(){
		$('.back.open').removeClass('open');
		$('#left.open').removeClass('open');
		$('.tutorialGUI').removeClass('open');
		$('.difficultySelection').removeClass('open');
		$('.allLevels').removeClass('open');
		$('#left .finish').css('display', 'block');
		$('#foreground').animate({left: "0"},1);
		$('#foreground').animate({opacity: "1"},1500);
    });
	
	
	
	
});