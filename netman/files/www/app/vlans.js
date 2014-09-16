Ext.require([
	'Ext.util.History',
]);
var egridrefresh = '';
Ext.application({
	name: 'netman',
	appFolder: 'app',
	launch: function(){
	        var task = new Ext.util.DelayedTask(function() {
			splashscreen.fadeOut({
				duration: 1000,
				remove: true
			});
			splashscreen.next().fadeOut({
				duration: 1000,
				remove: true,
				listeners: {
					afteranimate: function(){
						Ext.getBody().unmask();
					}
				}
			});
		});
		task.delay(1000);
		Ext.create('Ext.container.Viewport',{
			requires: [
				'Ext.resizer.Splitter',
				'Ext.fx.target.Element',
				'Ext.fx.target.Component'
			],
			layout: 'border',
			items:[
			{
				xtype: 'container',
				region: 'north',
				layout: 'border',
				height: 70,
				items: [
					{
						xtype: 'box',
						id: 'main_nav',
						height:40,
						html: mainnav,
						region:'west'
					},
					{
						xtype: 'usericon',
						region:'east'
					},
					{
						xtype:'box',
						height:30,
						id: 'crumbs',
						region:'south',
						html: "<a href='vlans'>Vlans</a>",
					}
				]
			},
			{
					xtype: 'vlansearch',
					region: 'center'
				}
		]
		}
		);
	},
	controllers: [
		'Users',
		'Vlans',
	]
});
var splashscreen;

Ext.onReady(function() {
	splashscreen = Ext.getBody().mask('Loading...', 'splashscreen');
	splashscreen.addCls('splashscreen');
	Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], { cls: 'x-splash-icon' });
});
