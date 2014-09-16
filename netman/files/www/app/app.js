Ext.require([
	'Ext.util.History',
]);
var egridrefresh = '';
var myMask = '';
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
				height: 40,
				items: [
					{
						xtype: 'box',
						html: 'Netman: Network Management Console',
						region:'west'
					},
					{
						xtype: 'usericon',
						region:'east'
					}
				]
			},
			{
				xtype: 'tabpanel',
				id: 'main',
				cls: 'MainPanel',
				region: 'center',
				listeners: {
				},
				activeTab: 0,
				defaults: {
					activeTab: 0,
				},
				items:[
				{
					xtype:'panel',
					title: 'Dashboard',
					activeTab: 0,
					id: 'dashboard',
					layout: 'border',
					items:[
					{
						xtype: 'toolbar',
						height:'35',
						region:'north',
						items:[{
							icon: 'icons/glyphicons_113_justify.png',
							iconCls: 'icon',
							menu:[
								{text:'Add Column',action:'addcolumn'},
								{text:'Remove Column',action:'removecolumn'},
							]
						},
						{
							icon: 'icons/glyphicons_331_dashboard.png',
							iconCls: 'icon',
							tooltip: 'Add dashboard item',
							action: 'listportlets'
						}]
					},
					{
						xtype: 'portletpanel',
						region: 'center'
					}
					]
				},
				{
					xtype: 'devicesearch',
					title: 'Devices',
					id: 'devices'
				},
				{
					xtype: 'vlansearch',
					title: 'Vlans',
					id: 'vlans'
				},
				{
					xtype: 'container',
					title: 'Links',
					id: 'links'
				},
				{
					xtype: 'eventsearch',
					title: 'Event Browser',
					id: 'events'
				}
				]
			}
			]
		});
	},
	controllers: [
		'Users',
		'Devices',
		'Vlans',
		'Events',
		'Portals',
		'Windows'
	]
});
var splashscreen;
var tokenDelimiter = '/';

Ext.onReady(function() {
	Ext.History.init();
	splashscreen = Ext.getBody().mask('Loading...', 'splashscreen');
	splashscreen.addCls('splashscreen');
	Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], { cls: 'x-splash-icon' });
});
	var token = window.location.hash.substr(1);
	console.log("1" + token);
function onTabChange(tabPanel, tab) {
	var token = window.location.hash.substr(1);
	console.log("change" + token);

    var tabs = [],
        ownerCt = tabPanel.ownerCt, 
        oldToken, newToken;
        tabs.push(tab.id);
        tabs.push(tabPanel.id);
        while (ownerCt && ownerCt.is('tabpanel')) {
            tabs.push(ownerCt.id);
            ownerCt = ownerCt.ownerCt;
        }
        newToken = tabs.reverse().join(tokenDelimiter);
        oldToken = Ext.History.getToken();
	console.log("new" + newToken);
	console.log("old" + oldToken);
        if (oldToken === null || oldToken.search(newToken) == -1) {
            Ext.History.add(newToken);
        }
    }
    function onAfterRender() {
        Ext.History.on('change', function(token) {
            var parts, tabPanel, length, i;
            if (token) {
                parts = token.split(tokenDelimiter);
                length = parts.length;
                
                // setActiveTab in all nested tabs
                for (i = 0; i < length - 1; i++) {
                    Ext.getCmp(parts[i]).setActiveTab(Ext.getCmp(parts[i + 1]));
                }
            }
        
        // This is the initial default state.  Necessary if you navigate starting from the
        // page without any existing history token params and go back to the start state.
        var activeTab1 = Ext.getCmp('main').getActiveTab();
	try{
		var activeTab2 = activeTab1.getActiveTab();
	}
	catch(err){
		var activeTab2 = '';
	}
	var token = window.location.hash.substr(1);

	Ext.getCmp('main').setActiveTab(Ext.History.getToken());
	console.log("1 " + Ext.History.getToken());
	console.log("at" + activeTab1.id);
        onTabChange(activeTab1, activeTab2);
        });
    }
