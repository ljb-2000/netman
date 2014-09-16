Ext.define('netman.model.Portlet',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'User',type:'int'},
		{name:"Xtype",type:'string'}
	],
	validations: [
	]
});
