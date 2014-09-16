Ext.define('netman.view.device.Events', {
    extend: 'Ext.container.Container',
    alias : 'widget.deviceevents',
    title : 'Events',
    layout: 'fit',
    autoShow: true,
	stateId: 'deviceEventsgrid',
	stateful:true,
	stateEvents: ['columnresize', 'show', 'hide'],
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'container',
		layout: 'border',
		defaults: {
			collapsible: false,
			split: false,
			bodyStyle: 'padding 15px'
		},
                items: [
                    {
			xtype: 'deviceeventlist',
			region:'center',
                    },
			{
				xtype: 'toolbar',
				title:'Actions',
				region:'north',
				height:30,
				items: [
					{
						icon: 'icons/glyphicons_113_justify.png',
						iconCls: 'icon',
						menu:[	
							{text:'Acknowledge',action:'acknowledge'},
							{text:'Suppress',action:'suppress'},
							{text:'Close',action:'close'},
						]
					},
				]
			},
		{
			xtype:'eventview',
			width:400,
			id: 'eventdetails',
			collapsible:true,
			region:'east',	
			collapsed:true,

		},
                ]
            },
        ];
 
        this.callParent(arguments);
	}
});
