Ext.define('netman.view.device.Components', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.devicecomponents',
	id: 'devicecomponenttree',
	title:'Components',
	rootVisible: false,
	store: 'DeviceComponents',
	hideHeaders: true,
	columns:[
		{xtype:'treecolumn',header:'Name',dataIndex:'Name',flex:3}
	],
	listeners:{ 
		itemclick: function(s,r){
			if(r.data.leaf){
				if(r.raw.xtype){
					/*Ext.ComponentQuery.query('#devicecomponent')[0].update(r.raw.xtype + " to be loaded here");*/
					var view = Ext.widget(r.raw.xtype);
					var container = Ext.ComponentQuery.query('#devicecomponent')[0];
					container.removeAll();
					container.add(view);
				}
			}
		}
	}	
});
