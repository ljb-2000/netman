Ext.define('netman.view.link.Search', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.linksearch',
    closable: false,
	region:'center',
    layout: 'fit',
	stateId:'linksearchpage',
    autoShow: true,
    id: 'link_list',
	defaults: {
		collapsible: false,
		split: false,
		bodyStyle: 'padding 15px'
	},
    initComponent: function() {
        this.items = [
			{
			xtype:'panel',
			id: 'Search',
			layout: 'border',
			items:[
			{
				xtype: 'linklist',
				region:'center',
                    },
			{
				xtype: 'toolbar',
				region:'north',
				height:30,
				items:[
					{
						icon: 'icons/glyphicons_113_justify.png',
						iconCls: 'icon',
						menu:[	
							{
								text: 'Add Link',
								action: 'add'
							},
							{
								text: 'Options',
								action: 'options'
							},
						]
					},/*
					{text:'Export',
					menu:[
						{text:'CSV',action:'csv'}
					]
					}*/
				]
			}
                ]
	}];
 
        this.callParent(arguments);
	}
});
