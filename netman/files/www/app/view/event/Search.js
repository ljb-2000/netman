Ext.define('netman.view.event.Search', {
    extend: 'Ext.container.Container',
    alias : 'widget.eventsearch',
    title : 'Events',
    layout: 'fit',
    autoShow: true,
 
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
			xtype: 'eventlist',
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
					{
						text: 'Reports',
						menu:[
							{text:'Syslog Tags',action:'syslogtags'},
							{text:'Syslog Messages',action:'syslogmessages'},
							{text:'Message', 
							menu: [
								{text: 'Active Transformations',action:'checkTransform'},
								{text: 'Active Subscriptions',action:'checkSubscribe'},
							]},
						]
					},
					{
						text: 'Auto Update',
						menu:[
								/* make these a radio group */
								{text: '10 seconds',action:'refresh',group:'fresh',checked:false},
								{text: '30 seconds',action:'refresh',group:'fresh',checked:false},
								{text: '60 seconds',action:'refresh',group:'fresh',checked:true},
								{text: 'disabled',action:'refresh',group:'fresh',checked:false},
						
						]
					},
					{
						text:'',
						id: 'freshStats'
					}
				]
			},
		{
			xtype:'eventview',
			width:350,
			style: {'border':'none'},
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
