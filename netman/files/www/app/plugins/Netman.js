if(User.Stateful == '1'){
	Ext.state.Manager.setProvider(
		new Ext.state.CookieProvider({
			expires: new Date(new Date().getTime()+(1000*60*60*24*7*30)), //30 days from now
		})
	);
}
else{
	Ext.state.Manager.setProvider(
		new Ext.state.CookieProvider({
			expires: new Date(new Date().getTime()-(1000*60*60*24*7*30)), // 30 Days Ago
		})
	);
}

var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_Opera = navigator.userAgent.indexOf("Presto") > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}

function dot2num(dot) 
{
    var d = dot.split('.');
    return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}

function num2dot(num) 
{
    var d = num%256;
    for (var i = 3; i > 0; i--) 
    { 
        num = Math.floor(num/256);
        d = num%256 + '.' + d;
    }
    return d;
}
/*window.onbeforeunload = function (e) {
  var message = "You are attempting to leave NetMan",
  e = e || window.event;
  // For IE and Firefox
     if (e) {
         e.returnValue = message;
           }
	return message;
};
*/
function checked(value){
	if(value == 2){
		return "?";
	}
	else if(value == 1){ 
		return "<img src='icons/green-circle.png'/>";
	}else{
		return "<img src='icons/red-circle.png'/>";
	}
}
function eventStatus(value){
	if(value == 4){
		return 'Closed';
	}
	else if(value == 3){
		return 'Clear';
	}
	else if(value == 2){
		return "Suppresed";
	}
	else if(value == 1){ 
		return "Acknowledged";
	}
	else if(value == 0){ 
		return "New";
	}
}
function eventSeverity(value){
	if(value > 4){
		return "Debug";
	}
	else if (value == 4){
		return "Info";
	}
	else if (value == 3){
		return "Warning";
	}
	else if (value == 2){
		return "Error";
	}
	else if (value == 1){
		return "Critical";
	}
	else{
		return "";
	}
}
function uptime(lastDown){
	var lastDown = new Date(lastDown).getTime()/1000;
	var now = new Date().getTime()/1000;
	lapsed = Math.round(now - lastDown);


	if(lapsed > 1000000000){
		return "Never seen down";
	}
	else{
		var seconds = Math.round(lapsed);
		var minutes = Math.round(seconds/ 60);
		var hours = Math.round(minutes/ 60);
		var days = Math.round(hours/ 24);
		var weeks = Math.round(days/ 7);
		var months = Math.round(days/ (365/12));
		var years = Math.round(days/ 365);
		if(years > 1){
			return years + ' years';
		}
		else if(months > 1){
			return months + ' months';
		}
		else if(weeks > 1){
			return weeks + ' weeks';
		}
		else if(days > 1){
			return days + ' days';
		}
		else if(hours > 1){
			return hours + ' hours';
		}
		else if (minutes > 1){
			return minutes + ' minutes';
		}
		else if (seconds > 1){
			return 'seconds';
		}
		else{
			return " ";
		}
	}
}
function mkdate(input){
	var a = new Date(input).getTime();
	if(parseFloat(a) < 1){
		return "";
	}
	else{
		return input;
	}
}


Ext.override('Ext.data.Store', {

    datachanged: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful();

        if (resultSet) {
           me.totalCount = resultSet.totalRecords;
        }

        if (successful) {
            me.loadRecords(records, operation);
        }

        me.loading = false;
        me.fireEvent('load', me, records, successful);

        me.fireEvent('read', me, records, operation.wasSuccessful());

        Ext.callback(operation.callback, operation.scope || me, [records, operation, successful]);
    },
});
function store2csv(store){
	var p = '';
	var out = '';
	var count = 0;
	Ext.each(Ext.getStore(store).data.items,function(record){
                   for(var property in record.data){
                       if(count == 0){
                           p += property + ",";
                       }
                       if(record.data.hasOwnProperty(property)){
                       }
                           out += '"' + escape(record.data[property]) + '",';
                   }
                   count ++;
                   out += escape('\r\n');
               })
		if( (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) || (is_explorer = navigator.userAgent.indexOf('MSIE') > -1) ){

			Ext.Ajax.request({
				url: 'data/read/export.php',
				params: {
					headers: p + escape('\r\n'),
					data: out
				},
				success: function(response){
					/*alert(response.responseText);*/
					Ext.Msg.alert('Export for Safari/ Internet Explorer Users',"Safari: Right click the link below and select: Download Linked File.<br/>Internet Explorer: Right click the file and select 'Save target as...'<br/>" +  response.responseText);
				}
			});
		}
		else{
              		var open = window.open("data:text/csv;charset=utf-8," + p + escape('\r\n') + out);
			if (open == null || typeof(open)=='undefined'){
				/* Additional work arounds go here */
			}
		}
		
}
function templateRenderer(template) {
    return function(value, meta, record, rowIndex, colIndex, store) {
        return template.applyTemplate(record.data);
    };
}
