Ext.define('netman.model.LinkPart',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Link',type:'string'},
		{name:'Sequence',type:'int'},
		{name:'Room1',type:'string'},
		{name:'Rack1',type:'string'},
		{name:'Fxp1',type:'string'},
		{name:'Pair1a',type:'string'},
		{name:'Pair1b',type:'string'},
		{name:'Sequence',type:'int'},
		{name:'Room2',type:'string'},
		{name:'Rack2',type:'string'},
		{name:'Fxp2',type:'string'},
		{name:'Pair2a',type:'string'},
		{name:'Pair2b',type:'string'},
		{name:'Length1',type:'string'},
		{name:'Length2',type:'string'},
		{name:'User',type:'string'},
		{name:'UserCreatedStamp',type:'datetime',format:'timestamp'},
	],
	validations: [
		/*{type:'presence',field:'Name',message:'Name can not be empty'}*/
	]
});
