Ext.define('netman.store.Links',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Link',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/links.php',
			update: 'data/update/links.php',
			create: 'data/create/links.php',
			destroy: 'data/destroy/links.php'
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
