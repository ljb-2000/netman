Ext.define('netman.store.Services',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Service',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/services.php',
			update: 'data/update/services.php',
			create: 'data/create/services.php',
			destroy: 'data/destroy/services.php'
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
