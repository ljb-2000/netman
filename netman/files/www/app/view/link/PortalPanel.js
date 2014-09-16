Ext.define('netman.view.link.PortalPanel',{
	extend: 'Ext.panel.Panel',
	alias: 'Ext.linkportalpanel',
	requires: ['netman.view.link.Column'],
	cls: 'x-portal',
	bodyCls: 'x-portal-body',
	defaultType:'portalcolumn',
	autoScroll:true,
	initComponent: function(){
		var me = this;
		this.layout = {
			type: 'column'
		};
		this.callParent();
		this.addEvents({
			validatedrop:true,
			beforedragover: true,
			dragover: true,
			beforedrop: true,
			drop: true
		});
		this.on('drop',this.doLayout,this);
	},
	beforeLayout: function(){
		var items = this.layout.getLayoutItems(),
			len = items.length,
			i = 0,
			item;
		for (; i < len; i++) {
			item = items[i];
			item.columnWidth = 1 / len;
			item.removeCls(['x-portal-column-first', 'x-portal-column-last']);
		}
		console.log('here');
		items[0].addCls('x-portal-column-first');
		items[len - 1].addCls('x-portal-column-last');
		return this.callParent(arguments);
	},
	initEvents: function(){
		this.callParent();
		this.dd = Ext.create('netman.view.link.PortalDropZone',this,this.dropConfig);
	},
	beforeDestroy: function(){
		if(this.dd){
			this.dd.unreg();
		}
		this.callParent();
	},
});
