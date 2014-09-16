Ext.define('netman.view.portal.Services', {
	extend: 'netman.view.portal.Portlet',
	alias: "widget.services",
	title: 'Services',
	stateful: true,
	stateId: 'ServicesPortal',
	stateEvents: ['show','hide'],
	items:[{
		xtype: 'container',
		html: ' Services dashboard goes here'
	}]
});
