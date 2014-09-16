Ext.define('netman.view.portal.View', {
    extend: 'Ext.container.Container',
    uses: ['netman.view.portal.Portlet'],
    alias : 'widget.portalview',
    title : 'Portal',
    autoShow: true,
    layout: {
	type: 'column',
    },
    initComponent: function(){
	console.log("initComponent");
	this.callParent();
	this.addEvents({
		validatedrop:true,
		beforedragover:true,
		dragover:true,
		beforedrop:true,
		drop:true,
	});
	this.on('drop',this.doLayout,this);
    },
    beforeLayout: function(){
	console.log("beforeLayout");
	var items = this.layout.getLayoutItems(),
		len = items.length,
		i = 0,
		item;
	for(;i<len;i++){
		item = items[i];
		item.columnWidth = 1/ len;
		item.removeCls(['x-portal-column-first','x-portal-column-last']);
	}
	items[0].addCls('x-portal-column-first');
	items[len - 1].addCls('x-portal-column-last');
	return this.callParent(arguments);
    },
    initEvents: function(){
	console.log("initEvents");
	this.callParent();
	this.dd = Ext.create('netman.view.portal.Dropzone',this,this.dropConfig);
    },
    beforeDestroy: function(){
	if (this.dd){
		this.dd.unreg();
	}
	this.callParent();
    },
	defaults:{
		xtype: 'container',
		layout: 'anchor',
	},
	items:[
	{
		id: 'col-1',
		items: [
		{
			xtype: 'portlet',
			resizable: true,
			id: 'portlet-1',
			title: 'Portlet 1',
			html: 'This is portlet 1'
		}
		]
	},
	{
		id: 'col-2',
		items: [
		{
			xtype: 'portlet',
			id: 'portlet-2',
			title: 'Portlet 2',
			html: 'This is portlet 2'
		}
		]
	},
	{
		id: 'col-3',
		items: [
		{
			xtype: 'portlet',
			id: 'portlet-3',
			title: 'Portlet 3',
			html: 'This is portlet 3'
		}
		]
	}
	]
 
});
