// JavaScript Document
$(document).ready(function(){
	
	var tutorialGUI	= '<div class="tutorialGUI"></div>';
	
	
	$('.menu li.start').click(function(){
		$('#foreground').animate({opacity: "0"},1500, function(){
														$('#left').addClass('open');
														if($(window).width() < 769){
															$('.tablet_navi').addClass('open');
														}
														});
		$('#foreground').animate({left: "-100%"},1);
		
	});
	
	$('.menu li.tutorial').click(function(){
		$('#foreground').animate({opacity: "0"},1500,function(){
														$('#left').addClass('open');
														showOnlyBackToMainDeskop();
														$('.tutorialGUI').addClass('open');
														showOnlyBackToMainTablet();
														if($(window).width() < 769){
															
														}
														});	
		$('#foreground').animate({left: "-100%"},1);
		
	});
	
	$('.menu li.level').click(function(){
		$('#foreground').animate({opacity: "0"},1500,function(){
														$('#left').addClass('open');
														showOnlyBackToMainDeskop();
														$('.difficultySelection').addClass('open');
														if($(window).width() < 769){
															showOnlyBackToMainTablet();
														}	
														});	
		$('#foreground').animate({left: "-100%"},1);	
					
									
	});
	
	$('.difficultySelection .difficulty').click(function(){
		$('.difficultySelection').removeClass('open');
		$('.allLevels').addClass('open');
	});
	
	
	
	$('.back').click(function(){
		resetMobileNav();
		$('.back.open').removeClass('open');
		$('#left.open').removeClass('open');
		$('.tutorialGUI').removeClass('open');
		$('.difficultySelection').removeClass('open');
		$('.allLevels').removeClass('open');
		$('#left .finish').css('display', 'block');
		$('#left .score').css('display', 'block');
		$('#foreground').animate({left: "0"},1);
		$('#foreground').animate({opacity: "1"},1500);
    });
	
	
	function resetMobileNav(){
		$('.tablet_navi').removeClass('open');
		$('.tablet_navi .finish').css('dispaly', 'block');
		$('.tablet_navi .score').css('display','block');
	}
	
	function showOnlyBackToMainTablet(){
		$('.tablet_navi').addClass('open');
		$('.tablet_navi.open .finish').css('display', 'none');
		$('.tablet_navi .score').css('display', 'none');
	}
	
	function showOnlyBackToMainDeskop(){
		$('#left .finish').css('display', 'none');
		$('#left .score').css('display', 'none');
	}
	
});