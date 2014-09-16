Ext.define('netman.view.link.Options', {
    extend: 'Ext.window.Window',
    modal: true,
    alias : 'widget.linkoptions',
    closable: true,
	title: 'Link Options',
    layout: 'fit',
    width:600,
    height:600,
    maximizable: true,
    autoShow: true,
 
    initComponent: function() {	
        this.items = [
		{
			xtype: 'linkoptionslist',
		}
	];
 
        this.callParent(arguments);
	}
});
