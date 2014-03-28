///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js, jQuery.v1.9.1.min.js, 
//                    jquery-ui-1.10.3.custom.min.js
// File:              map.js
//
// Author:          Erin Hamilton
// Email:           erin@erinhamilton.me
//
// Last Updated:    March 2014
//
// Description:    Creates the jQuery UI slider for timeline control, as well
//                 as timer module and play/pause/step buttons.
//                   
// Credits:        Funding provided by Great Lakes Mapping Coalition
//////////////////////////// 80 columns wide //////////////////////////////////

/**
 * Global Variables
 */
var startTime = 0;
var timeStamp = startTime;//start date of slider. Updated when slider moves or play is clicked.
var timeInterval = 1000; //intial animation speed in miliseconds
var endTime = years.length-1; //end time is the length of the years array
var timer;



/**
 * On play, step, or grab of slider, call this function to change layers on map
 *
 */
function animateMap(){
	clearVector(timeStamp);//-->map.js
	if (timeStamp < endTime) {
		timeStamp = timeStamp + 1;
	}
	else{
		timeStamp = startTime;
	}
	showVector(timeStamp);//-->map.js	
	updateTimeline(timeStamp);
}

/**
 * Function that adds commas to a number (i.e. 10000 turns
 * into 10,000).
 * 
 */
 function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

/**
 * Updates the slider to correct position and updates the displayed date
 * text with the currently displayed year.
 * @param: currentTime is timeStamp, or the current year.
 */
function updateTimeline(currentTime){
	$("#yearText").html(commaSeparateNumber(years[currentTime]));
	//$( "#glacierText h5 b" ).html(commaSeparateNumber(years[currentTime]));
	$( "#glacierText p" ).html(yearText[years[currentTime]]);
}

/**
 * Create and set jQuery timer for use in animation
 * and initiate it with an interval
 */
timer = $.timer(function() {
	animateMap();
});
timer.set({ time : timeInterval, autostart : false });

/**
 * Back button to step backwards on the timeline
 */
$( "#back" ).click(function(){
	timer.stop();
	clearVector(timeStamp);//-->map.js
	if(timeStamp > startTime){
		timeStamp = timeStamp - 1;
	}else{
		timeStamp = endTime;
	}
	showVector(timeStamp);//-->map.js
	updateTimeline(timeStamp);
	$("#pause").hide();
	$("#play").show();
	
});

/**
 * Play button to play animation on timeline and map
 */ 
$( "#play" ).click(function(){
		timer.play();
		$("#play").hide();
		$("#pause").show();
		$("#glacierText").hide();
});


/**
 * Pause animation at current year (timeStamp)
 */
$( "#pause" ).click(function(){
	timer.stop();
	$("#pause").hide();
	$("#play").show();
	$("#glacierText").show();
	
	});
  

/**
 * Stop button sets time back to start.
 */
//$( "#stop" ).click(function(){
//	timer.stop();
//	clearVector(timeStamp);//-->map.js
//	timeStamp = startTime;
//	showVector(timeStamp);//-->map.js
//	updateTimeline(timeStamp);
//	$("#pause").hide();
//	$("#play").show();
//	$("#glacierText").show();
//});

/**
 * Forward button to step forward on timeline
 */
$( "#forward" ).click(function(){
		timer.stop();
		clearVector(timeStamp);//-->map.js
		if(timeStamp < endTime){
			timeStamp = timeStamp + 1;
		}
		else{
			timeStamp = startTime;
		}
		showVector(timeStamp);//-->map.js
		updateTimeline(timeStamp);
		$("#pause").hide();
		$("#play").show();
});
