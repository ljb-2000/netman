Ext.define('netman.view.device.Maintenance',{
	extend: 'Ext.window.Window',
	alias: 'widget.devicemaintenance',
	modal: true,
	resizable: true,
	title : 'Schedule a Maintenance Period',
	layout: 'fit',
	autoShow: true,
	width:300,
	height:200,
	maximizable: true,
	initComponent: function() {
		var Now = Ext.Date.format(new Date(),"m/d/Y H:i");
		this.items = [
			{
				xtype:'form',
				items:[
					{ xtype: 'datefield', anchor: '100%',fieldLabel: 'Start Date/ Time', name: 'Start',format: 'm/d/Y H:i', value: Now},
					{ xtype: 'combo', anchor: '100%',fieldLabel: 'Duration', name: 'Duration',store: 'Durations',valueField:'Seconds',displayField:'Name'},
					{ xtype: 'textarea',anchor: '100%',name : 'Comment',fieldLabel: 'Comment',allowBlank:false},
				]
			}
		];
		this.buttons = [
			{
				text: 'Schedule',
				action: 'schedule'
			},{'text':'Close',scope:this, handler: this.close}
		];
		this.callParent(arguments);
		
	},
	stores:['Durations']
});
