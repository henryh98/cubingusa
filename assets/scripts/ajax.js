function getInputValuesString(object) {
	var string = "";

	// get child values
	var items = object.childNodes;
	for(var i=0; i<items.length; i++) {
		string += getInputValuesString(items[i]);
	}

	// get this object value
	if(object.tagName == "INPUT" || object.tagName == "SELECT") {
		if(object.name) {
			if(object.getAttribute("type") == "checkbox") {
				string += "&"+object.name+"="+object.checked;
			} else {
				string += "&"+object.name+"="+escape(object.value);
			}
		}
	}

	return string;
}

var ajax_display_id = "ajax_content";
var ajax_throbber_id = "";
var ajax_callback = "";
function ajaxCall() {
	this.errors = "off";

	this.loadFile = function(url, content_id) {
		var basedir = "";
		if(window.basedir) {
			basedir = window.basedir;
		}

		window.ajax_display_id = content_id;

		xmlhttp=null;
		if (window.XMLHttpRequest){
			// code for Firefox, Opera, IE7, etc.
			xmlhttp=new XMLHttpRequest();
		}else if (window.ActiveXObject) {
			// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	 
		if (xmlhttp!=null){
			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4){ // 4 = "loaded"
					if (xmlhttp.status==200){ // 200 = "OK"
						try {
							document.getElementById(window.ajax_display_id).innerHTML = xmlhttp.responseText;
						} catch(e) { /* */ }
						if(window.ajax_throbber_id != "") {
							try { document.getElementById(window.ajax_throbber_id).style.backgroundPosition = "100% 2px"; }
							catch(e) {}
						}
						if(window.ajax_callback != "") {
							eval(window.ajax_callback);
							window.ajax_callback = "";
						}
					} else {
						if(this.errors == "on") { alert("Error loading URL."); }
					}
				}
			};
			xmlhttp.open("GET",basedir+url);
			xmlhttp.send(null);
		}else{
			if(this.errors == "on") { alert("Your browser does not support XMLHTTP."); }
		}
	};
}