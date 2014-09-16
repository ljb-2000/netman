Ext.define('netman.view.vlan.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.vlanlist',
	requires: ['Ext.ux.grid.xFilterRow','Ext.state'],
	stateId: 'vlansgrid',
	stateful:true,
	stateEvents: ['columnresize', 'show', 'hide'],
	multiSelect: true,
	plugins:[
		Ext.create('Ext.ux.grid.xFilterRow',{
			remoteFilter:true
		}),
	],
	stripeRows: true, 
    initComponent: function() {
        this.columns = [
            {header: 'Vlan', dataIndex: 'Number', flex: 1},
            {header: 'Name',  dataIndex: 'Name',  flex: 2},
            {header: 'Address',  dataIndex: 'Address',  flex: 1},
            {header: 'Subnet Mask',  dataIndex: 'NetMask',  flex: 1},
            {header: 'Layer',  dataIndex: 'Layer',  flex: 1},
            {header: 'Layer3Domain',  dataIndex: 'Layer3Domain',  flex: 1},
            {header: 'Contact',  dataIndex: 'Contact',  flex: 1},
            {header: 'Location',  dataIndex: 'Location',  flex: 1},
            {header: 'Description',  dataIndex: 'Description',  flex: 1},
            {header: 'Secure',  dataIndex: 'Secure',  flex: 1,renderer: function(value){
			if(value == true){
				return "<img height='25px' width='25px' src='icons/locked-icon.png'/>";
			}
			else{
				return "<img height='25px' width='25px' src='icons/unlocked-icon.png'/>";
			}
		}
            },
        ];
 
        this.callParent(arguments);
    },
	bbar:[
		{
			xtype: 'pagingtoolbar',
			items:[
				{text:'Reset',	action: 'reset'	},
				{text:'Show All',action: 'showall'},
				{text:'Export',action: 'csv'},
			],
			displayInfo: true,
			displayMsg: 'Displaying vlans {0} - {1} of {2}',
			store: 'Vlans',
			doRefresh: function(){
				Ext.getStore('Vlans').load();
			}
		}
	],
	store: 'Vlans'
});
