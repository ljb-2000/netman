Ext.define('netman.view.link.OptionsList' ,{
	alias : 'widget.linkoptionslist',
	extend: 'Ext.grid.Panel',
	requires: ['Ext.ux.grid.xFilterRow','Ext.state'],
	stateId: 'linkoptionsgrid',
	multiSelect: true,
	plugins:[
		Ext.create('Ext.ux.grid.xFilterRow',{
			remoteFilter:true
		}),
	],
	stripeRows: true,
	initComponent: function() {
		this.columns = [
			{header: 'Id',  dataIndex: 'id',  flex: 1,filter: true,hidden:true},
			{header: 'Option',  dataIndex: 'Option',  flex: 1,filter: true,hidden:false},
			{header: 'Name',  dataIndex: 'Name',  flex: 1,filter: true,hidden:false},
			{header: 'Description',  dataIndex: 'Description',  flex: 1,filter: true,hidden:false},
		];
 
        	this.callParent(arguments);
		this.load();
	},
	filter: function(field,expression){
		this.store.filter(field,expression);
	},
	reset: function(){
		this.store.removeAll();
		this.store.load('netman.store.Options');
	},
	load: function(){
		this.store.load();
	},
	bbar:[
		{
			xtype: 'pagingtoolbar',
			items:[
				{text:'Reset',	action: 'reset'	},
				{text:'New',	action: 'newoption'},
				{text:'Show All',action: 'showall'},
				{text:'Export',action: 'csv'},
			],
			displayInfo: true,
			displayMsg: 'Displaying link options {0} - {1} of {2}',
			store: 'Options',
			doRefresh: function(){
				Ext.getStore('Options').load();
			}
		}
	],
	store: 'Options'
});
