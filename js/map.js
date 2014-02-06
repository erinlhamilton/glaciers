///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js, leaflet.v0.5.1.js
// File:              map.js
//
// Author:          Erin Hamilton
// Email:           erin@erinhamilton.me
//
// Last Updated:    December 2013
//
// Description:     Creates the Leaflet map displaying the glacial extents in
//                  Wisconsin. Fetches data from ArcGIS server asynchronously.
//                   
// Credits:         Funding provided by Great Lakes Mapping Coalition
//////////////////////////// 80 columns wide //////////////////////////////////

/**Global Variabls**/
var map;
var glaciers;
var lakes;
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
		maxZoom: zoom,
		minZoom: zoom,
		dragging: false,
		zoomControl: false,
		keyboard: false,
		doubleClickZoom: false,
		layers: [wgnhs, wgnhsShade]
	});
		
	var baseLayerControl =   L.control.layers(baseMaps, null, {position: 'topleft', collapsed: true});

	baseLayerControl.addTo(map);
	
	var geojsonLayer = new L.GeoJSON.AJAX("http://erinhamilton.me/glacial/data/lakes1000/11000.geojson",{dataType:"jsonp"});
	
	L.geoJson(geojsonLayer, {
	    style: function (feature) {
	        return {color: "#63D1F4"};
	    }
	}).addTo(map);
	
	
}