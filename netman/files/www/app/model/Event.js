Ext.define('netman.model.Event',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Name',type:'string'},
		{name:'Source',type:'string'},
		{name:'ClassName',type:'string'},
		{name:'Message',type:'string'},
		{name:'Severity',type:'number'},
		{name:'Facility',type:'string'},
		{name:'Tag',type:'string'},
		{name:'Reported',type:'date',dateFormat:'timestamp'},
		{name:'FirstSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastSeen',type:'date',dateFormat:'timestamp'},
		{name:'Status',type:'string'},
		{name:'Count',type:'number'},
		{name:'User',type:'string'},
		{name:'UserComment',type:'string'},
		{name:'Cleared',type:'date',dateFormat:'timestamp'},
		{name:'ClearedBy',type:'string'},
	]
});
