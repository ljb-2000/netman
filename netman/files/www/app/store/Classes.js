Ext.define('netman.store.Classes',{
	extend: 'Ext.data.TreeStore',
	model: 'netman.model.Class',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/classes.php',
			update: 'data/update/classes.php',
			create: 'data/create/classes.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	remoteSort:false
});
