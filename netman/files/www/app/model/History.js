Ext.define('netman.model.History', {
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Message',type:'string'},
		{name:'User',type:'string'},
		{name:'TimeStamp',type:'date',dateFormat:'timestamp'},
		{name:'Device',type:'string'},
		{name:'Vlan',type:'string'},
		{name:'Link',type:'string'}
	]
});
