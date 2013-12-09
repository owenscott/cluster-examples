var app = app || {};

app.LayerGroup = Backbone.Model.extend({
	
	defaults: {
		title: '',
		displayed: true,
		maxZoom: null, //also have to set toggleApproach to 'zoom'
		minZoom: null, //same
		toggleApproach: 'checkbox' //zoom, radio, checkbox, 
	},
	
	initialize: function () {
		this.layers = new L.layerGroup();
	},
	
	addLayer: function(leafletLayer) {
		this.layers.addLayer(leafletLayer);
		return this;
	},
	
	toggleDisplayed: function() {
		if (this.attributes.displayed === true ) {
			this.set('displayed', false);
		}
		else {
			this.set('displayed', true);
		}
	}
	
	
});