Ext.define('netman.model.User',{
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type:'int'},
		{name: 'Name', type: 'string'},
		{name: 'FirstName', type: 'string'},
		{name: 'LastName', type: 'string'},
		{name: 'Email', type: 'string'},
		{name: 'GroupName', type: 'string'},
		{name: 'PageSize', type: 'int'},
		{name: 'PortalPageSize', type: 'int'},
		{name: 'PasswordStamp',type:'date',dateFormat:'timestamp'},
		{name:'Stateful',type:'number'},
	]
});
