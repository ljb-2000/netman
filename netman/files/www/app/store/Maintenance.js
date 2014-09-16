Ext.define('netman.store.Maintenance',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Maintenance',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/maintenance.php',
			update: 'data/update/maintenance.php',
			create: 'data/create/maintenance.php'
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
