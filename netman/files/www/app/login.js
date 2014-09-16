Ext.application({
	name: 'netman',
	appFolder: 'app',
	launch: function(){
	        var task = new Ext.util.DelayedTask(function() {
			splashscreen.fadeOut({
				duration: 1000,
				remove: true
			});
			splashscreen.next().fadeOut({
				duration: 1000,
				remove: true,
				listeners: {
					afteranimate: function(){
						Ext.getBody().unmask();
					}
				}
			});
		});
		task.delay(1000);
		Ext.create('Ext.container.Viewport',{
			requires: [
				'Ext.resizer.Splitter',
				'Ext.fx.target.Element',
			'Ext.fx.target.Component'
			],
			layout: {
				type:'vbox',
				align:'center',
				pack:'center'
			},
			style: {
				'background':'#333',
			},
			items:[
			{
				xtype:'container',
				title:'Netman Login',
				items:[
				{
					xtype:'form',
					url: 'data/dologin.php',
					width:600,
					defaults: {
						style: { 'padding' : '15px' ,'border-style':'none','background': 'white'},
					},
					items:[
						{layout: 'column',items:[
                    					{ xtype: 'textfield',name : 'Username',fieldLabel: 'Username',allowBlank:false},
                    					{ xtype: 'textfield',name : 'Password',fieldLabel: 'Password',allowBlank:false,inputType:'password'},
						],defaults: {
							style: { 'border-style':'none'},
							},
						},
						{ layout: 'column',items:[
                    					{ xtype: 'combo',name : 'Method',fieldLabel: 'Authentication Method',allowBlank:false,store:[['local','Local'],['tacacs+','TACACS+'],['ldap','LDAP']],value:'local'},
						],defaults: {
							style: {'border':'none'},
							},
						},
					],
        				buttons : [
						    {text: 'Login',action: 'login'},
						    {text: 'Reset Password',action: 'reset'},
					]
				}
				],
						
				
			},
			]
			
		});
	},
	controllers: [
		'Login'
	]
});
var splashscreen;
Ext.onReady(function() {
    // Start the mask on the body and get a reference to the mask
    splashscreen = Ext.getBody().mask('Loading...', 'splashscreen');
    //         // Add a new class to this mask as we want it to look different from the default.
    splashscreen.addCls('splashscreen');
    //
    //Insert a new div before the loading icon where we can place our logo.
    Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
     cls: 'x-splash-icon'
    });
});
