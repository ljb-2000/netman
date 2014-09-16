Ext.define('netman.model.Link',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Name',type:'string'},
		{name:'Status',type:'boolean'},
		{name:'User',type:'string'},
		{name:'Classification',type:'string'},
		{name:'Encryption',type:'string'},
		{name:'Requestor',type:'string'},
		{name:'CreatedStamp',type:'date',dateFormat:'timestamp'},
		{name:'Type',type:'string'},
		{name:'Function',type:'string'},
		{name:'WaveLength',type:'string'},
		{name:'Room1',type:'string'},
		{name:'Rack1',type:'string'},
		{name:'Device1',type:'string'},
		{name:'Port1',type:'string'},
		{name:'Room1',type:'string'},
		{name:'Device2',type:'string'},
		{name:'Port2',type:'string'},
		{name:'Room2',type:'string'},
	],
	validations: [
		/*{type:'presence',field:'Name',message:'Name can not be empty'}*/
	]
});
