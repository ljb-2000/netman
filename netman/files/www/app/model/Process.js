Ext.define('netman.model.Process',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'Name',type:'string'},
		{name:'Status',type:'string'},
	],
	validations: [
		{type:'presence',field:'Name',message:'Name can not be empty'}
	]
});
