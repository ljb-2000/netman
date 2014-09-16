Ext.define('netman.controller.Login',{
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'[action=login]': {
				click: this.doLogin
			},
			'[action=reset]': {
				click: this.resetPassword
			},
			'textfield': {
				afterrender: function(){
					Ext.ComponentQuery.query('[name=Username]')[0].focus();
				},
				specialkey: function(field,e){
					if(e.getKey() == e.ENTER){
						var mybutton = Ext.ComponentQuery.query('[action=login]')[0];
						mybutton.fireEvent('click',mybutton);
					}
				}
			}
		});
	},
	setEnter: function(){
	},
	doLogin: function(button){
		var form = button.up('form').getForm();
		if(form.isValid()){
			form.submit({
				success: function(form,action){
					Ext.Msg.alert('Good Login',action.result.message);
					document.location = '?url=' + document.URL;
				},
				failure: function(form,action){
					Ext.Msg.alert('Invalid Login',action.result.message);
				}
			});
		}
			
	},
	resetPassword: function(){
		Ext.Msg.alert('Password Recovery','Feature not available');
	}
	
});
