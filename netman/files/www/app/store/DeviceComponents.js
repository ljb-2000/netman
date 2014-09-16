Ext.define('netman.store.DeviceComponents',{
	extend: 'Ext.data.TreeStore',
	model: 'netman.model.DeviceComponents',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/components.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
		}
	},
});
