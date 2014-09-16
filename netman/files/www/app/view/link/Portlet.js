Ext.define('netman.view.link.Portlet', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.linkportlet',
	layout: 'fit',
	width:500,
	closable: false,
	collapsible: true,
	animCollapse: true,
	draggable: {
		moveOnDrag: false
	},	
	cls: 'x-portlet',
	
});
