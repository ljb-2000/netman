Ext.define('netman.store.Devices',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Device',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/devices.php',
			update: 'data/update/devices.php',
			create: 'data/create/devices.php',
			destroy: 'data/destroy/devices.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
