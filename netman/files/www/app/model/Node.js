Ext.define('netman.model.Node', {
	extend: 'Ext.data.Model',
	fields:[
		{name:'id',type:'int'},
		{name:'Device',type:'string'},
		{name:'DeviceName',type:'string'},
		{name:'Interface',type:'string'},
		{name:'Vlan',type:'string'},
		{name:'Name',type:'string'},
		{name:'Address',type:'string'},
		{name:'MacAddress',type:'string'},
		{name:'FirstSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastSeen',type:'date',dateFormat:'timestamp'},
	
	]
});
