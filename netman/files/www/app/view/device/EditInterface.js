Ext.define('netman.view.device.EditInterface', {
    extend: 'Ext.window.Window',
    alias : 'widget.editinterface',
    modal: true,
    resizable: true,
    title : 'Edit Interface',
    layout: 'fit',
    autoShow: true,
    width:500,
    height:600,
    maximizable: true,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
		bodyCls: 'infoBox',
                items: [
                    { xtype: 'displayfield',anchor:'100%', name : 'Name',fieldLabel: 'Interface',allowBlank:false},
                    { xtype: 'displayfield',anchor:'100%', name : 'Description',fieldLabel: 'Description',allowBlank:false},
                    { xtype: 'displayfield',anchor:'100%', name : 'Vlan',fieldLabel: 'Vlan',allowBlank:false},
                    { xtype: 'displayfield',anchor:'100%', name : 'VoiceVlan',fieldLabel: 'Voice Vlan',allowBlank:false},
                    { xtype: 'textfield',anchor:'100%', name : 'Location',fieldLabel: 'Location',allowBlank:false},
                    { xtype: 'textfield',anchor:'100%', name : 'Cable',fieldLabel: 'Cable',allowBlank:false},
                    { xtype: 'textfield',anchor:'100%', name : 'UserComment',fieldLabel: 'Comment',allowBlank:false},
                ]
            },
        ];
 
        this.buttons = [
            {
                text: 'Save',
                action: 'saveinterface'
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
