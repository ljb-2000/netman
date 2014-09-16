Ext.define('netman.view.link.View', {
    extend: 'Ext.window.Window',
    alias : 'widget.linkview',
    closable: true,
    title : 'Link Information',
    modal: true,
    resizable: true,
    layout: 'fit',
    autoShow: true,
    width:600,
   height: 600,
    maximizable: true,
	maximized: false,
	autoScroll: true,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'container',
		items:[
			{
				xtype:'toolbar',
				items:[
					{
						icon: 'icons/glyphicons_113_justify.png',
						iconCls: 'icon',
						menu:[
							{text: 'Edit',action: 'edit'},
							{text: 'Add Hop',action: 'newhop'},
							{text: 'Delete',action:'delete'},
						]
					}
				],
			},
			{
				xtype:'form',
				autoScroll: true,
				style:{
				},
                		items: [
					{
						items:[
                		    			{ xtype: 'displayfield',anchor:'100%', name : 'Name',fieldLabel: 'Name',allowBlank:false},
                		    			{ xtype: 'displayfield',anchor:'100%', name : 'User',fieldLabel: 'Creator',allowBlank:false},
                		    			{ xtype: 'displayfield',anchor:'100%', name : 'Requestor',fieldLabel: 'Requestor',allowBlank:false},
                		    			{ xtype: 'displayfield',anchor:'100%', name : 'CreatedStamp',fieldLabel: 'Date Created',allowBlank:false},
                		    			{ xtype: 'displayfield',anchor:'100%', name : 'Encryption',fieldLabel: 'Supports Encryption',allowBlank:false},
                		    			{ xtype: 'displayfield',anchor:'100%', name : 'Classification',fieldLabel: 'Classification',allowBlank:false},
                		    			{ xtype: 'displayfield',anchor:'100%', name : 'Type',fieldLabel: 'Type',allowBlank:false},
                		    			{ xtype: 'displayfield',anchor:'100%', name : 'Function',fieldLabel: 'Function',allowBlank:false},
						]
					},
					{
						xtype:'linkportletpanel',
						items:[
						{ id:'col-1',
						xtype:'linkportalcolumn',
						items:[
						{
						title: 'Device 1',
						draggable: false,
						xtype:'linkportlet',
						items:[
						{ 
							items:[
						{layout: 'column',
							items: [
                	   					{ xtype: 'displayfield', name : 'Room1',fieldLabel: 'Room',allowBlank:false},
							],
							defaults:{
								style: { 'border-style':'none','padding':'0','margin':'0'},
							}
						},
						{layout: 'column',
							items: [
                	   					{ xtype: 'displayfield',anchor:'100%', name : 'Rack1',fieldLabel: 'Rack',allowBlank:false},
							]
						},
						{layout: 'column',
							items: [
                				    		{ xtype: 'displayfield',anchor:'100%', name : 'Device1',fieldLabel: 'Device',allowBlank:false},
							]
						},
						{layout: 'column',
							items: [
                				    		{ xtype: 'displayfield',anchor:'100%', name : 'Port1',fieldLabel: 'Port',allowBlank:false},
							]
						},
						]
						}
						],
					},
					{ 
						title: 'Device 2',
						draggable: false,
						xtype:'linkportlet',
						items:[
						{
							items:[
						{layout: 'column',
							items: [
                	   					{ xtype: 'displayfield', name : 'Room2',fieldLabel: 'Room',allowBlank:false},
							],
							defaults:{
								style: { 'border-style':'none','padding':'0','margin':'0'},
							}
						},
						{layout: 'column',
							items: [
                	   					{ xtype: 'displayfield',anchor:'100%', name : 'Rack2',fieldLabel: 'Rack',allowBlank:false},
							]
						},
						{layout: 'column',
							items: [
                				    		{ xtype: 'displayfield',anchor:'100%', name : 'Device2',fieldLabel: 'Device',allowBlank:false},
							]
						},
						{layout: 'column',
							items: [
                				    		{ xtype: 'displayfield',anchor:'100%', name : 'Port2',fieldLabel: 'Port',allowBlank:false},
							]
						},
						]
						}]
					},
				]
				}
				]
			}
		],
	}
	]
	}
	];
 
        this.callParent(arguments);
	this.load();
	},
	load: function(record){
		/*this.title = 'Vlan ' + record.data.Number + ':' + record.data.Name;*/
	}
});
