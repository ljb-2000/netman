Ext.define('netman.view.link.List' ,{
	alias : 'widget.linklist',
	extend: 'Ext.grid.Panel',
	requires: ['Ext.ux.grid.xFilterRow','Ext.state'],
	stateId: 'linkgrid',
	stateful:true,
	stateEvents: ['columnresize', 'show', 'hide'],
	multiSelect: true,
	plugins:[
		Ext.create('Ext.ux.grid.xFilterRow',{
			remoteFilter:true
		}),
	],
	stripeRows: true,
	initComponent: function() {
		this.columns = [
			{header: 'Id', id:'id', dataIndex: 'id',  flex: 1,filter: true,hidden:true},
			{header: 'Status', id:'status',dataIndex: 'Status', flex: 1, renderer: function(value){ return checked(value);},xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'Active',field:'Status',value:'1',checked:false},
					{xtype:'menucheckitem',text:'Inactive',field:'Status',value:'0',checked:false},
				]
			}]}},
			{header: 'Name', id:'name',dataIndex: 'Name', flex: 1},
			{header: 'User', id:'user',dataIndex: 'User', flex: 1},
			{header: 'Requestor', id:'requestor',dataIndex: 'Requestor', flex: 1},
			/* pull from store */
			{header: 'Function', dataIndex: 'Function', flex: 1, xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				id:'LinkFunction',
				menu:[
				]
			}]}},
			{header: 'Type', dataIndex: 'Type', flex: 1, xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				id:'LinkType',
				menu:[
				]
			}]}},
			{header: 'Classification', dataIndex: 'Classification', flex: 1, xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				id:'LinkClassification',
				menu:[
				]
			}]}},
			{header: 'Encryption', dataIndex: 'Encryption', flex: 1, xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				id:'LinkEncryption',
				menu:[
				]
			}]}},
			{header: 'WaveLength', dataIndex: 'WaveLength', flex: 1, xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				id:'LinkWaveLength',
				menu:[
				]
			}]}},
			{header: 'Rooms', dataIndex:'Rooms',flex: 2,id: 'Rooms',renderer:templateRenderer(new Ext.Template('{Room1} <-> {Room2}'))},
			{header: 'Devices', flex: 2,dataIndex:'Devices',id:'Devices',renderer:templateRenderer(new Ext.Template('{Device1}[Port1] <-> {Device2}[{Port2}]'))},
		];
 
        	this.callParent(arguments);
		this.load();
	},
	filter: function(field,expression){
		this.store.filter(field,expression);
	},
	reset: function(){
		this.store.removeAll();
		this.store.load('netman.store.Links');
	},
	load: function(){
		this.store.load();
	},
	bbar:[
		{
			xtype: 'pagingtoolbar',
			items:[
				{text:'Reset',	action: 'reset'	},
				{text:'Show All',action: 'showall'},
				{text:'Export',action: 'csv'},
			],
			displayInfo: true,
			displayMsg: 'Displaying links {0} - {1} of {2}',
			store: 'Links',
			doRefresh: function(){
				Ext.getStore('Links').load();
			}
		}
	],
	store: 'Links'
});
