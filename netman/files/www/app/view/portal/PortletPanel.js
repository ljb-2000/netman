Ext.define('netman.view.portal.PortletPanel', {
	extend: 'netman.view.portal.PortalPanel',
	alias: 'widget.portletpanel',
	getTools: function(){
		return [
			{
				type:'minimize',
				handler: function(e,target,panel){
					var c = panel.up('viewport');
					c.getLayout().setActiveItem(0);
					c.doLayout();
				}
			},
			{
				type:'maximize',
				handler: function(){
					var c = panel.up('viewport');
					var testPanel = Ext.getCmp('test1');
					var con = panel.ownerCt.initialConfig;
					testPanel.insert(0,con);
					c.getLayout().setActiveItem(1);
					c.doLayout();
				}
			}
		]
	},
	
	initComponent: function(){
		/* Create columns based on user's settings  */
		i = 0;
		var myitems = [];
		if(User.Portlets.length < 1){
			newitem = {id:'col-' + i,items:[] };
			myitems.push(newitem);
		}
		for (; i < User.Portlets.length; i++) {
			/* i is the column number */
			newitem = {id:'col-' + i,items:[] };
			for(p = 0; p < User.Portlets[i].data.length; p ++){
				portlet = Ext.widget(User.Portlets[i].data[p]);
				newitem.items.push(portlet)
			}
			myitems.push(newitem);
		}
		Ext.apply(this,{
			items: myitems
		});
		this.callParent(arguments);
	}
});
