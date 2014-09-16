Ext.define('netman.model.Subscription',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'Description',type:'string'},
		{name:'Device',type:'string'},
		{name:'Class',type:'string'},
		{name:'Tag',type:'string'},
		{name:'Severity',type:'string'},
		{name:'Filter',type:'string'},
		{name:'Active',type:'boolean'},
	]
});
