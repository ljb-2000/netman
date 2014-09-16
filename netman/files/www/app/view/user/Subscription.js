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
				valueField:'Name',
				queryMode:'remote',
			},
                    	{xtype: 'combo',name: 'Class',fieldLabel: 'Class',anchor:'80%',store:'ComboClasses',
				displayField:'Name',
				valueField:'Name',
				queryMode:'remote',
			},
			{xtype: 'textfield', name: 'Tag', fieldLabel: 'Tag',anchor:'80%'},
                    	{xtype: 'combo',name: 'Severity',fieldLabel: 'Severity <=',anchor:'80%',store:'Severities',
				displayField:'Name',
				valueField:'id',
				queryMode:'remote',
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
