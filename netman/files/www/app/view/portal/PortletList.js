Ext.define('netman.view.portal.PortletList', {
	extend: 'Ext.container.Container',
	alias: 'widget.portletlist',
	layout: 'border',
	items : [
		{
			xtype:'treepanel',
			id: 'portlettree',
			region:'west',
			width:200,
			title:'Portlets',
			rootVisible: false,
			store: 'AllPortlets',
			useArrows: true,
			collapsible:true,
			hideHeaders: true,
			columns:[
				{xtype:'treecolumn',header:'Name',dataIndex:'Name',flex:2}
			],
			listeners:{
				itemclick: function(s,r){
					if(r.data.leaf){
						if(r.raw.xtype){
							var view = Ext.widget(r.raw.xtype);
							Ext.ComponentQuery.query('#portalpreview')[0].removeAll();
							Ext.ComponentQuery.query('#portalpreview')[0].add(view);
						}
					}
				}
			}	
			
		},
		{
			xtype: 'panel',
			id: 'portalpreview',
			autoScroll: true,
			region:'center',
			title:'Preview'
		},
		{
			xtype: 'toolbar',
			region:'south',
			items:[
			{
				text: 'Add Selected',
				action: 'addportlet'
			}
			]
			
		}
	]
});
