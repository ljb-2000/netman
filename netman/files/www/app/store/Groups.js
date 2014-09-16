Ext.define('netman.store.Groups', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Group',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/groups.php',
			write: 'data/write/groups.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
