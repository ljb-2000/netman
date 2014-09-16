Ext.define('netman.store.Options',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Option',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/options.php',
			update: 'data/update/options.php',
			create: 'data/create/options.php',
			destroy: 'data/destroy/options.php'
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
