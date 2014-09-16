Ext.define('netman.store.LinkParts',{
	extend: 'Ext.data.Store',
	model: 'netman.model.LinkPart',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/linkparts.php',
			update: 'data/update/linkparts.php',
			create: 'data/create/linkparts.php',
			destroy: 'data/destroy/linkparts.php'
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
