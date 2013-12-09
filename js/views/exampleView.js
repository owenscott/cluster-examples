var app = app || {};



app.ExampleView = Backbone.View.extend( {
	
	template: _.template($('#map-example-template').html()),
	
	initialize: function() {
		//render blank template
		this.$el.html(this.template);
		this.$map = this.$('.map-div');
		this.$controls = this.$('.control-div');
		this.render();
	},
	
	render: function() {
		
		//create new map pane (minor kludge to update map size after rendering
		//which prevents weird leaflet behaviour
		var mapView = new app.MapView({collection:this.collection});
		this.$map.html(mapView.render());
		mapView.map.invalidateSize();
				
		//create a new map control view
		var controlView = new app.ControlSectionView({collection:this.collection});
		this.$controls.html(controlView.render());
		return this;
		
	}
	
});