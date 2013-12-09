var app = app || {};

$(document).ready(function() {
	
	var adm2PolyLayer,
			adm1PolyLayer,
			adm1PointLayer,
			adm2PolyLayer,
			adm2PointLayer,
			projectSiteLayer,
			countryOutline,
			pointToLayer,
			polyStyle,
			createClusteredLayer
	
	//default point to layer function for styling leaflet point layers
	circleMarker = function(radius) {
		return function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: radius,
				fillColor: '#F1D357',
				color: '#000000',
				weight: 1,
				opacity: 1,
				fillOpacity: 0.7
			});
		};
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
	
	//get adm0 polys and create reuseable backbone model
	$.ajax('data/adm0Polys.json', {async:false}).done(function(data) {
		adm0PolyLayer = new app.Layer({ geoJson: JSON.parse(data), leafletSettings: { style: polyStyle } });
	});
	
	//get adm1 polys and create reuseable backbone model
	$.ajax('data/adm1Polys.json', {async:false}).done(function(data) {
		adm1PolyLayer = new app.Layer({ geoJson: JSON.parse(data), leafletSettings: { style: polyStyle } });
	});
	
	//get adm1 points and create reuseable backbone model
	$.ajax('data/adm1PointsRandom.json', {async:false}).done(function(data) {
		adm1PointLayer = new app.Layer({ geoJson: JSON.parse(data), leafletSettings: { pointToLayer: circleMarker(6) } });
	});
	
	//get adm2 polys and create reuseable backbone model
	$.ajax('data/adm2Polys.json', {async:false}).done(function(data) {
		adm2PolyLayer = new app.Layer({ geoJson: JSON.parse(data), leafletSettings: { style: polyStyle } });
	});
	
	//get adm2 points and create reuseable backbone model
	$.ajax('data/adm2PointsRandom.json', {async:false}).done(function(data) {
		adm2PointLayer = new app.Layer({ geoJson: JSON.parse(data), leafletSettings: { pointToLayer: circleMarker(6) } });
	});
	
	//get project site points and create reuseable backbone model
	$.ajax('data/projectSitePoints.json', {async:false}).done(function(data) {
		projectSiteLayer = new app.Layer({ geoJson: JSON.parse(data), leafletSettings: { pointToLayer: circleMarker(2) } });
	});
	
	
	//create ADM0 layer group (polys only);
	function getAdm0LayerGroup(settings) {
		var layerGroup = new app.LayerGroup()
			.addLayer (adm0PolyLayer.getLeafletLayer());
		for (var s in settings) {
			layerGroup.set(s, settings[s]);
		}
		return layerGroup;
	}
	
	//create ADM1 layer group (points and polys combined)
	function getAdm1LayerGroup(settings) {
		var layerGroup = new app.LayerGroup()
			//.addLayer( new L.markerClusterGroup({maxClusterRadius:1}).addLayer(adm1PointLayer.getLeafletLayer()) )
			.addLayer( adm1PolyLayer.getLeafletLayer() )
			.addLayer( new L.markerClusterGroup({maxClusterRadius:1}).addLayer(adm1PointLayer.getLeafletLayer()) )
		for (var s in settings) {
			layerGroup.set(s, settings[s]);
		}
		return layerGroup;
	}
	
	//create ADM1 layer group (points and polys combined)
	function getAdm2LayerGroup(settings) {
		var layerGroup = new app.LayerGroup()
			//.addLayer( new L.markerClusterGroup({maxClusterRadius:1}).addLayer(adm1PointLayer.getLeafletLayer()) )
			.addLayer( adm2PolyLayer.getLeafletLayer() )
			.addLayer( new L.markerClusterGroup({maxClusterRadius:1}).addLayer(adm2PointLayer.getLeafletLayer()) )
		for (var s in settings) {
			layerGroup.set(s, settings[s]);
		}
		return layerGroup;
	}
	
	function getProjectSiteLayerGroup(settings) {
		var layerGroup = new app.LayerGroup()
			.addLayer( projectSiteLayer.getLeafletLayer() );
		for (var s in settings) {
			layerGroup.set(s, settings[s]);
		}
		return layerGroup;
	}
	
	function getProjectSiteAdm2LayerGroup(settings) {
		var layerGroup = new app.LayerGroup()
			.addLayer( projectSiteLayer.getLeafletLayer())
			.addLayer( adm2PolyLayer.getLeafletLayer());
		for (var s in settings) {
			layerGroup.set(s, settings[s]);
		}
		return layerGroup;
	}
	
	//=====MAP 1=====
	//Administrative Layers: Change at zoom level.
	//Project Sites: Toggle with a checkbox.
	
	var map1 = new app.LayerGroupCollection()
		.add(getAdm0LayerGroup({title:'Country Outline', toggleApproach:'none', displayed:true}))
		.add(getAdm1LayerGroup({title:'Provinces', toggleApproach:'zoom', minZoom:1, maxZoom:5, displayed:true}))
		.add(getAdm2LayerGroup({title:'Districts', toggleApproach:'zoom', minZoom:6, maxZoom:Infinity, displayed:true}))
		.add(getProjectSiteLayerGroup({title:'Project Sites', toggleApproach:'checkbox',displayed:false}));
	
	new app.ExampleView({collection:map1, el:'#map1'});
	
	//=====MAP 2=====
	//Administrative Layers: Change at zoom level.
	//Project Sites: Change at zoom level.
	
	var map2 = new app.LayerGroupCollection()
		.add(getAdm0LayerGroup({title:'Country Outline', toggleApproach:'none', displayed:true}))
		.add(getAdm1LayerGroup({title:'Provinces', toggleApproach:'zoom', minZoom:1, maxZoom:5, displayed:true}))
		.add(getAdm2LayerGroup({title:'Districts', toggleApproach:'zoom', minZoom:6, maxZoom:6, displayed:true}))
		.add(getProjectSiteAdm2LayerGroup({title:'Project Sites', toggleApproach:'zoom', minZoom:7, maxZoom: Infinity, displayed:false}));
	
	new app.ExampleView({collection:map2, el:'#map2'});
	
	//=====MAP 3=====
	//Administrative Layers: Radio.
	//Project Sites: Checkbox.
	
	var map3 = new app.LayerGroupCollection()
		.add(getAdm0LayerGroup({title:'Country Outline', toggleApproach:'none', displayed:true}))
		.add(getAdm1LayerGroup({title:'Provinces', toggleApproach:'radio', minZoom:1, maxZoom:5, displayed:true}))
		.add(getAdm2LayerGroup({title:'Districts', toggleApproach:'radio', minZoom:6, maxZoom:6, displayed:false}))
		.add(getProjectSiteLayerGroup({title:'Project Sites', toggleApproach:'checkbox', minZoom:7, maxZoom: Infinity, displayed:false}));
	
	new app.ExampleView({collection:map3, el:'#map3'});
	
	//=====MAP 4=====
	//Administrative Layers: Radio.
	//Project Sites: Radio.
	
	var map4 = new app.LayerGroupCollection()
		.add(getAdm0LayerGroup({title:'Country Outline', toggleApproach:'none', displayed:true}))
		.add(getAdm1LayerGroup({title:'Provinces', toggleApproach:'radio', minZoom:1, maxZoom:5, displayed:true}))
		.add(getAdm2LayerGroup({title:'Districts', toggleApproach:'radio', minZoom:6, maxZoom:6, displayed:false}))
		.add(getProjectSiteAdm2LayerGroup({title:'Project Sites', toggleApproach:'radio', minZoom:7, maxZoom: Infinity, displayed:false}));
	
	new app.ExampleView({collection:map4, el:'#map4'});
	
	//=====MAP 5=====
	//Administrative Layers: Checkbox.
	//Project Sites: Checkbox.
	
	var map5 = new app.LayerGroupCollection()
		.add(getAdm0LayerGroup({title:'Country Outline', toggleApproach:'none', displayed:true}))
		.add(getAdm1LayerGroup({title:'Provinces', toggleApproach:'checkbox', minZoom:1, maxZoom:5, displayed:true}))
		.add(getAdm2LayerGroup({title:'Districts', toggleApproach:'checkbox', minZoom:6, maxZoom:6, displayed:false}))
		.add(getProjectSiteAdm2LayerGroup({title:'Project Sites', toggleApproach:'checkbox', minZoom:7, maxZoom: Infinity, displayed:false}));
	
	new app.ExampleView({collection:map5, el:'#map5'});

});

