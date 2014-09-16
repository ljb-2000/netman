Ext.define('netman.view.portal.Bookmarks', {
	extend: 'netman.view.portal.Portlet',
	alias: "widget.bookmarks",
	title: 'Bookmarks',
	stateId: 'BookmarksPortal',
	stateEvents: ['show', 'hide'],
	items:[{
		xtype: 'container',
		html: 'Bookmarks go here'
	}]
});
