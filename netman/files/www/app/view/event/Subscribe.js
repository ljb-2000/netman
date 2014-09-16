Ext.define('netman.view.event.Subscribe', {
    extend: 'Ext.window.Window',
    modal: true,
    title:'Event Subscriptions',
    alias : 'widget.eventsubscribe',
    layout: 'fit',
    autoShow: true,
    closable:true, 
    height:600,
    width:600,
    initComponent: function() {	
        this.items = [
		{xtype:'eventsubscriptionlist'}
        ];
 
        this.callParent(arguments);
	},
});
