Ext.define('netman.controller.Events',{
	extend: 'Ext.app.Controller',
	stores:[
		'Events',
		'Tags',
		'Messages',
		'Transformations',
	],
	init: function(){
		this.control({
			'eventlist': {
				itemdblclick: this.expandEvent,
				itemcontextmenu: function(view,record,node, index, e){
					var position = e.getXY();
					e.stopEvent();
					this.listMenu(position,record);
			
				},
				afterrender: this.refreshGrid,
				select: this.viewEvent
			},
			'[action=view]' : function (button){
				this.expandEvent
			},
			'eventtaggrid':{
				itemcontextmenu: function(view,record,node, index, e){
					var position = e.getXY();
					e.stopEvent();
					this.tagMenu(position,record);
				},
			},
			'eventlist menucheckitem' : {
				click: this.runsearch
			},
			'eventlist [action=reset]' : {
				click: this.reset
			},
			'[action=showall]' : {
				click: this.showall
			},
			'[action=devicefilter]' : {
				click: this.deviceFilter
			},
			'[action=viewdevice]' : {
				click: this.viewDevice
			},
			'[action=acknowledge]' : {
				click: this.acknowledge
			},
			'[action=suppress]' : {
				click: this.suppress
			},
			'[action=close]' : {
				click: this.close
			},
			'[action=syslogtags]' :{
				click: this.syslogtags
			},
			'[action=syslogmessages]' :{
				click: this.syslogmessages
			},
			'[action=tagfilter]':{
				click: this.tagfilter
			},
			'[action=csv]':{
				click: this.csv
			},
			'[action=refresh]':{
				click:this.setRefresh
			},
			'[action=checkTransform]':{
				click:this.checkTransform
			},
			'[action=checkSubscribe]':{
				click:this.checkSubscribe
			},
		});
	},
	close: function(button){
		var grid = Ext.ComponentQuery.query('eventlist')[0];
		var records = grid.getView().getSelectionModel().getSelection();
		events = [];
		Ext.each(records,function(me){events.push(me.data.id);},this);
		updateEvent(events,'4');
	},
	acknowledge: function(button){
		var grid = Ext.ComponentQuery.query('eventlist')[0];
		var records = grid.getView().getSelectionModel().getSelection();
		events = [];
		Ext.each(records,function(me){events.push(me.data.id);},this);
		updateEvent(events,'1');
	},
	suppress: function(button){
		var grid = Ext.ComponentQuery.query('eventlist')[0];
		var records = grid.getView().getSelectionModel().getSelection();
		events = [];
		Ext.each(records,function(me){events.push(me.data.id);},this);
		updateEvent(events,'2');
	},
	deviceFilter: function(button){
		var grid = Ext.ComponentQuery.query('eventlist')[0];
		var record = grid.getView().getSelectionModel().getSelection()[0];
		Ext.ComponentQuery.query('#event-devicename')[0].setValue(record.data.Name);
		this.runsearch();
	},
	viewDevice: function(button){
		var grid = Ext.ComponentQuery.query('eventlist')[0];
		var record = grid.getView().getSelectionModel().getSelection()[0];
		window.location = site_url + '/devices#' + record.data.Name;
	},
	tagfilter: function(button){
		var grid = Ext.ComponentQuery.query('eventtaggrid')[0];
		var record = grid.getView().getSelectionModel().getSelection()[0];
		Ext.ComponentQuery.query('#event-tagname')[0].setValue(record.data.Tag);
		this.runsearch();
	},
	listMenu: function(position,record){
	var view = Ext.ComponentQuery.query('eventlist')[0];
	 if(view.getView().getSelectionModel().getSelection().length == 1){
		var menu_grid = new Ext.menu.Menu({
			items:[
			{ text: 'Events for this device',action: 'devicefilter'},
			{ text: 'View device',action: 'viewdevice'}
			]
		});
		menu_grid.showAt(position);
	}
		else{
			this.selectionError();
		}
	},
	runsearch: function(){
		var grid = Ext.ComponentQuery.query('eventlist')[0];
		/* grid.getXFilterRow().storeSearch(); */
		autoFresh();
	},
	reset: function(grid){
		var grid = Ext.ComponentQuery.query('eventlist')[0];
		Ext.each(Ext.ComponentQuery.query('eventlist textfield'),function(me){me.setValue()},this)
		Ext.each(Ext.ComponentQuery.query('eventlist menucheckitem'),function(me){me.setChecked(false)},this)
		/*grid.getXFilterRow().storeSearch();*/
		autoFresh();
	},
	setRefresh: function(button){
		if(button.text){
			seconds = button.text.split(' ')[0];
		}
		else{
			seconds = second;
		}
		if ( seconds > 0 ){
			clearInterval(efresh);
			autoFresh();
			efresh = setInterval(autoFresh,seconds * 1000);
		}
		else{
			clearInterval(efresh);
			clearInterval(timer);
			Ext.ComponentQuery.query('#freshStats')[0].update('Auto update disabled');
		}
	},
	refreshGrid: function(){
		timer = setInterval(countdown,1000);
		efresh = setInterval(autoFresh,60000);
	},
	expandEvent: function(grid,record){
		this.viewEvent(grid,record);
		var details =  Ext.ComponentQuery.query('eventview')[0];
		details.expand();
	},
	viewEvent: function (grid,record){
		var view = Ext.ComponentQuery.query('eventlist')[0];
		var details =  Ext.ComponentQuery.query('eventview')[0];
		if(view.getView().getSelectionModel().getSelection().length == 1){
			details.down('form').loadRecord(record);
			this.data = record.data;
		}
		else{
			details.collapse();
		}
			
	},
	syslogtags: function(){
		var panel = Ext.widget('eventtags');
	},
	syslogmessages: function(){
		var panel = Ext.widget('eventmessages');
	},
	tagMenu: function(position,record){
		var menu_grid = new Ext.menu.Menu({
			items:[
			{ text: 'Add to filter',action: 'tagfilter'},
			]
		});
		menu_grid.showAt(position);
	},
	csv: function(button){
		store2csv('Events');
	},
	showall: function(grid){
		var grid = Ext.ComponentQuery.query('eventlist')[0];
		var store = Ext.getStore('Events');
		store.pageSize = store.getTotalCount();
		autoFresh();
		Ext.each(Ext.StoreManager.items,function(store){store.pageSize=User.PageSize;});
		/* grid.getXFilterRow().storeSearch(); */
	},
	checkTransform: function(button){
		var view = Ext.ComponentQuery.query('eventlist')[0];
		var details = Ext.widget('eventtransform');
		if(view.getView().getSelectionModel().getSelection().length == 1){
			/*
			details.down('form').loadRecord(record);
			this.data = record.data;
			*/
		}
		else{
			this.selectionError();
		}
	},
	checkSubscribe: function(button){
		var view = Ext.ComponentQuery.query('eventlist')[0];
		var details =  Ext.ComponentQuery.query('eventview')[0];
		var details = Ext.widget('eventsubscribe');
		if(view.getView().getSelectionModel().getSelection().length == 1){
			/*
			details.down('form').loadRecord(record);
			this.data = record.data;
			*/
		}
		else{
			this.selectionError();
		}
	},
	selectionError: function(){
		Ext.Msg.alert('Selection Error','Please select only one record.');
	},
	
	views:[
		'event.List',
		'event.View',
		'event.Search',
		'event.Tags',
		'event.Messages',
		'event.TagGrid',
		'event.Transform',
		'event.Subscribe',
		'event.SubscriptionList',
		'event.TransformationList',
	]
	
});
