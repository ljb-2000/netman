Ext.define('netman.view.device.Add', {
    extend: 'Ext.window.Window',
    alias : 'widget.deviceadd',
    modal: true,
    resizable: true,
    title : 'Add evice',
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
                    { xtype: 'textfield',anchor:'100%', name : 'Name',fieldLabel: 'System Name',allowBlank:false},
                    { xtype: 'textfield',anchor:'100%',name : 'Address',fieldLabel: 'Ip Address',allowBlank:false},
                    { xtype: 'textfield',anchor:'100%',name : 'Make',fieldLabel: 'Make'},
                    { xtype: 'textfield',anchor:'100%',name : 'Model',fieldLabel: 'Model'},
                    { xtype: 'textfield',anchor:'100%',name : 'Serial',fieldLabel: 'Serial#'},
                    { xtype: 'textfield',anchor:'100%',name : 'AssetTag',fieldLabel: 'Asset Tag'},
                    { xtype: 'textfield',anchor:'100%',name : 'Location',fieldLabel: 'Location'},
                    { xtype: 'textfield',anchor:'100%',name : 'Rack',fieldLabel: 'Rack'},
                    	{xtype: 'combo',name: 'ClassName',fieldLabel: 'Class',store:'ComboClasses',
				displayField:'Name',
				valueField:'Name',
				queryMode:'remote',
			},
			{xtype: 'combobox',
			fieldLabel: 'Layer',
			hiddenName: 'Layer',
			name: 'Layer',
			store: 'Layers',
			valueField: 'Name',
			displayField: 'Name',
			editable: false,
			forceSelection: true,
			},
			{xtype: 'combobox',
			fieldLabel: 'Domain',
			hiddenName: 'L2Domain',
			name: 'L2Domain',
			store: 'Domains',
			valueField: 'Name',
			displayField: 'Name',
			editable: false,
			forceSelection: true,
			},
			{xtype: 'combobox',
			fieldLabel: 'State',
			hiddenName: 'State',
			name: 'State',
			store: 'States',
			valueField: 'Name',
			displayField: 'Name',
			editable: false,
			forceSelection: true,
			},
			{xtype:'checkbox', name:'Monitor', fieldLabel:'Enable Monitoring',inputValue:'1',uncheckedValue:'0'},

                ]
            },
        ];
 
        this.buttons = [
            {
                text: 'Add',
                action: 'adddevice'
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
