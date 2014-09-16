Ext.define('netman.store.AllPortlets',{
	extend: 'Ext.data.TreeStore',
	model: 'netman.model.Portlet',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/allportlets.json',
		},
		reader:{
			type: 'json',
			root: 'children',
			successProperty: 'success',
		}
	},
});
