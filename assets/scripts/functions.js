/** OnLoad functions **/
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

/** Edit Competitor General Information **/
function editCompetitor() {
	try{document.getElementById('updatebutton').style.backgroundPosition = "100% -18px";} catch(e) {}
	window.ajax_throbber_id = "updatebutton";
	var cdat = new ajaxCall();
	cdat.loadFile("assets/scripts/member_details_edit.php?edit=1", "competitor-information");
}

function saveCompetitor() {
	document.getElementById('savebutton').style.backgroundPosition = "100% -18px";
	window.ajax_throbber_id = "savebutton";
	var submit = document.getElementById("competitor-information");
	var cdat = new ajaxCall();
	cdat.loadFile("assets/scripts/member_details_edit.php?save=1"+getInputValuesString(submit), "competitor-information");
}

function loadCompetitor() {
	document.getElementById('cancelbutton').style.backgroundPosition = "100% -18px";
	window.ajax_throbber_id = "cancelbutton";
	var cdat = new ajaxCall();
	cdat.loadFile("assets/scripts/member_details_edit.php", "competitor-information");
}


function autoUpdateProfile(wcaid, name) {
	editCompetitor();
	window.ajax_callback = "finishAutoUpdate('"+wcaid+"','"+name+"')";
}
function finishAutoUpdate(wcaid, name) {
	var lastspace = name.lastIndexOf(" ");
	if(lastspace) {
		var first = name.substring(0, lastspace);
		var last = name.substring(lastspace+1);
	} else {
		var first = name;
		var last = "";
	}
	document.getElementById('fname').value = first;
	document.getElementById('lname').value = last;
	document.getElementById('wcaid').value = wcaid;
	saveCompetitor();
}


/** Competitor Search **/
function findCompetitor() {
	var lname = document.getElementById('lname').value;
	var fname = document.getElementById('fname').value;
	var csearch = new ajaxCall();
	document.getElementById('searchbutton').style.backgroundPosition = "100% -18px";
	window.ajax_throbber_id = "searchbutton";
	csearch.loadFile("assets/scripts/namesearch.php?l="+lname+"&f="+fname,"namesearch-output");
}

function addCompetitor(id, name, country, gender) {
	var names = name.split(" ");
	var first = names[0];
	var last = "";
	for(var i=1; i<names.length;  i++) {
		last += names[i] + " ";
	}

	document.getElementById('fname').value = first;
	document.getElementById('lname').value = last;
	document.getElementById('wcaid').value = id;
	setSelectValue("country", country);
	setSelectValue("gender", gender.toUpperCase());

	document.getElementById('namesearch-output').innerHTML = "";
	document.getElementById('namesearch-success').innerHTML = "<span class='success'>Don't forget the following fields!</span>"

	document.getElementById('bmonth').focus();
}

function setSelectValue(selectid, val) {
	var select = document.getElementById(selectid);
	for(i = 0; i < select.length; i++) {
		if(select[i].value == val) { select.selectedIndex = i; break; }
	}
}