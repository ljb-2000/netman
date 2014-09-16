Ext.define('netman.view.user.Exit', {
    extend: 'Ext.window.Window',
    alias : 'widget.userexit',
 
    title : 'Comfirm Exit',
    layout: 'fit',
    autoShow: true,
 
    initComponent: function() {
        this.items = [
            {
                xtype: 'container',
		html: 'Are you sure you want to exit the system?'
            }
        ];
 
        this.buttons = [
            {
                text: 'Exit',
                action: 'exit'
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
