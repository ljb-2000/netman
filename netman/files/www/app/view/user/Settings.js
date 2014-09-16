Ext.define('netman.view.user.Settings', {
    extend: 'Ext.window.Window',
    modal: true,
    alias : 'widget.usersettings',
    closable: true,
    title : 'Account Settings for ' + User.Name,
    layout: 'fit',
    width:600,
    height:600,
    maximizable: true,
    autoShow: true,
 
    initComponent: function() {	
        this.items = [
	{xtype: 'tabpanel',
	items:[	
		{
			xtype: 'panel',
			title: 'User Information',
			autoScroll:true,
			items:[
				{
					bodyCls: 'infoBox',
					xtype: 'form',
					id: 'usettings',
					items:[
						{xtype:'textfield',anchor:'100%',name:'Name',fieldLabel:'Username'},
						{xtype:'textfield',anchor:'100%',name:'FirstName',fieldLabel:'First Name'},
						{xtype:'textfield',anchor:'100%',name:'LastName',fieldLabel:'Last Name'},
						{xtype:'textfield',anchor:'100%',name:'Email',fieldLabel:'Email Address'},
						{xtype:'textfield',anchor:'100%',name:'PageSize',fieldLabel:'Page Size'},
						{xtype:'textfield',anchor:'100%',name:'PortalPageSize',fieldLabel:'Portal Page Size'},
						{xtype:'checkbox',anchor:'100%',name:'Stateful',fieldLabel:'Remeber Grid Settings',inputValue:'1',uncheckedValue:'0'},
				
					],
					buttons:[
						{text:'Test Email',action:'testemail'},
						{text:'Save',action:'saveuser'}
					]
				}
			]
		},
		{
			bodyCls: 'infoBox',
			xtype: 'panel',
			title: 'Change Password',
			items:[
				{
					xtype: 'form',
					url: 'data/update/password.php',
					items:[
						{xtype:'textfield',anchor:'100%',name:'Password',fieldLabel:'Current Password',inputType:'password',allowBlank:false},
						{xtype:'textfield',anchor:'100%',name:'NewPassword',fieldLabel:'New Password',inputType:'password',allowBlank:false},
						{xtype:'textfield',anchor:'100%',name:'RePassword',fieldLabel:'Re-enter Password',inputType:'password',allowBlank:false},
					],
					buttons:[
						{text:'Update',action:'changepass'}
					]
				}
			]
		},
		{
			xtype: 'subscriptionlist',
			title: 'Subscriptions'
		},
	]}
		
        ];
 
        this.callParent(arguments);
	},
	stores:[
		'Users'
	]
});
