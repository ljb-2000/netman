Ext.define('netman.store.States', {
	extend: 'Ext.data.Store',
	model: 'netman.model.State',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/states.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
