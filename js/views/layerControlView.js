var app = app || {};

app.LayerControlView = Backbone.View.extend({
	
	tagName: 'div',
	
	events: {
		'click input[type=checkbox]' : 'toggleVisibility',
		'change input[type=radio]:checked' : 'onRadioSelect',
		'deselect input[type=radio]:not(:checked)' : 'onRadioDeselect' //custom event triggered by onRadioSelect function
	},
	
	onRadioSelect: function() {
		
		//kludgy thing to make up for radios not having 'deselect' listeniners
		$('input[type=radio]:not(:checked)').trigger('deselect'); 
		
		//display layer
		this.model.set('displayed', true);
		
	},
	
	initialize: function() {
		this.$el.addClass('layer-control');
		this.listenTo(this.model, 'change:displayed', this.updateStatus)
		if (this.model.attributes.toggleApproach !== 'none') {
			this.render();
		}
	},
	
	onRadioDeselect: function() {
		//display layer
		this.model.set('displayed', false);
	},
	
	render: function() {
		
		if (this.model.attributes.displayed === true) {
			this.$el.addClass ('enabled')
		}
		else {
			this.$el.removeClass ('enabled')
		}
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
	template: _.template($('#layer-control-template').html()),
	
	updateStatus: function() {
		this.render();
	},
	
	toggleVisibility: function() {
		this.model.toggleDisplayed();
	},
	
	turnOnVisibility : function() {
		this.model.set('displayed', true);
	},
	
	turnOffVisibility : function() {
		this.model.set('displayed', false);
	}
	
	
	
});