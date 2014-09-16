Ext.define('netman.model.Maintenance',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Device',type:'string'},
		{name:'DeviceId',type:'int'},
		{name:'StartTime',type:'date',dateFormat:'timestamp'},
		{name:'EndTime',type:'date',dateFormat:'timestamp'},
		{name:'User',type:'string'},
		{name:'UserComment',type:'string'},
		{name:'TimeStamp',type:'date',dateFormat:'timestamp'},
	],
	validations: [
		/*{type:'presence',field:'Name',message:'Name can not be empty'}*/
	]
});
