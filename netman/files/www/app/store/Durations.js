Ext.define('netman.store.Durations', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Durations',
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/durations.json',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
