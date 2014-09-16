Ext.define('netman.store.Statuses', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Status',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/statuses.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
