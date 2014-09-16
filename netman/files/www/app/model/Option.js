Ext.define('netman.model.Option',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Type',type:'string'},
		{name:'Option',type:'string'},
		{name:'Name',type:'string'},
		{name:'Description',type:'string'},
	],
	validations: [
		{type:'presence',field:'Name',message:'Name can not be empty'}
	]
});
