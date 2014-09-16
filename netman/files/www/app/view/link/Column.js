Ext.define('netman.view.link.Column', {
	extend: 'Ext.container.Container',
	alias: 'widget.linkportalcolumn',
	requires: ['netman.view.link.Portlet'],
	layout: 'anchor',
	defaultType: 'portlet',
	style:{
		'border-style':'none'
	},
	autoScroll:true,
	cls: 'x-portal-column'
});
