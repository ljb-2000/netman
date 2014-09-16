Ext.define('netman.view.portal.Portlet', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.portlet',
	layout: 'fit',
	bodyStyle: 'padding:5px',
	anchor: '100%',
	frame: true,
	closable: true,
	collapsible: true,
	animCollapse: true,
	stateful: true,
	draggable: {
		moveOnDrag: false
	},	
	cls: 'x-portlet',
	
});
