
	
	
	
  function levelTime(startTime){
    var time = new Date();
		var currentTime = time.getTime();
    levelTime = startTime - currentTime;
    return levelTime;
  }
  
  function score(){
    var startTime, maxTime, levelTime; // time -> Date-object; startTime, maxTime, currentTime -> variables to messure playtime; checkTime -> interval
    var score;
    var complexity;										  // complexity of current level
		
    startTime = level["starttime"];
    complexity = level["complexity"]; ;	// gets the multiplicator for highscore-calculation -> depending on which is the current level
    
    maxTime = 30000 *complexity // 60000 = one minute
    
    var levelTime = levelTime(startTime);
    console.log("levelTime: " + levelTime);
    
    var score = levelTime * 100;
    return score;
  }
	
	//$('.finish').click(function(){
	//	if($(this).hasClass('playing')){
	//		$(this).removeClass('playing');
	//		
	//		clearInterval(checkTime);	// stop the interval
	//		
	//		sendJson(startTime, score);		// send highscore to server
	//		
	//	}
	//	else{
	//		$(this).addClass('playing');
	//		$(this).text('lösen');
	//		time = new Date();
	//		startTime = time.getTime();
	//		startTimeCheck(startTime);		// check if player is to slow or what score he/she is achiving
	//	}
	//});
	//
	//function startTimeCheck(startTime){
	//	checkTime = setInterval(function(){
	//						time = new Date();
	//						currentTime = time.getTime();
	//							// if maxTime is reached the player has failed
	//							if((currentTime - startTime) > maxTime){
	//								$('.score').text('zu langsam!');
	//								clearInterval(checkTime);
	//							}
	//						// if needed time is less than maxTime the score is calculated by substracting needed time (currentTime - startTime) from maxTime
	//						score = maxTime-(currentTime-startTime);
	//						$('.score').text(score);	// current score is shown. counts down from maxTime
	//						},100);
	//}