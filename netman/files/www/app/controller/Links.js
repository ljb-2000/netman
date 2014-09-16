Ext.define('netman.controller.Links',{
	extend: 'Ext.app.Controller',
	stores:[
		'Links',
		'LinkParts',
		'Options',
	],
	init: function(){
		this.control({
			'linklist': {
				itemdblclick: this.viewLink,
				afterrender:  this.loadOptions,
			},
			'menu' : {
			},
			'[action=options]' :{
				click: this.Options
			},
			'[action=newoption]' :{
				click: this.newOption
			},
			'linkparts' : {
			},
			'menucheckitem' : {
				click: this.runSearch
			},
		});
	},
	Options: function(){
		var view = Ext.widget('linkoptions');
	},
	newOption: function(button){
		var store = Ext.getStore('Options');
		store.add({
			'Name':'',
			'Description':'',
			'Type':'',
		});
		store.sync();
	},
	viewLink: function(button,record){
		var view = Ext.widget('linkview');
		view.down('form').loadRecord(record);
	},
	loadOptions: function(){
		var store = Ext.getStore('Options');
		store.on('load',function(){
			store.each(function(record) {
				if( record.data.Type == "Link" ){
					var idstring = '#' + record.data.Type + record.data.Option;
					var menu = Ext.ComponentQuery.query(idstring)[0].menu;
					menu.add(
						{xtype:'menucheckitem',text:record.data.Name,field:record.data.Option,value:record.data.Name,checked:false}
					);
				}
			});
		});
	},
	runSearch: function(){
		var grid = Ext.ComponentQuery.query('grid')[0];
		grid.getXFilterRow().storeSearch();
	},
	views: [
		'link.Search',
		'link.List',
		'link.Options',
		'link.OptionsList',
		'link.View',
		'link.PortletPanel',
		'link.PortalPanel',
	],
});
