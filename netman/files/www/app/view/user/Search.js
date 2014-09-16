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
