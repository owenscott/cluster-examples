var app = app || {};

app.ControlSectionView = Backbone.View.extend({
	
	
	//add all layers in the collection
	render: function() {
		this.collection && this.addAllLayers();
		return this.el;
	},
		
	addOneLayer: function(layerGroup) {
		
		var controlView = new app.LayerControlView({model:layerGroup});
		this.$el.append(controlView.el);

	},
	
	addAllLayers: function() {
		this.collection.each(this.addOneLayer, this);
	}
	
});