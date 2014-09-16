Ext.define('netman.view.portal.Alarms', {
	extend: 'netman.view.portal.Portlet',
	alias: "widget.alarms",
	title: 'Alarms',
	stateId: 'AlarmsPortal',
	stateEvents: ['show', 'hide'],
	items:[{
		xtype: 'container',
		html: 'Alarms'
	}]
});
