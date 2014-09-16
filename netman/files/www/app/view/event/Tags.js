Ext.define('netman.view.event.Tags', {
    extend: 'Ext.window.Window',
    modal: true,
    title:'Syslog Tags',
    alias : 'widget.eventtags',
    layout: 'fit',
    autoShow: true,
    closable:true, 
    height:600,
    width:600,
    initComponent: function() {	
        this.items = [
		{xtype:'eventtaggrid'}
        ];
 
        this.callParent(arguments);
	},
});
