Ext.require(['Ext.util.History']);
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
				id: 'devices',
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
						xtype:'container',
						height:30,
						id: 'crumbs',
						region:'south',
						html: "<a href='devices' onClick='viewDeviceSearch()'>Devices</a>",
					},
				]
			},
			{xtype:'devicesearch'}
		]
		}
		);
	},
	controllers: [
		'Users',
		'Devices',
	]
});
var splashscreen;

Ext.onReady(function() {
	splashscreen = Ext.getBody().mask('Loading...', 'splashscreen');
	splashscreen.addCls('splashscreen');
	Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], { cls: 'x-splash-icon' });
	if ('onhashchange' in window ) {
		window.onhashchange = function(){
			onHash();
		}
	}
	var hash = window.location.hash.substring(1)
	if(hash != '' && hash != 'Search'){	
		viewDevice(hash);
	}
});
function onHash(){
	var hash = window.location.hash.substring(1)
	if(hash != '' && hash != 'Search'){	
		viewDevice(hash);
	}
	else{
		viewDeviceSearch();
	}
}
function viewDevice(Name){

		/* create new store for device, load deviceview */
		var store = Ext.create('Ext.data.Store',{
			id: 'activeDevice',
			model: 'netman.model.Device',
			autoLoad: true,
			proxy: {
				type: 'ajax',
				api:{
					read:   'data/read/devices.php?Name=' + Name,
					update: 'data/update/devices.php',
					create: 'data/create/devices.php',
					destroy: 'data/destroy/devices.php',
				},
				reader:{
					type: 'json',
					root: 'data',
					successProperty: 'success',
					totalProperty: 'totalCount'
				}
			},
			pageSize: User.PageSize,
			remoteSort:true,
			remoteFilter: true
		});
		store.load({
   			scope   : this,
   			 callback: function(records, operation, success) {	
				if(records.length < 1){
					Ext.Msg.alert('Invalid Device','A device does not exist with the name ' + Name + ', please verify the device name');
				}
				else{
					var record = records[0];
					var view = Ext.widget('deviceview');
					Ext.ComponentQuery.query('#crumbs')[0].update("<a href='devices' onClick='viewDeviceSearch()'>Devices</a> --> <a href='devices#" + Name + "'> "+  Name + "</a> ")
					if(Ext.ComponentQuery.query('devicesearch').length > 0){
						Ext.ComponentQuery.query('devicesearch')[0].destroy();
					}
					Ext.ComponentQuery.query('viewport')[0].add(view);
				var deviceid = store.data.items[0].data.id;
				var classid = store.data.items[0].data.Class;
				var store2 = Ext.create('Ext.data.Store',{
					id: 'deviceProperties',
					model: 'netman.model.Property',
					autoLoad: true,
					proxy: {
						type: 'ajax',
						api:{
							read:   'data/read/properties.php?Device=' + deviceid + '&Class=' + classid,
							update: 'data/update/properties.php?Device=' + deviceid,
							create: 'data/create/properties.php'
						},
						reader:{
							type: 'json',
							root: 'data',
							successProperty: 'success',
							totalProperty: 'totalCount'
						},
						writer:{
							type: 'json',
							successProperty: 'success',
							writeRecordId :true
						}
					},
					pageSize: User.PageSize,
					remoteSort:true,
					remoteFilter: true
				});
				}
        		}
        	 });
}
function viewDeviceSearch(){
	window.location = 'devices';
}
