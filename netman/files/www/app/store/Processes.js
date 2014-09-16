Ext.define('netman.store.Processes',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Process',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/processes.php',
			update: 'data/update/processes.php',
			create: 'data/create/processes.php',
			destroy: 'data/destroy/processes.php'
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
