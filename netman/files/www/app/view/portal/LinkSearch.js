Ext.define('netman.view.portal.LinkSearch', {
	extend: 'netman.view.portal.Portlet',
	alias: "widget.linksearch",
	title: 'Link Search',
	stateId: 'LinkSearchPortal',
	stateEvents: ['show','hide'],
	items:[{
		xtype: 'container',
		html: 'Link search goes here'
	}]
});
