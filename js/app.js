var app = app || {};

app.map = {};



$(document).ready(function() {
	
	var adm1PolyLayer,
			adm1PointLayer,
			adm2PolyLayer,
			adm2PointLayer,
			projectSiteLayer,
			countryOutline,
			pointToLayer,
			polyStyle,
			createClusteredLayer
	
	//default point to layer function for styling leaflet point layers
	pointToLayer = function (feature, latlng) {
		return L.circleMarker(latlng, {
			radius: 4,
			fillColor: '#ff7780',
			color: '#000000',
			weight: 1,
			opacity: 1,
			fillOpacity: 0.7
		});
	};
	
	//default function for styling leaflet polygon layers
	polyStyle = function() {
		return {
			weight:1,
			color: '#000000',
			fillOpacity:0,
			fillColor:'#ffffff'
		}
	};
	
	//function for creating a clustered layer from a point layer
	createClusteredLayer = function (layer) {
		return new L.markerClusterGroup({maxClusterRadius:1}).addLayer(layer);
	}
	
	//get adm1 points and create reuseable backbone model (ya, I know, sync ajax, but it's a prototype hack...)
	$.ajax('data/points.json', {async:false}).done(function(data) {
		adm1PointLayer = new app.Layer({ geoJson: JSON.parse(data), leafletSettings: { pointToLayer: pointToLayer	}	}); 
	});
	
	//get adm1 polys and create reuseable backbone model
	$.ajax('data/states.json', {async:false}).done(function(data) {
		adm1PolyLayer = new app.Layer({ geoJson: JSON.parse(data), leafletSettings: { style: polyStyle } });
	});
	
	//create ADM1 layer group (points and polys combined)
	var adm1Layer = new app.LayerGroup()
		.addLayer( createClusteredLayer( adm1PointLayer.getLeafletLayer() ) )			 
		.addLayer( adm1PolyLayer.getLeafletLayer() ) 
	
	console.log(adm1Layer);
	console.log($.extend(true, {}, adm1Layer));
	
	//=====MAP 1=====
	//Administrative Layers: Change at zoom level.
	//Project Sites: Toggle with a checkbox.
	
	var map1 = new app.LayerGroupCollection().add(adm1Layer);
		
		
	new app.ExampleView({collection:map1, el:'#map1'});
	
	//app.appView = new app.AppView();

});

