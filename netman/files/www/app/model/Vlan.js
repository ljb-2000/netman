Ext.define('netman.model.Vlan',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'Name',type:'string'},
		{name:'Number',type:'number'},
		{name:'Address',type:'string'},
		{name:'Broadcast',type:'string'},
		{name:'NetMask',type:'string'},
		{name:'Layer',type:'string'},
		{name:'Layer3Domain',type:'string'},
		{name:'Contact',type:'string'},
		{name:'ExternalContact',type:'string'},
		{name:'Location',type:'string'},
		{name:'Description',type:'string'},
		{name:'Secure',type:'boolean'},
	]
});
