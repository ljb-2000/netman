Ext.define('netman.view.device.Addresses', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.deviceaddresses',
	autoHeight: true,
	layout:'fit',
	title: 'Addresses',
	bodyStyle:{border:'none'},
    initComponent: function() {	
		var data = Ext.getStore('activeDevice').data.items[0].data;
		this.columns = [
			{header:'Address',flex:3},
			{header:'First Seen',flex:3},
			{header:'Last Seen',flex:3},
		];
		this.callParent(arguments);
		/* create store */
	}
});
