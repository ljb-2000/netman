Ext.define('netman.view.portal.NodeSearch', {
	extend: 'netman.view.portal.Portlet',
	alias: "widget.nodesearch",
	title: 'Node Search',
	stateId: 'NodeSearchPortal',
	stateEvents: ['show','hide'],
	items:[{
		xtype: 'form',
		items:[
			{ xtype:'textfield', label:'MAC Address', name :'MacAddress'},
		]
	}]
});
