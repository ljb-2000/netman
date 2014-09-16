Ext.define('netman.store.ComboDevices',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Device',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/combodevices.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
