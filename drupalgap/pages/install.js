$('#drupalgap_page_install').live('pageshow',function(){
	try {
		// @todo - perform system connect test to drupalgap.com
	  	// @todo - implement a service resource that performs an initial system connect handshake
	}
	catch (error) {
		console.log("drupalgap_page_install");
		console.log(error);
	}
});

// when the site url text field is clicked...
$('#drupalgap_page_install_site_url').live('click',function(){
	
	// remove 'drupalgap.com' from the text field for quick-n-easy user experience
	if ($('#drupalgap_page_install_site_url').val() == "http://www.drupalgap.com")
		$('#drupalgap_page_install_site_url').val("http://www.");
		
});

$('#drupalgap_page_install_connect').live('click',function(){
	try {
		var url = $('#drupalgap_page_install_site_url').val();
	  	if (!url) { alert("Enter your Drupal site's URL."); return false; }
	  	
	  	// update settings with new site url path
	  	settings = drupalgap_settings_load();
	  	settings.site_path = url;
	  	drupalgap_settings_save(settings);
	  	
	  	// perform system connect to see if drupalgap is setup properly on drupal site
	  	result = drupalgap_services_system_connect();
	  	
	  	if (result.errorThrown) { // something went wrong...
	  		// clear the site path and re-save the settings to start over
	  		settings.site_path = "";
		  	drupalgap_settings_save(settings);
		  	alert(result.errorThrown);
	  	}
	  	else { // session id came back, everything is ok...
	  		alert("Setup Complete!");
	  		$.mobile.changePage("dashboard.html", "slideup");
	  	}
	}
	catch (error) {
		console.log("drupalgap_page_install_connect");
		console.log(error);
	}
	return false;
});

$('#drupalgap_page_install_help').live('click',function(){
	alert("Please visit the DrupalGap project page for help topics.");
	return false;
});