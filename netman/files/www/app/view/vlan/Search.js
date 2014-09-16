Ext.define('netman.view.vlan.Search', {
    extend: 'Ext.container.Container',
    alias : 'widget.vlansearch',
    closable: false,
    layout: 'fit',
    autoShow: true,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'container',
		layout: 'border',
		defaults: {
			collapsible: true,
			split: false,
			bodyStyle: 'padding 15px'
		},
                items: [
                    {
			xtype: 'vlanlist',
			region:'center',
			collapsible: false,
                    },
			{
				xtype: 'toolbar',
				title:'Actions',
				region:'north',
				height:30,
				items: [
					{
						icon: 'icons/glyphicons_113_justify.png',
						iconCls: 'icon',
						menu:[	
							{text: 'Add Vlan',action:'add'},
							{text: 'Edit',action:'edit'},
							{text: 'Delete',action:'delete'},
						]
					},
				]
			}
                ]
            }
        ];
 
        this.callParent(arguments);
	}
});
