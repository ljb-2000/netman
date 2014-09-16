Ext.define('netman.controller.Devices',{
	extend: 'Ext.app.Controller',
	stores:[
		'Devices',
		'DeviceComponents',
		'Classes',
		'Durations',
		'States',
		'Layers',
		'Domains',
		'Events',
		'History',
		'Maintenance',
		'Properties',
		'Graphs',
		'Interfaces'
	],
	init: function(){
		this.control({
			'devicelist': {
				itemdblclick: this.viewDevice,
				itemcontextmenu: function(view,record,node, index, e){
					var position = e.getXY();
					e.stopEvent();
					this.listMenu(position,record);
				},
				beforerender : this.beforeTree,
			},
			'deviceeventlist': {
				itemdblclick: this.expandEvent,
				select: this.viewEvent
			},
			'button[action=savedevice]' : {
				click: this.saveDevice
			},
			'[action=resetevents]': {
				click: this.resetEvents
			},
			'[action=edit]': {
				click: this.editDevice
			},
			'[action=view]': {
				click: this.viewDevice
			},
			'[action=showall]' : {
				click: this.showall
			},
			'[action=reset]' : {
				click: this.reset
			},
			'[action=note]' : {
				click: this.note
			},
			'[action=delete]': {
				click: this.deleteDevice
			},
			'menucheckitem' : {
				click: this.runSearch
			},
			'devicelist menucheckitem' : {
				click: this.runsearch
			},
			'[action=maintenance]' : {
				click: this.maintenance
			},
			'[action=schedule]' : {
				click: this.schedule
			},
			'[action=editclass]' :{
				click: this.showclassedit
			},
			'[action=saveclass]' :{
				click: this.saveclass
			},
			'[action=add]' :{
				click: this.add
			},
			'[action=adddevice]' :{
				click: this.adddevice
			},
			'[action=csv]' :{
				click: this.csv
			},
			'[action=updateConfig]' :{
				click: this.saveConfig
			},
			'devicecomponents' : {
				beforerender: this.beforeTree,
				afterrender: this.loadInfo
			},
			'[action=editInterface]' :{
				click: this.editInterface
			},
			'deviceinterfaces' : {
				itemdblclick: this.editInterface,
				itemcontextmenu: function(view,record,node, index, e){
					var position = e.getXY();
					e.stopEvent();
					this.interfaceMenu(position,record);
				},
			},
			'[action=addclass]' : {
				click: this.addClass
			},
			'[action=newclass]' : {
				click: this.newclass
			},
		
		});
	},
	beforeTree: function(){
		var treestore = Ext.getStore('DeviceComponents');
		treestore.on('beforeexpand', function(node) {
			var preventTreeLoad = true;
			var record = Ext.getStore('activeDevice').getAt('0');
			treestore.proxy.api.read = 'data/read/components.php?class=' + record.data.Class;
			if (node == this.getRootNode() && preventTreeLoad) {
				Ext.Ajax.abort(this.proxy.activeRequest);
				delete this.proxy.activeRequest;
			}
		});
	},
	loadInfo : function(){
		var view = Ext.widget('deviceinfo');
		var container = Ext.ComponentQuery.query('#devicecomponent')[0];
		container.add(view);
		
	},
	loadList: function(){
		
	},
	note: function(){
		Ext.Msg.prompt('Add Note','Type your note below');	
	},
	deleteDevice: function(){ 
		Ext.Msg.confirm('Delete Device?','Deleting this device cannot be undone.',function(btn){
			if(btn == 'yes'){
				/* Remove from devices store */
				if(Ext.getStore('activeDevice')){
					var store = Ext.getStore('activeDevice');
					var record = store.getAt('0');
					store.remove(record);
					store.sync();
					Ext.Msg.confirm('Device Deleted','Click yes to jump to the device search page, or no to stay on this page.',function(btn){
						if(btn == 'yes'){
							viewDeviceSearch();
						}
					},this);	
				}
				else{
					var store = Ext.getStore('Devices');
					var grid = Ext.ComponentQuery.query('devicelist')[0];
					var records = grid.getView().getSelectionModel().getSelection();
					Ext.each(records,function(myrecord){
						store.remove(myrecord);
					});
					store.sync();
				}
			}
		},this);
	},
	runsearch: function(){
		var grid = Ext.ComponentQuery.query('devicelist')[0];
		grid.getXFilterRow().storeSearch();
	},
	runSearch: function(){
		var grid = Ext.ComponentQuery.query('grid')[0];
		grid.getXFilterRow().storeSearch();
	},
	menuaddfilter: function(me){
	},
	showall: function(grid){
		var grid = Ext.ComponentQuery.query('devicelist')[0];
		var store = Ext.getStore('Devices');
		total = store.getTotalCount();
		grid.getXFilterRow().storeSearch();
		Ext.each(Ext.StoreManager.items,function(store){store.pageSize=total;});
	},
	reset: function(grid){
		var grid = Ext.ComponentQuery.query('devicelist')[0];
		Ext.each(Ext.ComponentQuery.query('devicelist textfield'),function(me){me.setValue()},this)
		Ext.each(Ext.ComponentQuery.query('devicelist menucheckitem'),function(me){me.setChecked(false)},this)
		grid.getXFilterRow().storeSearch();
	},
	updateToolbar: function(grid,records){
		Ext.ComponentQuery.query('devicelist')[0].getStore().on('datachanged', function(){
			showing = Ext.ComponentQuery.query('devicelist')[0].getStore().data.length;
			total = Ext.getStore('Devices').getTotalCount();
			Ext.ComponentQuery.query('#devicedisplaycount')[0].update('Displaying '+showing+' of '+total);
		});
		showing = Ext.ComponentQuery.query('devicelist')[0].getStore().data.length;
		total = Ext.getStore('Devices').getTotalCount();
		Ext.ComponentQuery.query('#devicedisplaycount')[0].update('Displaying '+showing+' of '+total);

	},
	refreshGrid: function(grid){
		setInterval(function(){
			grid.store.load();
		},30000);
	},
	listMenu: function(position,record){
		var view = Ext.ComponentQuery.query('devicelist')[0];
		if(view.getView().getSelectionModel().getSelection().length == 1){
			var menu_grid = new Ext.menu.Menu({
				items:[
				{ text: 'Edit device',action: 'edit'},
				{ text: 'Delete device',action: 'delete'},
				{ text: 'View device',action: 'view'},
				{ text: 'Push Script',action: 'script'},
				{ text: 'Schedule Maintenace',action: 'maintenance'},
				]
			});
		}
		else{
			var menu_grid = new Ext.menu.Menu({
				items:[
				{ text: 'Schedule Maintenace',action: 'maintenance'},
				{ text: 'Delete devices',action: 'delete'},
				{ text: 'Push Script',action: 'script'},
				]
			});
		}
		menu_grid.showAt(position);
	},
	interfaceMenu: function(position,menu){
		var view = Ext.ComponentQuery.query('deviceInterfaces')[0];
		var menu_grid = new Ext.menu.Menu({
			items:[
			{ text: 'Edit Interface',action: 'editInterface'},
			{ text: 'Admin Enable/ Disable',action: 'admin'},
			{ text: 'Change Vlan',action: 'changevlan'},
			]
		});
		menu_grid.showAt(position);
	},
	add: function(button){
		var f = Ext.widget('deviceadd');
	},
	adddevice: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getValues();;
		var values = form.getValues();
		values.Address = dot2num(values.Address);
		var model = Ext.create('netman.model.Device',values);
		var errors = model.validate(), message = "";
		var store = Ext.getStore('Devices');
		if(errors.length < 1){
			store.add(values);
			store.sync();
			Ext.Msg.alert('Device Add','Device added to databse');
		}
		else{
			console.log('errors');
			Ext.Msg.alert('Device Add','Failed to add device. Please check your input.');
		}
	},
	editDevice: function(){
		/* if you are in a device tab*/
		if (Ext.ComponentQuery.query('devicesearch').length > 0){
			var record = Ext.ComponentQuery.query('devicelist')[0].getView().getSelectionModel().getSelection()[0];
		}
		else{
			var record = Ext.getStore('activeDevice').data.items[0];
		}
		var view = Ext.widget('deviceedit');
		view.down('form').loadRecord(record);
	},
	editInterface: function(){
		var record = Ext.ComponentQuery.query('deviceinterfaces')[0].getView().getSelectionModel().getSelection()[0];
		var view = Ext.widget('editinterface');
		view.down('form').loadRecord(record);
	},
	saveDevice: function(button){
		var win = button.up('window');
		form = win.down('form');
		record = form.getRecord();
		values = form.getValues();
		values.Address = dot2num(values.Address);
		var model = Ext.create('netman.model.Device',values);
		var errors = model.validate(), message = "";
		if(errors.length < 1){
			record.set(values);
			/*
 * 			win.close();
 * 			*/
			if(Ext.getStore('activeDevice')){
				Ext.getStore('activeDevice').sync({
					success: function(data,response){
						Ext.Msg.alert("OK","Device updated.");
					},
					failure: function(data,response){
						Ext.Msg.alert("Error","An error has occurred.");
					}
				});
			}
			else{
				Ext.getStore('Devices').sync({
					success: function(data,response){
						Ext.Msg.alert("OK","Device updated.");
					},
					failure: function(data,response){
						Ext.Msg.alert("Error","An error has occurred.");
					}
				});
			}
		}
		else{console.log('errors');}
	},
	viewDevice: function (){
		var record = Ext.ComponentQuery.query('devicelist')[0].getView().getSelectionModel().getSelection()[0];
		window.location.hash = record.data.Name;
	},
	maintenance: function(button){
		var view = Ext.widget('devicemaintenance');
	},
	schedule: function(button){
		var multi = false;
		var g = Ext.ComponentQuery.query('devicelist');
		var win = button.up('window');
		form = win.down('form').getForm();
		record = form.getValues();
		values = form.getValues();
		var model = Ext.create('netman.model.Maintenance',values);
		var errors = model.validate(), message = "";
		if (g.length > 0){
			var grid = Ext.ComponentQuery.query('devicelist')[0];
			var records = grid.getView().getSelectionModel().getSelection();
			multi = true;
		}
		if(errors.length < 1){
			var store = Ext.getStore('Maintenance');
			var start = parseFloat(new Date(values.Start).getTime())/1000;
		}
		else{
			/* errors on form */
			return false;
		}
		if(multi){
			var r = new Array();
			Ext.each(records,function(myrecord){
				var rd = {
					'Device':myrecord.data.Name,
					'DeviceId':myrecord.data.id,
					'StartTime':start,
					'EndTime': start + values.Duration,
					'User':User.Name,
					'UserComment':values.Comment,
				};
				r.push(rd);
			});
			store.add(r);
		}
		else{
			var data = Ext.getStore('activeDevice').data.items[0].data;
			store.add({
				'Device':data.Name,
				'DeviceId':data.id,
				'StartTime':start,
				'EndTime': start + values.Duration,
				'User':User.Name,
				'UserComment':values.Comment,
			});
		}
		store.sync();
	},
	showclassedit: function(){
		var record = Ext.ComponentQuery.query('deviceclasses')[0].getView().getSelectionModel().getSelection()[0];
		if(record){
			var view = Ext.widget('deviceclassconfig');
			view.down('form').loadRecord(record);
			
		}
		else{
			Ext.Msg.alert('Invalid Class','Please select a class from the class tree');
		}
	},
	newclass: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getValues();;
		var values = form.getValues();
		console.log("HERE");
		var model = Ext.create('netman.model.Class',values);
		var errors = model.validate(), message = "";
		var store = Ext.getStore('Classes');
		if(errors.length < 1){
			console.log("OK");
			store.add(values);
			store.sync();
		}
		else{
			console.log("Failure adding class");
		}
	},
	saveclass: function(button){
		var win = button.up('window');
		form = win.down('form');
		record = form.getRecord();
		values = form.getValues();
		var model = Ext.create('netman.model.Class',values);
		var errors = model.validate(), message = "";
		if(errors.length < 1){
			record.set(values);
			Ext.getStore('Classes').sync({
				success: function (data){
					console.log(data);
					Ext.Msg.alert('OK',"OK");
				},
				failure: function( data){
					console.log(data);
					Ext.Msg.alert('Error',"Failed");
				}
			});
		}
		else{console.log('errors');}
	},
	saveConfig: function(button){
		var form = button.up('form').getForm();
		var record = form.getRecord();
		values = form.getValues();
		var model = Ext.create('netman.model.Property',values);
		var errors = model.validate(), message = "";
		if(errors.length < 1){
			record.set(values);
			if(Ext.getStore('deviceProperties')){
				Ext.getStore('deviceProperties').sync({
					success: function (data){
						Ext.Msg.alert('OK',data.response.responseText);
					},
					failure: function( data){
						Ext.Msg.alert('Error',data.response.responseText);
					}
				});
			}
			else{
				/* Why is this store here? what else would it save instead? */
				Ext.getStore('deviceProperties').sync({
					success: function (data){
						Ext.Msg.alert('OK',data.response.responseText);
					},
					failure: function( data){
						Ext.Msg.alert('Failure',data.response.responseText);
					}
				});
			}
		}
		else{console.log('errors');}
	},
	csv: function(button){
		store2csv('Devices');
	},
	expandEvent: function(grid,record){
		this.viewEvent(grid,record);
		var details =  Ext.ComponentQuery.query('eventview')[0];
		details.expand();
	},
	viewEvent: function (grid,record){
		var view = Ext.ComponentQuery.query('deviceeventlist')[0];
		var details =  Ext.ComponentQuery.query('eventview')[0];
		if(view.getView().getSelectionModel().getSelection().length == 1){
			details.down('form').loadRecord(record);
			this.data = record.data;
		}
		else{
			details.collapse();
		}
			
	},
	resetEvents: function(grid){
		var grid = Ext.ComponentQuery.query('deviceeventlist')[0];
		Ext.each(Ext.ComponentQuery.query('deviceeventlist textfield'),function(me){me.setValue()},this)
		Ext.each(Ext.ComponentQuery.query('deviceeventlist menucheckitem'),function(me){me.setChecked(false)},this)
		grid.getXFilterRow().storeSearch();
	},
	addClass: function(button){
		console.log("Adding Class");
		var view = Ext.widget('deviceclassconfig');
	},
	views:[
		'device.List',
		'device.Edit',
		'device.View',
		'device.Components',
		'device.Search',
		'device.Tools',
		'device.Classes',
		'device.Info',
		'device.Maintenance',
		'device.Addresses',
		'device.Eventlist',
		'device.Events',
		'device.History',
		'device.Interfaces',
		'device.Hardware',
		'device.Neighbors',
		'device.Vlans',
		'device.Config',
		'device.ClassConfig',
		'device.Graphs',
		'device.Graphlist',
		'device.Add',
		'device.EditInterface',
		'event.View',
	]
	
});
