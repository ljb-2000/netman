Ext.define('netman.view.event.TransformationList' ,{
	extend: 'Ext.grid.Panel',
	requires: ['Ext.ux.grid.xFilterRow'],
	plugins:[
		Ext.create('Ext.ux.grid.xFilterRow',{
			remoteFilter:true
		})
	],
	alias : 'widget.eventtransformationlist',
	stripeRows: true,
	multiSelect: true,
	autoShow: true,
	initComponent: function() {
		this.columns = [
			{header: 'id',  dataIndex: 'id',  flex: 1,hidden:true},
			{header: 'Name', dataIndex: 'Name', flex: 1,hidden:false},
			{header: 'Description', dataIndex: 'Description', flex: 1,hidden:false},
			{header: 'MessageFilter', dataIndex: 'MessageFilter', flex: 1,hidden:false},
			{header: 'TagFilter', dataIndex: 'TagFilter', flex: 1,hidden:false},
			{header: 'Action', dataIndex: 'Action', flex: 1,hidden:false},
			{header: 'Active', dataIndex: 'Active', flex: 1,hidden:false},
			{header: 'RequireBoth', dataIndex: 'RequireBoth', flex: 1,hidden:false},
			
		];
 
        	this.callParent(arguments);
		this.load();
	},
	filter: function(field,expression){
		this.store.filter(field,expression);
	},
	load: function(){
		this.store.load();
	},
	bbar:[
		{
			xtype: 'pagingtoolbar',
			items:[
				{text:'Reset',action: 'reset'},
				{text:'Show All',action: 'showall'},
				{text:'Export',action:'csv'},
				],
			displayInfo: true,
			displayMsg: 'Displaying transformations {0} - {1} of {2}',
			store: 'Transformations',
			doRefresh: function(){
			}
		}
	],
	store: 'Transformations'
});
