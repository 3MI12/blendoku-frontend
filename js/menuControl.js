// JavaScript Document
$(document).ready(function(){
	
	var tutorialGUI	= '<div class="tutorialGUI"></div>';
	
	
	$('.menu li.start').click(function(){
		$('#foreground').animate({opacity: "0"},1500, function(){$('.back').addClass('open');
																 $('#left').addClass('open');
																 });
		$('#foreground').animate({left: "-100%"},1);
		if($(window).width() < 769){
			$('.tablet_navi').addClass('open');
		}
	});
	
	$('.menu li.tutorial').click(function(){
		$('#foreground').animate({opacity: "0"},1500,function(){
														$('.back').addClass('open');
														$('#left').addClass('open');
														$('#left .finish').css('display', 'none');
														
														$('.tutorialGUI').addClass('open');
														});	
		$('#foreground').animate({left: "-100%"},1);
		if($(window).width() < 769){
			showOnlyBackToMain()
		}
	});
	
	$('.menu li.level').click(function(){
		$('#foreground').animate({opacity: "0"},1500,function(){
														$('.back').addClass('open');
														$('#left').addClass('open');
														$('#left .finish').css('display', 'none');
														$('.difficultySelection').addClass('open');
														});	
		$('#foreground').animate({left: "-100%"},1);	
		if($(window).width() < 769){
			showOnlyBackToMain();
		}				
		alert($( window ).width());									
	});
	
	$('.difficultySelection .easy').click(function(){
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
		$('#foreground').animate({left: "0"},1);
		$('#foreground').animate({opacity: "1"},1500);
    });
	
	
	function resetMobileNav(){
		$('.tablet_navi').removeClass('open');
		$('.tablet_navi .finish').css("dispaly", "block");
		$('.tablet_navi .score').css("display","block");
	}
	
	function showOnlyBackToMain(){
		$('.tablet_navi').addClass('open');
		$('.tablet_navi .finish').css("dispaly", "none");
		$('.tablet_navi .score').css("display","none");
		
	}
	
});