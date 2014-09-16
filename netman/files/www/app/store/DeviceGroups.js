Ext.define('netman.store.Groups', {
	extend: 'Ext.data.Store',
	model: 'netman.model.DeviceGroup',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/devicegroups.php',
			write: 'data/write/devicegroups.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
