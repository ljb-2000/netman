Ext.define('netman.model.Message',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'Message',type:'string'},
		{name:'Tag',type:'string'},
		{name:'Count',type:'number'},
		{name:'Device_Count',type:'number'},
		{name:'FirstSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastSeen',type:'date',dateFormat:'timestamp'},
	]
});
