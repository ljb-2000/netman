Ext.define('netman.view.event.Transform', {
    extend: 'Ext.window.Window',
    modal: true,
    title:'Event Transformations',
    alias : 'widget.eventtransform',
    layout: 'fit',
    autoShow: true,
    closable:true, 
    height:600,
    width:600,
    initComponent: function() {	
        this.items = [
		{xtype:'eventtransformationlist'}
        ];
 
        this.callParent(arguments);
	},
});
