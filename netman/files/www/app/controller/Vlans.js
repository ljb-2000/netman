Ext.define('netman.controller.Vlans',{
	extend: 'Ext.app.Controller',
	stores:[
		'Vlans',
		'Domains'
	],
	init: function(){
		this.control({
			'vlanlist': {
				itemdblclick: this.viewVlan
			},
			'vlanedit button[action=save]' : {
				click: this.updateVlan
			},
			'[action=edit]': {
				click: this.editVlan
			},
			'[action=save]': {
				click: this.updateVlan
			},
		});
	},
	editVlan: function(grid,record){
		var record = Ext.ComponentQuery.query('vlanlist')[0].getView().getSelectionModel().getSelection()[0];
		var view = Ext.widget('vlanedit');
		view.down('form').loadRecord(record);
	},
	updateVlan: function(button){
		var store = Ext.getStore('Vlans');
		var win = button.up('window'),
		form = win.down('form'),
		record = form.getRecord(),
		values = form.getValues();
		store.sync({
			success: function(){
				record.set(values);
				win.close();
			},
			failure: function(){
				alert("Failure");
			}
		});
	},
	viewVlan: function (grid,record){
		var view = Ext.widget('vlanview');
		view.down('form').loadRecord(record);
	},
	
	views:[
		'vlan.List',
		'vlan.Edit',
		'vlan.View',
		'vlan.Search',
	]
	
});
