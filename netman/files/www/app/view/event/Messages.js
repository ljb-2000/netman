Ext.define('netman.view.event.Messages', {
    extend: 'Ext.window.Window',
    modal: true,
    title:'Syslog Messages',
    alias : 'widget.eventmessages',
    layout: 'fit',
    autoShow: true,
    closable:true, 
    height:600,
    width:800,
    initComponent: function() {	
        this.items = [
		{
			xtype:'gridpanel',
			columns: [
				{header: 'Message',  dataIndex: 'Message',  flex: 2,hidden:false},
				{header: 'Tag',  dataIndex: 'Tag',  flex: 2,hidden:false},
				{header: 'Messages Received',  dataIndex: 'Count',  flex: 1,hidden:false},
				{header: 'Unique Devices',  dataIndex: 'Device_Count',  flex: 1,hidden:false},
				{header: 'First Seen',  dataIndex: 'FirstSeen',  flex: 1,hidden:false},
				{header: 'Last Seen',  dataIndex: 'LastSeen',  flex: 1,hidden:false},
			],
			store: 'Messages',
			bbar:[
				{
					xtype: 'pagingtoolbar',
					items:[{
						text:'Reset',
						action: 'reset'
					}],
					displayInfo: true,
					displayMsg: 'Displaying messages {0} - {1} of {2}',
					store: 'Messages',
				}
	],

			
		}
        ];
 
        this.callParent(arguments);
	},
});
