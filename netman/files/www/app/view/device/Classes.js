Ext.define('netman.view.device.Classes', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.deviceclasses',
	id: 'deviceclasstree',
	title:'Device Classes',
	rootVisible: false,
	store: 'Classes',
	hideHeaders: true,
	useArrows:true,
	columns:[
		{xtype:'treecolumn',header:'Name',dataIndex:'Name',flex:3}
	],
	listeners:{ 
		itemclick: function(s,r){
			var name = r.data.Name;
			var grid = Ext.ComponentQuery.query('devicelist')[0];
			Ext.ComponentQuery.query('#devicelist-classname-textfield')[0].setValue(name);
			grid.getXFilterRow().storeSearch();
		},
	}	
});
