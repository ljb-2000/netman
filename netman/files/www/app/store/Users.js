Ext.define('netman.store.Users',{
	extend: 'Ext.data.Store',
	model: 'netman.model.User',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/users.php',
			update: 'data/update/users.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success'
		},
		writer: {
			type: 'json',
			root: 'data',
			successProperty: 'success',
			writeRecordId :true
			
		}
	}
});
