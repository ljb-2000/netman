Ext.define('netman.store.Properties',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Property',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/properties.php',
			update: 'data/update/properties.php',
			create: 'data/create/properties.php'
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
