Ext.define('netman.view.portal.List', {
	extend: 'Ext.window.Window',
	alias: 'widget.listportlets',
	modal: true,
	resizable: true,
	title : 'All Portlets',
	layout: 'fit',
	autoShow: true,
	width:600,
	height:600,
	maximizable: true,
	autoScroll: true,
	items:[
		{
			xtype: 'portletlist'
		},
	]
});
