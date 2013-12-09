var app = app || {};

app.LayerGroupCollection = Backbone.Collection.extend({
	model: app.LayerGroup,
	title: ''
});