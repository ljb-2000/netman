Ext.define('netman.store.ComboClasses',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Class',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/comboclasses.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
		}
	},
	remoteSort:false
});
