Ext.define('netman.view.user.Exit', {
    extend: 'Ext.window.Window',
    alias : 'widget.userexit',
 
    title : 'Comfirm Exit',
    layout: 'fit',
    autoShow: true,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'container',
		html: 'Are you sure you want to exit the system?'
            }
        ];
 
        this.buttons = [
            {
                text: 'Exit',
                action: 'exit'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];
 
        this.callParent(arguments);
    }
});
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
		},
		{
			text: DisplayName,
			id: 'usermenu',
			icon: 'icons/green-circle.png',
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
					text: 'Inbox',
					action: 'inbox',
				},
				{
					text: 'Disable Chat',
					action: 'chat',
				},
		
			]	
		},
		]
	}
        ];
 
        this.callParent(arguments);
    }
});
Ext.define('netman.view.user.Login', {
    extend: 'Ext.window.Window',
    alias : 'widget.userlogin',
 
    title : 'Login',
    layout: 'fit',
    autoShow: true,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'username',
                        fieldLabel: 'Username'
                    },
                    {
                        xtype: 'textfield',
                        name : 'passwd',
                        fieldLabel: 'Password'
                    }
                ]
            }
        ];
 
        this.buttons = [
            {
                text: 'Submit',
                action: 'login'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];
 
        this.callParent(arguments);
    }
});
Ext.define('netman.view.user.Search', {
    extend: 'Ext.window.Window',
    alias : 'widget.usersearch',
    closable: true,
   closeAction: 'hide',
    title: 'Global Search',
    layout: 'fit',
    width:600,
    height:400,
    maximizable: true,
    autoShow: true,
	style:{
		'padding':'8px',
	},
 
    initComponent: function() {	
        this.items = [
				{
					xtype:'form',
					url: 'data/read/search.php',
					defaults: {
						style: { 'padding' : '15px' ,'border-style':'none','background': 'white','margin':'5px'},
					},
					items:[
                    				{ xtype: 'textfield',anchor:'80%',name : 'Term',allowBlank:false},
						{ layout: 'column',items:[
                    					{ xtype: 'combo',name : 'Method',allowBlank:false,store:[['device','Device'],['vlan','Vlan'],['link','Link'],['event','Event'],['node','Node']],value:'device'},
                    					{ xtype: 'combo',name : 'Method',allowBlank:false,store:[['interface','Interface'],['vlan','Vlan'],['link','Link'],['event','Event']],value:'interface'},
						],defaults: {
							style: { 'padding' : '15px' ,'border':'none'},
							},
						},
					],
        				buttons : [
						    {text: 'Search',action: 'search'},
					]
				}
	];
 
        this.callParent(arguments);
	},
});
Ext.define('netman.view.user.Settings', {
    extend: 'Ext.window.Window',
    modal: true,
    alias : 'widget.usersettings',
    closable: true,
    title : 'Account Settings for ' + User.Name,
    layout: 'accordion',
    width:600,
    height:600,
    maximizable: true,
    autoShow: true,
 
    initComponent: function() {	
        this.items = [
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
				
					],
					buttons:[
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
		{
			xtype: 'panel',
			title: 'Bookmarks'
		},
		
        ];
 
        this.callParent(arguments);
	},
	stores:[
		'Users'
	]
});
Ext.define('netman.view.user.Subscription', {
    extend: 'Ext.window.Window',
    alias : 'widget.subscription',
    modal: true,
    resizable: true,
    title : 'Subscription',
    layout: 'fit',
    autoShow: true,
    width:500,
    height:500,
    maximizable: true,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
			{xtype: 'textfield', name: 'Name', fieldLabel: 'Name',anchor:'80%'},
			{xtype: 'textfield', name: 'Filter', fieldLabel: 'Filter',anchor:'80%'},
                    	{xtype: 'combo',name: 'Device',fieldLabel: 'Device',anchor:'80%',store:'ComboDevices',
				displayField:'Name',
				valueField:'id',
				queryMode:'remote',
			},
                    	{xtype: 'combo',name: 'Class',fieldLabel: 'Class',anchor:'80%',store:'ComboClasses',
				displayField:'Name',
				valueField:'id',
				queryMode:'remote',
			},
			{xtype: 'textfield', name: 'Tag', fieldLabel: 'Tag',anchor:'80%'},
                    	{xtype: 'combo',name: 'Severity',fieldLabel: 'Severity <=',anchor:'80%',store:'Severities',
				displayField:'Name',
				valueField:'id',
				queryMode:'local',
			},
			{xtype: 'checkbox', name: 'Active', fieldLabel: 'Active',inputValue:true,uncheckedValue:'0'},
                ]
            },
        ];
 
        this.buttons = [
            {
                text: 'Save',
                action: 'savesub'
            },
            {
                text: 'Close',
                scope: this,
                handler: this.close
            }
        ];
 
        this.callParent(arguments);
    }
});
Ext.define('netman.view.user.SubscriptionList', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.subscriptionlist',
    autoShow: true,
 
    initComponent: function() {
	this.columns = [
		{header: 'id', dataIndex: 'id', flex: 1,hidden:true},
		{header: 'Name', dataIndex: 'Name', flex: 2},
		{header: 'Filter', dataIndex: 'Filter', flex: 2},
		{header: 'Device', dataIndex: 'Device', flex: 1},
		{header: 'Class', dataIndex: 'Class', flex: 1},
		{header: 'Tag', dataIndex: 'Tag', flex: 1},
		{header: 'Severity', dataIndex: 'Severity', flex: 1,renderer: function(value){return eventSeverity(value)}},
		{header: 'Active', dataIndex: 'Active', flex: 1,xtype:'booleancolumn',text:'Active',trueText:'yes',falseText:'no'},
        ];
	this.bbar = {
			xtype: 'pagingtoolbar',
			items:[
			{
				text:'New',action:'newsub'
			}],
			displayInfo: true,
			displayMsg: 'Displaying subscriptions {0} - {1} of {2}',
			store: 'Subscriptions',
	},
 
        this.callParent(arguments);
    },
	store: 'Subscriptions'
});
