Ext.define('netman.view.user.Icon', {
    extend: 'Ext.container.Container',
    alias : 'widget.usericon',
 
    title : 'Login',
	closeable: false,
    autoShow: true,
 
    initComponent: function() {
	var DisplayName = User.Name;
	if(User.FirstName != '' && User.LastName != ''){
		DisplayName = User.FirstName + ' ' + User.LastName;
	}
	var secureicon = '';
	if(ssl == true){
		secureicon = 'icons/locked.png';
	}
        this.items = [
	{
		xtype: 'toolbar',
		items:[
		/*{
			icon:'icons/glyphicons_027_search.png',
			iconCls:'icon',
			action: 'search'
		},*/
		{
			text:'Loading Clock...',
			id: 'clock',
			icon: 'icons/green-circle.png',
		},
		{
			text: DisplayName,
			id: 'usermenu',
			icon: secureicon,
			menu:[
				{
					text: 'Logout',
					action: 'logout'
				},
				{
					text: 'Settings',
					action: 'settings'
				},
				{
					text: 'Admin',
					action: 'admin',
				},
		
			]	
		},
		]
	}
        ];
 
        this.callParent(arguments);
    }
});
