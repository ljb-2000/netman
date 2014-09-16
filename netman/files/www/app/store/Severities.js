Ext.define('netman.store.Severities', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Severity',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/severities.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
