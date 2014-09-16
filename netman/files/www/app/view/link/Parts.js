Ext.define('netman.view.link.Parts', {
    alias : 'widget.linkparts',
	layout:'fit',
	stripeRows: true,
    initComponent: function() {	
		var record = Ext.ComponentQuery.query('linklist')[0].getView().getSelectionModel().getSelection()[0];
		Ext.apply(this,{
			store :  Ext.create('Ext.data.Store',{
				model: 'netman.model.LinkPart',
				id: 'linkParts',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api:{
						read: 'data/read/linkparts.php?Link=' + record.data.Name,
						update: 'data/update/linkparts.php?Link=' + record.data.Name,
						create: 'data/create/linkparts.php?Link=' + record.data.Name
					},
					reader:{
						type: 'json',
						root: 'data',
						successProperty: 'success',
						totalProperty: 'totalCount'
					}
				},
				pageSize: User.PageSize,
				remoteSort: true,
				remoteFilter: true
			})}
		);
		this.store.on('load',function(store,records,successful,eOpts){
			var view = Ext.ComponentQuery.query('linkparts')[0];
			
			store.each(function(record){
					/* Take record and build link part as below formatted, but fix format for make more nicey*/
					var info = 
					{
						xtype: 'form',
						style: {'border-style':'none'},
						draggable: true,
						defaults: {
							layout: 'column',
						},
							style:{
								'border':'1px solid black',
								'margin-top':'10px',
							},
						items: [
							{
								xtype:'displayfield',
								value: 'Sequence: ' + record.data.Sequence
							},
							{ 
								items:[
									{xtype:'displayfield',fieldLabel:'Location'},
									{xtype:'textfield',name:'Location1',value:record.data.Room1},
									{xtype:'textfield',name:'Location2',value:record.data.Room2},
								]
							},
							{ 
								items:[
									{xtype:'displayfield',fieldLabel:'Rack'},
									{xtype:'textfield',value:record.data.Rack1},
									{xtype:'textfield',value:record.data.Rack2},
								]
							},
							{ 
								items:[
									{xtype:'displayfield',fieldLabel:'FXP'},
									{xtype:'textfield',value:record.data.Fxp1},
									{xtype:'textfield',value:record.data.Fxp2},
								]
							},
							{ 
								items:[
									{xtype:'displayfield',fieldLabel:'Fiber Pairs'},
									{xtype:'textfield',value:record.data.Pair1a,anchor:'20%',},
									{xtype:'textfield',value:record.data.Pair1b,anchor:'20%',},
								]
							},
							{ 
								items:[
									{xtype:'displayfield',fieldLabel:'Cable Length'},
									{xtype:'textfield',value: record.data.Length1,},
									{xtype:'textfield',value: record.data.Length2},
								]
							},
						
						],
					};
					view.add(info);
					view.down('form').loadRecord(record);
				},this
			);
			/*Ext.ComponentQuery.query('linkparts')[0].doLayout();*/
			/* Drag drop functions */
			var overrides = {};
			var formElements = Ext.ComponentQuery.query('linkparts > form');
			Ext.each(formElements, function(el){
				var dd = new Ext.dd.DD(el,'hopDDGroup',{
					isTarget: false,
					b4StartDrag : function() {
    						if (!this.el) {
                 					this.el = Ext.get(this.getEl());
                     	
						}
						this.originalXY = this.el.getXY();
					},
					onInvalidDrop : function() {
					this.invalidDrop = true;
					},
					endDrag : function() {
						if (this.invalidDrop === true) {
							this.el.removeClass('dropOK');
							var animCfgObj = {
								easing   : 'elasticOut',
								duration : 1,
								scope    : this,
								callback : function() {
									this.el.dom.style.position = '';
								}
							};
							this.el.moveTo(this.originalXY[0], this.originalXY[1], animCfgObj);
							delete this.invalidDrop;
							}
					},
				});
				Ext.apply(dd,overrides);
			});
			/* drop target */
			var partsDDTarget = new Ext.dd.DDTarget('linkparts','hopDDGroup');
		});
		this.items = [
		];
		this.callParent(arguments);
	},
});
