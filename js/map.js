///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js, leaflet.v0.5.1.js
// File:              map.js
//
// Author:          Erin Hamilton
// Email:           erin@erinhamilton.me
//
// Last Updated:    March 2014
//
// Description:     Creates the Leaflet map displaying the glacial extents in
//                  Wisconsin. Fetches data from ArcGIS server asynchronously.
//                   
// Credits:         Funding provided by Great Lakes Mapping Coalition
//////////////////////////// 80 columns wide //////////////////////////////////

/**Global Variabls**/
var map;
var lakes = new Array();
var glaciers = new Array();
var states;

/**
 * Creates the map from leaflet and sets the view extent and tilelayer source.
 * Called from main.js initialize()
 */
function setMap(){
	var zoom = 7;
	var center = [44.25, -88.75];

	var acetate = L.tileLayer(
		'http://{s}.acetate.geoiq.com/tiles/acetate/{z}/{x}/{y}.png',	
		{
			attribution: 'Acetate tileset from GeoIQ'
		});


	var wgnhs = L.tileLayer.wms(
			//'http://gis.wgnhs.org/arcgis/services/dev/glacial_extents_topo/MapServer/WMSServer',
			'http://cyclone.ad.wgnhs.uwex.edu/arcgis/services/dev/glacial_extents_topo/MapServer/WMSServer',

			{
			format: 'image/png',
			layers: 1,
			transparent: true,
			opacity: 0.7,
			attribution: 'Wisconsin Geological and Natural History Survey tiles'
		});	
		
		var wgnhsShade = L.tileLayer.wms(
			//'http://gis.wgnhs.org/arcgis/services/dev/glacial_extents_topo/MapServer/WMSServer',
			'http://cyclone.ad.wgnhs.uwex.edu/arcgis/services/dev/glacial_extents_topo/MapServer/WMSServer',

			{
			format: 'image/png',
			layers: 0,
			attribution: 'Wisconsin Geological and Natural History Survey tiles'
		});	
		
		var baseMaps = {
			"Topography": wgnhs,
			"Streets": acetate
		};
		
		map = L.map('map', {
		center: center,
		zoom: zoom,
//		maxZoom: zoom,
//		minZoom: zoom,
		dragging: false,
		zoomControl: false,
		keyboard: false,
		doubleClickZoom: false,
		layers: [wgnhs, wgnhsShade]
	});
		
	var baseLayerControl =   L.control.layers(baseMaps, null, {position: 'topleft', collapsed: true});

	baseLayerControl.addTo(map);
	loadLakes();
	loadGlaciers();
	loadStates();
}
/**
 * Set the opacity of previous year to 1
 *@param: yearsIndex is timeStamp in timeline, the current years array index.
 */ 
function showVector(yearsIndex) {
		
	//lakes[yearsIndex].addTo(map);
	lakes[yearsIndex].setStyle({
        fillOpacity: 0.85
    });
	glaciers[yearsIndex].setStyle({
        fillOpacity: 0.9
    });
		
}

/**
 * Set the opacity of previous year to 1
 *@param: yearsIndex is timeStamp in timeline, the current years array index.
 */ 
	function clearVector(yearsIndex) {
//			var currYear;
//			if (yearsIndex === 0){
//				currYear = years.length-1;
//			}else{
//				currYear = yearsIndex-1;
//			}
			lakes[yearsIndex].setStyle({
		        fillOpacity: 0
		    });
			glaciers[yearsIndex].setStyle({
		        fillOpacity: 0
		    });
}
/**
 * Set the opacity of previous year to 1
 *@param: yearsIndex is timeStamp in timeline, the current years array index.
 */ 
function loadLakes() {
	
	
		for (var i = 0; i < years.length; i++){
			if(i>0){
				lakes[i] = new L.GeoJSON.AJAX("data/lakes1000/"+years[i]+".geojson", {
					style: function (feature) {
						return {color: "#63D1F4",
							stroke: false,
							fillOpacity: 0};
				}
				}).addTo(map);
			}else{
				lakes[i] = new L.GeoJSON.AJAX("data/lakes1000/"+years[i]+".geojson", {
					style: function (feature) {
						return {color: "#63D1F4",
							stroke: false,
							fillOpacity: 0.85};
				}
				}).addTo(map);
			}
		
	}
	
}
	
	/**
	 * Set the opacity of previous year to 1
	 *@param: yearsIndex is timeStamp in timeline, the current years array index.
	 */ 
	function loadGlaciers() {
		
		for (var i = 0; i < years.length; i++){
		
		if(i>0){
			glaciers[i] = new L.GeoJSON.AJAX("data/glaciers/"+years[i]+".geojson", {
				style: function (feature) {
					return {color: "#fefdfb",
						stroke: false,
						fillOpacity: 0};
			}
			}).addTo(map);
		}else{
			glaciers[i] = new L.GeoJSON.AJAX("data/glaciers/"+years[i]+".geojson", {
				style: function (feature) {
					return {color: "#fefdfb",
						stroke: false,
						fillOpacity: 0.9};
			}
			}).addTo(map);
		}
	
}
	
	
}
	
/**
 * Set the opacity of previous year to 1
 *@param: yearsIndex is timeStamp in timeline, the current years array index.
 */ 
function loadStates() {
	states = new L.GeoJSON.AJAX("data/states.geojson", {
		style: function (feature) {
			return {
				color: "#808080",
				weight: 1,
				stroke: true,
				opacity: 0.4,
				fillOpacity: 0};
	}
	}).addTo(map);

}
