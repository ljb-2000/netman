Ext.define('netman.store.AllPortlets',{
	extend: 'Ext.data.TreeStore',
	model: 'netman.model.Portlet',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/allportlets.json',
		},
		reader:{
			type: 'json',
			root: 'children',
			successProperty: 'success',
		}
	},
});
Ext.define('netman.store.Classes',{
	extend: 'Ext.data.TreeStore',
	model: 'netman.model.Class',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/classes.php',
			update: 'data/update/classes.php',
			create: 'data/create/classes.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	remoteSort:false
});
Ext.define('netman.store.ComboClasses',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Class',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/comboclasses.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
		}
	},
	remoteSort:false
});
Ext.define('netman.store.ComboDevices',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Device',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/combodevices.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.DeviceComponents',{
	extend: 'Ext.data.TreeStore',
	model: 'netman.model.DeviceComponents',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/components.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
		}
	},
});
Ext.define('netman.store.Devices',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Device',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/devices.php',
			update: 'data/update/devices.php',
			create: 'data/create/devices.php',
			destroy: 'data/destroy/devices.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.Domains', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Domain',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/domains.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
Ext.define('netman.store.Durations', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Durations',
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/durations.json',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
Ext.define('netman.store.Events',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Event',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/events.php',
			update: 'data/update/events.php',
			create: 'data/create/events.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		actionMethods: {
			create: 'POST',
			read: 'POST',
			update: 'POST',
			destroy: 'POST'
		},
	},
	pageSize: User.PageSize,
	remoteSort: true,
	remoteFilter: true
});
Ext.define('netman.store.Graphs',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Graph',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/graphs.php',
			update: 'data/update/graphs.php',
			create: 'data/create/graphs.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.Groups', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Group',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/groups.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
Ext.define('netman.store.History',{
	extend: 'Ext.data.Store',
	model: 'netman.model.History',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/history.php',
			update: 'data/update/history.php',
			create: 'data/create/history.php'
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
});
Ext.define('netman.store.Interfaces',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Interface',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/interfaces.php',
			update: 'data/update/interfaces.php',
			create: 'data/create/interfaces.php'
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
});
Ext.define('netman.store.LinkParts',{
	extend: 'Ext.data.Store',
	model: 'netman.model.LinkPart',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/linkparts.php',
			update: 'data/update/linkparts.php',
			create: 'data/create/linkparts.php',
			destroy: 'data/destroy/linkparts.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.Links',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Link',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/links.php',
			update: 'data/update/links.php',
			create: 'data/create/links.php',
			destroy: 'data/destroy/links.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.Logins',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Login',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/logins.php',
			update: 'data/updateLogin.json'
		},
		reader:{
			type: 'json',
			root: 'logins',
			successProperty: 'success'
		}
	}
});
Ext.define('netman.store.Maintenance',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Maintenance',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/maintenance.php',
			update: 'data/update/maintenance.php',
			create: 'data/create/maintenance.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.Options',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Option',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/options.php',
			update: 'data/update/options.php',
			create: 'data/create/options.php',
			destroy: 'data/destroy/options.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.Properties',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Property',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/properties.php',
			update: 'data/update/properties.php',
			create: 'data/create/properties.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.Severities', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Severity',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/severities.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
Ext.define('netman.store.States', {
	extend: 'Ext.data.Store',
	model: 'netman.model.State',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/states.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
Ext.define('netman.store.Statuses', {
	extend: 'Ext.data.Store',
	model: 'netman.model.Status',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/statuses.php',
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
});
Ext.define('netman.store.Subscriptions',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Subscription',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/subscriptions.php',
			update: 'data/update/subscriptions.php',
			create: 'data/create/subscriptions.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.Tags',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Tag',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/tags.php',
			update: 'data/update/tags.php',
			create: 'data/create/tags.php'
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
});
Ext.define('netman.store.Transformations',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Transformation',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/transformations.php',
			update: 'data/update/transformations.php',
			create: 'data/create/transformations.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
Ext.define('netman.store.Users',{
	extend: 'Ext.data.Store',
	model: 'netman.model.User',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/users.php',
			update: 'data/update/users.php'
		},
		reader:{
			type: 'json',
			root: 'users',
			successProperty: 'success'
		},
		writer: {
			type: 'json',
			root: 'users',
			successProperty: 'success',
			writeRecordId :true
			
		}
	}
});
Ext.define('netman.store.Vlans',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Vlan',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/vlans.php',
			update: 'data/update/vlans.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
