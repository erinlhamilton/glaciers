///////////////////////////////////////////////////////////////////////////////
// Title:           Laurentide Ice Sheet Ice-Margin Positions
//
// Source Files:    jQuery.v1.9.1.min.js, jquery-ui-1.10.3.custom.min.js,
//		    		map.js, timeline.js
//			
// Author:          Erin Hamilton
// Email:           erin@erinhamilton.me
//
// Last Updated:    December 2013
//
// Description:     Controls main functionality of Wisconsin Glacial Extents.
//                  Calls functions to create map, timeline, and dialog on 
//                  page load.
//                   
// Credits:         Funding provided by Great Lakes Mapping Coalition
//////////////////////////// 80 columns wide //////////////////////////////////

/** Global Variables*/
//Years array. Change the years in this array if new dates are added or taken away. 
var years = ["31500", "31000", "30000", "29500", "29000", "28500", "28000", "27500", "27000", "26500", "26000",
"25500", "25000", "24500", "24000", "23500", "23000", "22500", "22000", "21500", "21000", "20500",
"20000", "19500", "19000", "18500", "18000", "17000", "16600", "16000", "15750", "15500", "15250", 
"15000", "14600", "14000", "13500", "13250", "13100", "12900", "12500", "12000", "11500", "11000"];

var lakeYears = ['-31500', '-31000', '-30000', '-29500', '-29000', '-28500', '-28000', '-27500', '-27000', '-26500', '-26000',
'-25500', '-25000', '-24500', '-24000', '-23500', '-23000', '-22500', '-22000', '-21500', '-21000', '-20500',
'-20000', '-19500', '-19000', '-18500', '-18000', '-17000', '-16600', '-16000', '-15750', '-15500', '-15250', 
'-15000', '-14600', '-14000', '-13500', '-13250', '-13100', '-12900', '-12500', '-12000', '-11500', '-11000'];

//var yearText = (function () {
//    var yearText = null;
//    $.ajax({
//        'async': false,
//        'global': false,
//        'url': '../glacial/data/yearWords.json',
//        'dataType': "json",
//        'success': function (data) {
//            yearText = data;
//        }
//    });
//    return yearText;
//})();



/**
 * On page load, call functions to create map, timeline, and dialog.
 */
function initialize() {
	"use strict";
	setMap();
	
}


/**
 * After page finishes loading, jQuery call to function initialize.
 */
$(initialize);

$(window).on("resize", function() {
    $("#map").height($(window).height()).width($("#map-container").width());
    	if ($("#map").height() > 700){
    		$("#map").height(700);
    	};
   // map.invalidateSize();
}).trigger("resize");

// 
