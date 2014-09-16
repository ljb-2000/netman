Ext.define('netman.store.Transformations',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Transformation',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/transformations.php',
			update: 'data/update/transformations.php',
			create: 'data/create/transformations.php'
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
