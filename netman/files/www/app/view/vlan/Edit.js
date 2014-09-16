Ext.define('netman.view.vlan.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.vlanedit',
 
    title : 'Edit Vlan',
    layout: 'fit',
	modal: true,
    autoShow: true,
	width: 400,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
               		{ xtype: 'displayfield',anchor:'90%', name : 'Number',fieldLabel: 'Vlan',allowBlank:false},
                	{ xtype: 'textfield',anchor:'90%', name : 'Name',fieldLabel: 'Name',allowBlank:false},
                	{ xtype: 'textfield',anchor:'90%', name : 'Address',fieldLabel: 'Address',allowBlank:true},
                	{ xtype: 'displayfield',anchor:'90%', name : 'Broadcast',fieldLabel: 'Broadcast',allowBlank:true},
                	{ xtype: 'textfield',anchor:'90%', name : 'SubnetMask',fieldLabel: 'Subnet Mask',allowBlank:true},
                	{ xtype: 'textfield',anchor:'90%', name : 'Layer',fieldLabel: 'Layer',allowBlank:false},
			{xtype: 'combobox',fieldLabel: 'Layer 3 Domain',hiddenName: 'Layer3Domain',name: 'Layer3Domain',
				store: 'Domains',
				valueField: 'Name',
				displayField: 'Name',
				editable: false,
				forceSelection: true,
			},
                	{ xtype: 'textfield',anchor:'90%', name : 'Contact',fieldLabel: 'Contact',allowBlank:true},
                	{ xtype: 'textfield',anchor:'90%', name : 'ExternalContact',fieldLabel: 'External Contact',allowBlank:true},
                	{ xtype: 'textfield',anchor:'90%', name : 'Location',fieldLabel: 'Location',allowBlank:true},
                	{ xtype: 'textarea',anchor:'90%', name : 'Description',fieldLabel: 'Description',allowBlank:true},
                	{ xtype: 'checkbox',anchor:'90%', name : 'Secure',fieldLabel: 'Secure',inputValue: true,uncheckedValue: false},

                ]
            }
        ];
 
        this.buttons = [
            {
                text: 'Save',
                action: 'save'
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
