Ext.define('netman.store.Vlans',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Vlan',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/vlans.php',
			update: 'data/update/vlans.php'
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
