Ext.define('netman.model.Transformation',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'Description',type:'string'},
		{name:'MessageFilter',type:'string'},
		{name:'TagFilter',type:'string'},
		{name:'Action',type:'int'},
		{name:'Active',type:'boolean'},
		{name:'RequireBoth',type:'boolean'},
	]
});
