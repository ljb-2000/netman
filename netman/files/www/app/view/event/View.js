Ext.define('netman.view.event.View', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.eventview',
    closable: false,
    title : 'Event Information',
    layout: 'form',
    autoShow: true,
    initComponent: function() {
        this.items = [
		{
			xtype:'form',
			style: {'border':'none'},
			items:[
                    		{ xtype: 'displayfield',name : 'id',fieldLabel: 'Event-id'},
                    		{ xtype: 'displayfield',name : 'Status',fieldLabel: 'Status',renderer: function(value){ return eventStatus(value);}},
                    		{ xtype: 'displayfield',name : 'Severity',fieldLabel: 'Severity',renderer: function(value){return eventSeverity(value)}},
                    		{ xtype: 'displayfield',name : 'Name',fieldLabel: 'Device',renderer: function(value){return "<a target='_blank' href='" + site_url + "/devices#" + value + "'>" + value + "</a>";}},
                    		{ xtype: 'displayfield',name : 'Facility',fieldLabel: 'Facility'},
				{ xtype: 'displayfield',name : 'Reported',fieldLabel: 'Reported'},
                    		{ xtype: 'displayfield',name : 'FirstSeen',fieldLabel: 'First Seen'},
                    		{ xtype: 'displayfield',name : 'LastSeen',fieldLabel: 'Last Seen'},
                    		{ xtype: 'displayfield',name : 'Message',fieldLabel: 'Message'},
				{ xtype: 'displayfield',name : 'Tag',fieldLabel: 'Tag'},
				{ xtype: 'displayfield',name : 'Count',fieldLabel: 'Count'},
				{ xtype: 'displayfield',name : 'User',fieldLabel: 'User'},
				{ xtype: 'displayfield',name : 'UserComment',fieldLabel: 'UserComment'},
				{ xtype: 'displayfield',name : 'Cleared',fieldLabel: 'Cleared at'},
				{ xtype: 'displayfield',name : 'ClearedBy',fieldLabel: 'Cleared by'},
			]
		}
        ];
 
        this.callParent(arguments);
	}
});
