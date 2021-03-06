///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js, leaflet.v0.5.1.js
// File:              map.js
//
// Author:          Erin Hamilton
// Email:           erin@erinhamilton.me
//
// Last Updated:    June 2014
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
function setMap(zoom, center){

	var acetate = L.tileLayer(
		'http://{s}.acetate.geoiq.com/tiles/acetate/{z}/{x}/{y}.png',	
		{
			attribution: 'GeoIQ'
		});


	var wgnhs = L.tileLayer.wms(
			//'http://gis.wgnhs.org/arcgis/services/dev/glacial_extents_topo/MapServer/WMSServer',
			'http://cyclone.ad.wgnhs.uwex.edu/arcgis/services/dev/glacial_extents_topo/MapServer/WMSServer',

			{
			format: 'image/png',
			layers: 1,
			transparent: true,
			opacity: 0.7,
			attribution: 'WGNHS'
		});	
		
		var wgnhsShade = L.tileLayer.wms(
			//'http://gis.wgnhs.org/arcgis/services/dev/glacial_extents_topo/MapServer/WMSServer',
			'http://cyclone.ad.wgnhs.uwex.edu/arcgis/services/dev/glacial_extents_topo/MapServer/WMSServer',

			{
			format: 'image/png',
			layers: 0,
			attribution: 'WGNHS'
		});	
		
		var baseMaps = {
			"Topography": wgnhs,
			"Streets": acetate
		};
		
		map = L.map('map', {
			center: center,
			zoom: zoom,
			maxZoom: 7,
			minZoom: 6,
			dragging: true,
			zoomControl: true,
			keyboard: false,
			doubleClickZoom: false,
			scrollWheelZoom: false,
			layers: [wgnhs, wgnhsShade]
	});
		
		
	//add a control to change the basemap tiles
	var baseLayerControl =   L.control.layers(baseMaps, null, {position: 'topright', collapsed: true});
	
	//add a scale bar
	L.control.scale({position: 'bottomright'}).addTo(map);
	
	//add max bounds to restrict panning
	var southWest = L.latLng(38.071, -95.645),
    northEast = L.latLng(50.077, -81.416),
    bounds = L.latLngBounds(southWest, northEast);
	map.setMaxBounds(bounds);
	
	
	baseLayerControl.addTo(map);
	loadLakes();
	loadGlaciers();
	loadMask();
	loadStates();
	
}




/**
 * Set the opacity of previous year to 1
 *@param: yearsIndex is timeStamp in timeline, the current years array index.
 */ 
function showVector(yearsIndex) {
		
	lakes[yearsIndex].setStyle({
        fillOpacity: 0.85
    });
	glaciers[yearsIndex].setStyle({
        fillOpacity: 1
    });
		
}

/**
 * Set the opacity of previous year to 1
 *@param: yearsIndex is timeStamp in timeline, the current years array index.
 */ 
	function clearVector(yearsIndex) {

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
	 * The glacier files. If current year, opacity 1, if not opacity 0
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
						fillOpacity: 1};
			}
			}).addTo(map);
		}
	
}
	
	
}
	
/**
 * US states and Canadian Province lines
 */ 
function loadStates() {
	states = new L.GeoJSON.AJAX("data/states.geojson", {
		style: function (feature) {
			return {
				color: "#808080",
				weight: 1,
				stroke: true,
				opacity: 1,
				fillOpacity: 0};
	}
	}).addTo(map);
	states.bringToFront();

}

/**
 * Load the mask that blocks out areas of no data
 */ 
function loadMask() {
	mask = new L.GeoJSON.AJAX("data/mask.geojson", {
		style: function (feature) {
			return {
				color: "#CDC8B1",
				weight: 0,
				opacity: 0,
				fillOpacity: 1};
	}
	}).addTo(map);
	mask.bringToFront();

}

