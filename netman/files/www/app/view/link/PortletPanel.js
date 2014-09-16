Ext.define('netman.view.link.PortletPanel', {
	extend: 'netman.view.link.PortalPanel',
	alias: 'widget.linkportletpanel',
	autoScroll: true,
	style:{
		'border':'none',
	},
	getTools: function(){
		return [
			{
				type:'minimize',
				handler: function(e,target,panel){
					var c = panel.up('viewport');
					c.getLayout().setActiveItem(0);
					c.doLayout();
				}
			},
			{
				type:'maximize',
				handler: function(){
					var c = panel.up('viewport');
					var testPanel = Ext.getCmp('test1');
					var con = panel.ownerCt.initialConfig;
					testPanel.insert(0,con);
					c.getLayout().setActiveItem(1);
					c.doLayout();
				}
			}
		]
	},
	items:[
	],
	
	initComponent: function(){
		var record = Ext.ComponentQuery.query('linklist')[0].getView().getSelectionModel().getSelection()[0];
		Ext.apply(this,{
			store :  Ext.create('Ext.data.Store',{
				model: 'netman.model.LinkPart',
				id: 'linkParts',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api:{
						read: 'data/read/linkparts.php?Link=' + record.data.Name,
						update: 'data/update/linkparts.php?Link=' + record.data.Name,
						create: 'data/create/linkparts.php?Link=' + record.data.Name
					},
					reader:{
						type: 'json',
						root: 'data',
						successProperty: 'success',
						totalProperty: 'totalCount'
					}
				},
				pageSize: User.PageSize,
				remoteSort: true,
				remoteFilter: true
			})}
		);
		var myitems = [];
		this.store.on('load',function(store,records,successful,eOpts){
			var view = Ext.ComponentQuery.query('linkportletpanel')[0];
			var insloc = 1;
			
			store.each(function(record){
					/* Take record and build link part as below formatted, but fix format for make more nicey*/
					var info = 
					{xtype:'linkportlet',
						title: 'Hop ' + record.data.Sequence,
				items:[
					{
						xtype: 'form',
						id: 'hop-' + record.data.id,
						buttons:[
							{text: 'Save'},
							{text: 'Delete'},
						],
						defaults: {
							layout: 'column',
						},
							style:{
							},
						items: [
							{ 
								items:[
									{xtype:'displayfield',fieldLabel:'Location'},
									{xtype:'textfield',name:'Location1',value:record.data.Room1},
									{xtype:'textfield',name:'Location2',value:record.data.Room2},
								]
							},
							{ 
								items:[
									{xtype:'displayfield',fieldLabel:'Rack'},
									{xtype:'textfield',value:record.data.Rack1},
									{xtype:'textfield',value:record.data.Rack2},
								]
							},
							{ 
								items:[
									{xtype:'displayfield',fieldLabel:'FXP'},
									{xtype:'textfield',value:record.data.Fxp1},
									{xtype:'textfield',value:record.data.Fxp2},
								]
							},
							{ 
								items:[
									{xtype:'displayfield',fieldLabel:'Fiber Pairs'},
									{xtype:'textfield',value:record.data.Pair1a,anchor:'20%',},
									{xtype:'textfield',value:record.data.Pair1b,anchor:'20%',},
								]
							},
							{
								items:[
									{xtype:'displayfield',fieldLabel:'Cable Length'},
									{xtype:'textfield',value: record.data.Length1,},
									{xtype:'textfield',value: record.data.Length2},
								]
							},
						
						],
					}]};
					view.items.items[0].insert(insloc,info);
					view.down('form').loadRecord(record);
					insloc ++;
				},this
			);
		});
		this.callParent(arguments);
	}
});
