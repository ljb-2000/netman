Ext.define('netman.view.device.Search', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.devicesearch',
    closable: false,
	region:'center',
    layout: 'fit',
	stateId:'devicesearchpage',
    autoShow: true,
    id: 'device_list',
	defaults: {
		collapsible: false,
		split: false,
		bodyStyle: 'padding 15px'
	},
    initComponent: function() {
        this.items = [
			{
			xtype:'panel',
			id: 'Search',
			layout: 'border',
			items:[
                    {
			xtype: 'deviceclasses',
			collapsible: true,
			collapsed: false,
			region: 'west',
			width: 200,
                    },
			{
				xtype: 'devicelist',
				region:'center',
                    },
			{
				xtype: 'toolbar',
				region:'north',
				height:30,
				items:[
					{
						icon: 'icons/glyphicons_113_justify.png',
						iconCls: 'icon',
						menu:[	
							{text: 'Add Device',action: 'add'},
							{ text: 'Edit device',action: 'edit'},
							{ text: 'View device',action: 'view'},
							{ text: 'Schedule Maintenace',action: 'maintenance'},
							{ text: 'Class',
								menu:[
								{text: 'Add Class',action: 'addclass'},	
								{text: 'Edit Class',action: 'editclass'	},
							]
							},
						]
					},/*
					{text:'Export',
					menu:[
						{text:'CSV',action:'csv'}
					]
					}*/
				]
			}
                ]
	}];
 
        this.callParent(arguments);
	}
});
