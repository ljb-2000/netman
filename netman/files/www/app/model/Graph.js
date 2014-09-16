Ext.define('netman.model.Graph',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'Device',type:'string'},
		{name:'Device-id',type:'int'},
		{name:'Description',type:'string'},
	],
	validations: [
	]
});
