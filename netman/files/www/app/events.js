Ext.require([
	'Ext.util.History',
]);
var egridrefresh = '';
Ext.application({
	name: 'netman',
	appFolder: 'app',
	launch: function(){
	        var task = new Ext.util.DelayedTask(function() {
			splashscreen.fadeOut({
				duration: 1000,
				remove: true
			});
			splashscreen.next().fadeOut({
				duration: 1000,
				remove: true,
				listeners: {
					afteranimate: function(){
						Ext.getBody().unmask();
					}
				}
			});
		});
		task.delay(1000);
		Ext.create('Ext.container.Viewport',{
			requires: [
				'Ext.resizer.Splitter',
				'Ext.fx.target.Element',
				'Ext.fx.target.Component'
			],
			layout: 'border',
			items:[
			{
				xtype: 'container',
				region: 'north',
				layout: 'border',
				height: 70,
				items: [
					{
						xtype: 'box',
						id: 'main_nav',
						height:40,
						html: mainnav,
						region:'west'
					},
					{
						xtype: 'usericon',
						region:'east'
					},
					{
						xtype:'box',
						height:30,
						id: 'crumbs',
						region:'south',
						html: "<a href='events'>Events</a>",
					}
				]
			},
			{
					xtype: 'eventsearch',
					region: 'center'
				}
		]
		}
		);
	},
	controllers: [
		'Users',
		'Events',
	]
});
var splashscreen;

Ext.onReady(function() {
	splashscreen = Ext.getBody().mask('Loading...', 'splashscreen');
	splashscreen.addCls('splashscreen');
	Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], { cls: 'x-splash-icon' });
});
function updateEvent(records,stat){
	if (records.length > 0){
		var comment = '';
		Ext.Msg.prompt('Press OK to update event status','Enter any comments about the event status change:',function(btn,text){
			if(btn == 'ok'){
				comment = text;
				url = 'data/update/events.php?action=' + stat + '&events=' + records + '&comment=' + comment;
				Ext.Ajax.request({
					url:url,
					success: function(response, opts){
						var grid = Ext.ComponentQuery.query('eventlist')[0];
						grid.getXFilterRow().storeSearch();
					},
					failure: function(response, opts){
						Ext.Msg.alert('Event Update','Unable to process request');
					},
				});
			}
		});
	}
}
var efresh = '';
var second = 60;
var seconds = 60;
var timer;
function autoFresh(){
	second = seconds;
	clearInterval(timer);
	timer = setInterval(countdown, 1000);
	/* Sets the auto refresh for events grid */
	/* Ext.getStore('Events').load() */
	var grid = Ext.ComponentQuery.query('eventlist')[0];
	grid.getXFilterRow().storeSearch();
}
function countdown() {
	second--;
	if(second > 0) {
		Ext.ComponentQuery.query('#freshStats')[0].update('Updating in ' + second + ' seconds');
	}
}
