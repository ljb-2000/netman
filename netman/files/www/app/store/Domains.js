Ext.define('netman.store.Domains', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Domain',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/domains.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
