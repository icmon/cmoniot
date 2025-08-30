$(document).ready(function(){
	console.warn('Initialized.. Main.js'); var BASEURL = $('meta[name=url]').attr("content"); // Set-Url

	// Load Form Data
	load_form_details();
	function load_form_details(){
		$.post(BASEURL + 'email/get_settings', null, function(obj) {
			$.each(obj, function(name, val) {
	        	$('[name="' + name + '"]').val(val);
	        })
		});
	}

	// Navbar Dropdown-Menu
	$('.ui.menu .ui.dropdown').dropdown({
		on: 'hover'
	});
	$('.ui.menu a.item')
	.on('click', function() {
		$(this)
		.addClass('active')
		.siblings()
		.removeClass('active')
		;
	});

	$('#email_form')
		.form({
			fields: {
				email_username : ['email', 'empty'],
				email_password : ['minLength[6]', 'empty'],
				email_host : 'empty',
				email_smtp : 'empty',
				email_port : ['number', 'empty']
			},
			onSuccess : function(e){
				var form_data = $(this).serializeArray();
				e.preventDefault();
				$.ajax({
		            url: BASEURL + 'email/settings-update',
		            dataType: 'json',
		            type: "POST",
		            data: form_data,
		            beforeSend: function(){
		                // document.getElementById( 'loader' ).style.display = 'block'; 
		            },
		            success: function(obj) {
		            	if(obj.status == 'success'){
		            		$('.ui.basic.modal').modal('show');
							load_form_details();
		            	}

		            	if(obj.status == 'failed'){
		            		console.log('saving-error');
		            	}
		            	
		            },
		            error: function(jqXHR, textStatus, errorThrown) {
		                console.log(textStatus, errorThrown);
		            },
		            complete: function() {
		                // document.getElementById( 'loader' ).style.display = 'none';
		            }
		        });
			} 
		});

	$('#test-email').on('click',function(){
		$('.fullscreen.modal').modal('show');
	})

	// Form submit
	$('#email_sender').on('submit',function(e){
		e.preventDefault();
		var form_data = $(this).serializeArray();
		$.ajax({
            url: BASEURL + 'email/send',
            dataType: 'json',
            type: "POST",
            data: form_data,
            beforeSend: function(){
                // document.getElementById( 'loader' ).style.display = 'block'; 
            },
            success: function(obj) {
            	if(obj.status == "success"){
            		$('.fullscreen.modal').modal('hide');
            		console.log('Send email success!')
            	}else{
            		console.warn('Send email failed!')
            	}
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            complete: function() {
                // document.getElementById( 'loader' ).style.display = 'none';
            }
        });
	})
})