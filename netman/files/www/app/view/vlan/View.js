Ext.define('netman.view.vlan.View', {
    extend: 'Ext.window.Window',
    alias : 'widget.vlanview',
    closable: true,
    title : 'Vlan Information',
    modal: true,
    resizable: true,
    layout: 'accordion',
    autoShow: true,
    width:'60%',
    height:'60%',
    maximizable: true,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'panel',
		title: 'Vlan Information',
		items:[
			{
				xtype:'toolbar',
				items:[
					{
						icon: 'icons/glyphicons_113_justify.png',
						iconCls: 'icon',
						menu:[
							{text: 'Edit',action: 'edit'},
							{text: 'Delete',action:'delete'},
						]
					}
				],
			},
			{
				xtype:'form',
                		items: [
                		    { xtype: 'displayfield',anchor:'100%', name : 'Number',fieldLabel: 'Vlan',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'Name',fieldLabel: 'Name',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'Address',fieldLabel: 'Address',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'Broadcast',fieldLabel: 'Broadcast',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'SubnetMask',fieldLabel: 'Subnet Mask',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'Layer',fieldLabel: 'Layer',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'Layer3Domain',fieldLabel: 'Layer 3 Domain',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'Contact',fieldLabel: 'Contact',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'ExternalContact',fieldLabel: 'External Contact',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'Location',fieldLabel: 'Location',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'Description',fieldLabel: 'Description',allowBlank:false},
                		    { xtype: 'displayfield',anchor:'100%', name : 'Secure',fieldLabel: 'Secure',allowBlank:false, renderer: function(value){
						if(value == true){
							return "<img height='25px' width='25px' src='icons/locked-icon.png'/>";
						}
						else{
							return "<img height='25px' width='25px' src='icons/unlocked-icon.png'/>";
						}
					}
				   },
				],
			},
		]
            },
            {
                xtype: 'panel',
		title: 'Discovered Data',
            },
        ];
 
        this.callParent(arguments);
	this.load();
	},
	load: function(record){
		/*this.title = 'Vlan ' + record.data.Number + ':' + record.data.Name;*/
	}
});
