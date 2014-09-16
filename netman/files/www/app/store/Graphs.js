Ext.define('netman.store.Graphs',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Graph',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/graphs.php',
			update: 'data/update/graphs.php',
			create: 'data/create/graphs.php'
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
