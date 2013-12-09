//view contains a single map

var app = app || {};

app.MapView = Backbone.View.extend({
	
	self: this,
	
	tagName: 'div',
	
	initialize: function() {
		this.listenTo(this.collection, 'change:displayed', this.updateLayerDisplay);
	},
	
	render: function() {
		
		var self = this;
		
		//create a leaflet map
		this.map = L.map(this.el,{
			dragging:true,
			doubleClickZoom:true,
			minZoom:4,
			maxZoom:10
		});
	
		//set new view
		this.map.setView([40,-100], 4);
		
		//set zoom listeners (zoomend) => bind with apply to ensure right scope for this
		this.map.on('zoomend', function () {self.updateLayerDisplay.apply(self)})		
		
		//add all layers in the collection
		this.collection && this.addAllLayers();
		
		//check layer display
		this.updateLayerDisplay();
		
		//return element
		return this.el;
	},
	
	addOneLayer: function(layerGroup) {
		if (layerGroup.attributes.displayed === true) {
			this.map.addLayer(layerGroup.layers);
		}
	},
										
	
	removeOneLayer: function(layerGroup) {
		this.map.removeLayer(layerGroup.layers);
	},
	
	addAllLayers: function() {
		this.collection.each(this.addOneLayer, this);
	},
	
	updateLayerDisplay: function () {
		this.collection.each(this.checkLayerDisplay, this);
	},
	
	checkLayerDisplay: function (layerGroup) {
		
		var zoomLevel = this.map.getZoom();
		if (layerGroup.attributes.toggleApproach === 'zoom' && layerGroup.attributes.minZoom && layerGroup.attributes.maxZoom) {
			if (zoomLevel >= layerGroup.attributes.minZoom && zoomLevel <= layerGroup.attributes.maxZoom) {
				layerGroup.set('displayed', true);
			}
			else {
				layerGroup.set('displayed', false);
			}
		}
		
		if ( layerGroup.attributes.displayed === true && this.map.hasLayer(layerGroup.layers) === false) {
			this.addOneLayer(layerGroup);
		}
		else if (layerGroup.attributes.displayed === false && this.map.hasLayer(layerGroup.layers) === true) {
			this.removeOneLayer(layerGroup);
		}
			
	}
	
});