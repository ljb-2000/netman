Ext.define('netman.store.Logins',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Login',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/logins.php',
			update: 'data/updateLogin.json'
		},
		reader:{
			type: 'json',
			root: 'logins',
			successProperty: 'success'
		}
	}
});
