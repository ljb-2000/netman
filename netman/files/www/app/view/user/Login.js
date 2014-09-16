Ext.define('netman.view.user.Login', {
    extend: 'Ext.window.Window',
    alias : 'widget.userlogin',
 
    title : 'Login',
    layout: 'fit',
    autoShow: true,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'username',
                        fieldLabel: 'Username'
                    },
                    {
                        xtype: 'textfield',
                        name : 'passwd',
                        fieldLabel: 'Password'
                    }
                ]
            }
        ];
 
        this.buttons = [
            {
                text: 'Submit',
                action: 'login'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];
 
        this.callParent(arguments);
    }
});
