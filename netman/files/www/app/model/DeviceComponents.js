Ext.define('netman.model.DeviceComponents',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'Parent',type:'string'},
		{name:'Class',type:'string'},
		{name:'Leaf',type:'string'},
		{name:'Loaded',type:'string'},
		{name:'Xtype',type:'string'},
	],
	validations: [
	]
});
