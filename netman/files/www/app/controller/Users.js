Ext.define('netman.controller.Users',{
	extend: 'Ext.app.Controller',
	stores:[
		'Users',
		'Groups',
		'Subscriptions',
		'ComboDevices',
		'ComboClasses',
		'Severities',
		'Processes',
		'Services',
	],
	init: function(){
		/* Session check, user control functions here */
		this.control({
			'loginedit button[action=login]' : {
				click: this.doLogin
			},
			'[action=logout]':{
				click: this.logout
			},
			'[action=saveuser]' : {
				click: this.updateUser
			},
			'[action=clearcookies]': {
				click: this.clearcookies
			},
			'usericon' : {
				afterrender: this.startClock
			},
			'[action=settings]' : {
				click:this.loadsettings
			},
			'[action=search]' : {
				click:this.search
			},
			'[action=newsub]' : {
				click:this.newsub
			},
			'[action=savesub]' : {
				click:this.saveSub
			},
			'subscriptionlist': {
				itemdblclick: this.viewSubscription,
			},
			'[action=changepass]' : {
				click : this.changepass
			},
			'[action=admin]' : {
				click : this.loadAdmin
			},
		});
	},
	clearcookies: function(button){
		clearCookies();
	},
	changepass: function(button){
		var form = button.up('form').getForm();
		if(form.isValid()){
			form.submit({
				success: function(form,action){
					Ext.Msg.alert('Password Change',action.result.message);
				},
				failure: function(form,action){
					Ext.Msg.alert('Pasword Change',action.result.message);
				}
			});
		}
	},
	viewSubscription: function(){
		var record = Ext.ComponentQuery.query('subscriptionlist')[0].getView().getSelectionModel().getSelection()[0];
		var view = Ext.widget('subscription');
		view.down('form').loadRecord(record);
	},
	newsub: function(button){
		var grid = button.up('panel');
		var store = Ext.getStore('Subscriptions');
		var inst = store.add({'Name':'','Active':'0'})[0];
		store.sync();
		
		grid.getSelectionModel().select(inst, true, true);
		grid.getView().select(inst, true, true);
		var record = Ext.ComponentQuery.query('subscriptionlist')[0].getView().getSelectionModel().getSelection()[0];
		var view = Ext.widget('subscription');
		view.down('form').loadRecord(record);
	},
	search: function(){
		var view = Ext.widget('usersearch');
		
	},
	setuser: function (){
		var view = Ext.widget('usersettings');
		view.down('form').loadRecord(record);
	},
	doLogin: function(grid,record){
		var view = Ext.widget('loginedit');
		view.down('form').loadRecord(record);
	},
	logout: function(record){
		Ext.Msg.confirm('Logout','Are you sure you want to exit the system?',function(btn){
			if(btn == 'yes'){
				Ext.Ajax.request({url:'data/logout.php'});
				setTimeout(function(){
					location.reload();
				},900);
			}
		},this);
		
	},
	loadsettings: function(){
		var view = Ext.widget('usersettings');
		view.down('#usettings').loadRecord(Ext.getStore('Users').data.items[0]);
	},
	loadAdmin: function(){
		var view = Ext.widget('useradmin');
	},
	updateUser: function(button){
		var win = button.up('window');
		form = win.down('form');
		record = form.getRecord();
		values = form.getValues();
		var model = Ext.create('netman.model.User',values);
		var errors = model.validate(), message = "";
		if(errors.length < 1){
			record.set(values);
			if(record.data.PageSize != User.PageSize){
				Ext.each(Ext.StoreManager.items,function(store){store.pageSize=record.data.PageSize;});
			}
			Ext.getStore('Users').sync({
				success: function(response){
					Ext.Msg.alert('Info','Account information updated.');
				},
				failure: function(response){
					Ext.Msg.alert('Info','Unable to update account info.');
				}
			});
		}
	},
	saveSub: function(button){
		var win = button.up('window');
		form = win.down('form');
		form.isDirty = true;
		record = form.getRecord();
		values = form.getValues();
		record.set(values);
		var store = Ext.getStore('Subscriptions');
		store.sync({
			success: function(data){
				var resp = Ext.decode(data.responseText);
				Ext.Msg.alert('OK',resp);
			},
			failure: function(data){
				var resp = Ext.decode(data.responseText);
				Ext.Msg.alert('Failure',resp);
			}
		});
	},
	startClock: function(){
		var clock = Ext.ComponentQuery.query('#clock')[0];
		setInterval(function(){
			clock.setText(Ext.Date.format(new Date(),'D M d, Y H:i:s'));
		}, 1000);
		/* Server Check */
		setInterval(function(){
			var icon = Ext.ComponentQuery.query('#clock')[0];
			var test = Ext.Ajax.request({
				url: site_url + '/data/read/servercheck.php',
				success: function(response){
					var resp = Ext.decode(response.responseText);
					if(resp.success){
						icon.setIcon('icons/green-circle.png');
					}
					else{
						icon.setIcon('icons/red-circle.png');
					}
				},
				failure: function(response){
					icon.setIcon('icons/red-circle.png');
				},
				
			});

		},15000);
		
	},
	views:[
		'user.Login',
		'user.Exit',
		'user.Icon',
		'user.Settings',
		'user.Search',
		'user.SubscriptionList',
		'user.Subscription',
		'user.List',
		'user.GroupList',
		'user.Admin',
		'user.ServiceList',

	]
	
});
