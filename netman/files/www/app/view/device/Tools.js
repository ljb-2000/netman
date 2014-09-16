Ext.define('netman.view.device.Tools', {
    extend: 'Ext.toolbar.Toolbar',
    alias : 'widget.devicetools',
    title : 'Device Actions',
 
    initComponent: function() {
        this.items = [
		{
		text:'Edit',
		width: '50',
		action:'edit'
        	},
		{
		text:'Delete',
		width: '50',
		action:'delete'
        	},
		{
		text: 'Actions',
		width: '80',
		menu:{
			xtype: 'menu',
			items:[
				{
				text: 'Edit Device',
				action:'edit'
				},
				{
				text: 'Item 2'
				}
			]
		}
		},
			
	];
 
        this.callParent(arguments);
	}
});
