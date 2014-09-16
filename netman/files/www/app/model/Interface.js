Ext.define('netman.model.Interface', {
	extend: 'Ext.data.Model',
	fields:[
		{name:'id',type:'int'},
		{name:'Device',type:'string'},
		{name:'DeviceName',type:'string'},
		{name:'IfIndex',type:'int'},
		{name:'Name',type:'string'},
		{name:'Description',type:'string'},
		{name:'Location',type:'string'},
		{name:'Cable',type:'string'},
		{name:'Vlan',type:'string'},
		{name:'VoiceVlan',type:'string'},
		{name:'MacNotify',type:'int'},
		{name:'User',type:'string'},
		{name:'UserComment',type:'string'},
		{name:'UserCommentStamp',type:'date',dateFormat:'timestamp'},
		{name:'FirstSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastUp',type:'date',dateFormat:'timestamp'},
		{name:'LastDown',type:'date',dateFormat:'timestamp'},
		{name:'Status',type:'boolean'},
	
	]
});
