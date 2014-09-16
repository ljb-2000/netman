Ext.define('netman.view.user.Admin', {
    extend: 'Ext.window.Window',
    modal: true,
    alias : 'widget.useradmin',
    closable: true,
    title: 'System Administration',
    layout: 'fit',
    width:600,
    height:600,
    maximizable: true,
    autoShow: true,
 
    initComponent: function() {	
        this.items = [
		{
			xtype: 'tabpanel',
			items: [
			{
				xtype: 'userlist',
				title: 'Users',
			},
			{
				xtype: 'grouplist',
				title: 'Groups',
			},
			{
				xtype: 'panel',
				title: 'Roles',
			},
			{
				xtype: 'panel',
				title: 'Permissions',
			},
			{
				xtype: 'panel',
				title: 'Configuration',
			},
			{
				xtype: 'servicelist',
				title: 'Services',
			},
		]},
		
        ];
 
        this.callParent(arguments);
	},
});
