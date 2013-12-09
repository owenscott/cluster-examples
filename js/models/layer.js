//simple model that takes a geoJson file and some leaflet settings and creates a leaflet layer on instantiation
//note: requires leaflet, backbone, jquery, underscore



var app = app || {};

app.Layer = Backbone.Model.extend({
	
	defaults: {
		geoJson: null,
		leafletSettings: {}
	},
	
	initialize: function() {
		this._createLeafletLayer()
	},
	
	_createLeafletLayer: function () {
		var settings = settings || {};
		if (this.attributes.geoJson) {
			this._leafletLayer = function() { return L.geoJson (this.attributes.geoJson, this.attributes.leafletSettings); }
		}
	},
	
	getLeafletLayer: function() {
		return this._leafletLayer();
	}
	
});

