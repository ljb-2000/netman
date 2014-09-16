Ext.define('netman.store.Layers', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Layer',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/layers.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
