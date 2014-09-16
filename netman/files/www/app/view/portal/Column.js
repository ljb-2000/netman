Ext.define('netman.view.portal.Column', {
	extend: 'Ext.container.Container',
	alias: 'widget.portalcolumn',
	requires: ['netman.view.portal.Portlet'],
	layout: 'anchor',
	defaultType: 'portlet',
	cls: 'x-portal-column'
});
