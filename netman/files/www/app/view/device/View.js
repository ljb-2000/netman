Ext.define('netman.view.device.View', {
    extend: 'Ext.container.Container',
    alias : 'widget.deviceview',
    closable: true,
    title : 'Device Information',
    layout: 'fit',
    autoShow: true,
	region: 'center',
 
    initComponent: function() {	
	var data = Ext.getStore('activeDevice').data.items[0].data;
	var onlinecolor = 'green';
	if (data.Alive == 3){
		data.Online = 'Deleting';
	}
	else if (data.Alive == 2){
		data.Online = 'New';
	}
	else if (data.Alive == 1){
		data.Online = 'Online';
	}
	else if (data.Alive == 0){
		data.Online = 'Offline';
		onlinecolor = 'red';
	}
        this.items = [
            {
                xtype: 'container',
		layout: 'border',
		defaults: {
			collapsible: true,
		},
                items: [
			{
				title: 'System',
				xtype: 'toolbar',
				style: {
					'background':'#EEE',
				},
				region: 'north',
				collapsible: false,
				height: 60,
				items:[
				{xtype:'tbspacer',width:'15px'},
				{
					xtype: 'container',
					width:300,
					items:[	
						{
						bodyStyle:{
							'font-size':'13px',
							'border':'none',
							'background':'#EEE',
							'font-weight':'bold'
						},html:data.Name},
						{bodyStyle:{
							'font-size':'12px',
							'border':'none',
							'background':'#EEE',
						},html:data.ClassName},
						{bodyStyle:{
							'font-size':'12px',
							'border':'none',
							'background':'#EEE',
						},html:data.Address},
					]	
				},
				{xtype:'tbspacer',width:'15px'},
				{
					xtype: 'container',
					items:[	
						{bodyStyle:{
							'font-size':'14px',
							'border':'none',
							'background':'#EEE',
							'color': onlinecolor
						},html:data.Online},
						{bodyStyle:{
							'font-size':'11px',
							'border':'none',
							'background':'#EEE',
						},html:"Device Status"},
					]	
				},
				{xtype:'tbspacer',width:'75px'},
				{
					xtype: 'container',
					/*items:[
						{layout:'column',items:[
							{
								xtype:'container',
								width:40,
								height:20,
								style: {
									'background':'red',
									'color':'white',
									'opacity':'.6'
								},
								html:'0'
							},
							{
								xtype:'container',
								width:40,
								height:20,
								style: {
									'background':'yellow',
									'color':'black',
									'opacity':'.6'
								},
								html:'0'
							},
							{
								xtype:'container',
								width:40,
								height:20,
								style: {
									'background':'blue',
									'color':'white',
									'opacity':'.6'
								},
								html:'0'
							},
						]}
					]
					*/
				},
				{xtype:'tbspacer',width:'75px'},
				{
					xtype: 'container',
					items:[	
						{bodyStyle:{
							'font-size':'14px',
							'border':'none',
							'background':'#EEE',
						},html:data.State},
						{bodyStyle:{
							'font-size':'11px',
							'border':'none',
							'background':'#EEE',
						},html:"Production State"},
					]	
				},
				{xtype:'tbspacer',width:'35px'},
				{
					xtype: 'container',
					items:[	
						{bodyStyle:{
							'font-size':'14px',
							'border':'none',
							'background':'#EEE',
						},html:data.Layer},
						{bodyStyle:{
							'font-size':'11px',
							'border':'none',
							'background':'#EEE',
						},html:"Layer"},
					]	
				},
				{xtype:'tbspacer',width:'35px'},
				{
					xtype: 'container',
					items:[	
						{bodyStyle:{
							'font-size':'14px',
							'border':'none',
							'background':'#EEE',
						},html:data.L2Domain},
						{bodyStyle:{
							'font-size':'11px',
							'border':'none',
							'background':'#EEE',
						},html:"Domain"},
					]	
				},
				]
			},
                    {
			xtype: 'devicecomponents',
			region: 'west',
			width: 200,
                    },
                    {
			id: 'devicecomponent',
			layout:'fit',
			region:'center',
			collapsible: false,
                    },
			{
				xtype: 'toolbar',
				title:'Actions',
				region:'south',
				height:30,
				items: [
				{
					icon: 'icons/glyphicons_113_justify.png',
					iconCls: 'icon',
					menu: [
						{
							text: 'Edit',
							action: 'edit'
						},
						{
							text: 'Delete',
							action: 'delete'	
						},
						{
							text: 'Add Note',
							aciton: 'note'	
						},
						{
							text: 'Schedule Maintenance',
							action: 'maintenance'	
						}
					]
				},
				]
			}
                ]
            }
        ];
 
        this.callParent(arguments);
	},
});
