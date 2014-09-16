Ext.define('netman.controller.Portals',{
	extend: 'Ext.app.Controller',
	views:[
		'portal.PortletPanel',
		'portal.PortalPanel',
		'portal.List',
		'portal.PortletList',
		'portal.OfflineDevices',
		'portal.Maintenance',
		'portal.DeviceAlarms',
		'portal.Alarms',
		'portal.Services',
		'portal.Bookmarks',
		'portal.NodeSearch',
		'portal.CableSearch',
		'portal.LinkSearch',
		'portal.Interfaces',
		'portal.NodeList',
		'portal.Graph',
	],
	stores: [
		'AllPortlets',
		'Devices',
		'Maintenance',
		'Interfaces',
		'Nodes',
	],
	init: function(){
		this.control({
			'offlinedevices > grid': {
				itemdblclick: this.viewDevice,
				/*itemcontextmenu: function(view,record,node, index, e){
					var position = e.getXY();
					e.stopEvent();
					this.listMenu(position,record);
			
				},*/
			},
			'interfaces > grid' : {
				itemcontextmenu: function(view,record,node, index, e){
					var position = e.getXY();
					e.stopEvent();
					this.interfaceMenu(position,record);
				}
			},
			'[action=addcolumn]': { 
				click: this.addcolumn
			},
			'[action=removecolumn]': { 
				click: this.removecolumn
			},
			'[action=listportlets]': { 
				click: this.listportlet
			},
			'[action=addportlet]' :{
				click: this.addportlet
			},
			'[action=viewdevice]' :{
				click: this.viewDevice
			},
			'portletpanel' :{
				afterrender: this.checkDefault,
				drop: this.updatePortlets
			},
			'portlet' : {
				destroy:this.updatePortlets,
			},
			'menucheckitem' : {
				click: this.runSearch
			},
		});
	},
	removePortlet: function(portlet){
	},
	checkDefault: function(){
		if(User.Portlets.length < 1){
			var p = Ext.widget('portlet');
			p.title = 'Default Portlet';
			p.html = "You don't have any portlets set up! To add a portlet, click Add Portlet at the top of this page";
			Ext.ComponentQuery.query('#col-0')[0].add(Ext.widget(p));
			Ext.ComponentQuery.query('portletpanel')[0].doLayout();
		}
	},
	listportlet: function(){
		var view = Ext.widget('listportlets');
		
	},
	addportlet: function(){
		/* Get selection */
		var selection = Ext.ComponentQuery.query('#portlettree')[0].selModel.selected.items[0].raw.xtype;
		var panel = Ext.ComponentQuery.query('portletpanel')[0];
		var last = (panel.items.length - 1);
		var p = Ext.widget(selection);
		/* Will inherit settings from view, but for now statically adding them */
		Ext.ComponentQuery.query('portletpanel')[0].items.items[last].add(p);
		this.doLayout();
	},
	addcolumn: function(){
		var p = Ext.widget('portalcolumn');
		Ext.ComponentQuery.query('portletpanel')[0].items.add(p);
		this.doLayout();
	},
	removecolumn: function(){
		var panel = Ext.ComponentQuery.query('portletpanel')[0];
		if(panel.items.length < 2){
			Ext.Msg.alert('Portal',"Can't remove the last column!");
		}
		else{
			var last = (panel.items.length - 1);
			var lcolumn = Ext.ComponentQuery.query('portletpanel')[0].items.items[last];
			/* shift last column items over one */	
			Ext.ComponentQuery.query('portletpanel')[0].items.items[last - 1].add(Ext.ComponentQuery.query('portletpanel')[0].items.items[last].items.items);
			Ext.ComponentQuery.query('portletpanel')[0].remove(lcolumn);
			this.doLayout();
		}
		
	},
	doLayout: function(){
		Ext.ComponentQuery.query('portletpanel')[0].doLayout();
		this.updatePortlets();
	},
	updatePortlets: function(){
		var columns = Ext.ComponentQuery.query('portalcolumn');
		var ports = [];
		var c = 0;
		for(i = 0; i < columns.length; i ++){
			if(columns[i].items.length > 0){
				ports.push(c);
				ports[c] = new Array();
				portlets = columns[i].items;
				for(p = 0; p < portlets.length; p ++){
					portlet = portlets.items[p];
					ports[c].push(portlet.xtype);
				}
				c ++;
			}
		}
		var url = "data/update/portlets.php?json=" + JSON.stringify(ports);
		Ext.Ajax.request({url:url});
	},
	viewDevice: function (item){
		var grid = item.up('grid');
		console.log(grid);
		var record = grid.getView().getSelectionModel().getSelection()[0];
		window.location = 'devices#' +record.data.Name;
	},
	listMenu: function(position,record){
		var menu_grid = new Ext.menu.Menu({
			items:[
			]
		});
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
	runSearch: function(item){
		var grid = item.up("grid");
		grid.getXFilterRow().storeSearch();
	}
});
