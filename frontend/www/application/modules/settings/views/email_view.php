<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="Free Web tutorials">
        <meta name="url" content="<?php echo base_url();?>">
        <meta name="keywords" content="HTML,CSS,JSON,JavaScript">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>CI - Email Settings</title>
        <link rel="author" href="Dhenmark Arquiza">
        <link rel="shortcut icon" type="image/jpg" href="">
        <link rel="icon" type="image/jpg" href="">
        <!-- Semantic css -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">
        <!-- Custom Style -->
        <link rel="stylesheet" href="assets/css/style.css">
        <!-- Google Font -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
        
    </head>
    <body>
    	<div class="ui container">
	    	<div class="ui divider"></div>
		    <form class="ui form" id="email_form">
		    	<h4 class="ui dividing header">Email Settings</h4>
		    	<div class="field">
		    		<label>Account</label>
		    		<div class="two fields">
		    			<div class="field">
		    				<input type="text" name="email_username" placeholder="Username">
		    			</div>
		    			<div class="field">
		    				<input type="text" name="email_password" placeholder="Password">
		    			</div>
		    			<div class="field">
		    				<input type="text" name="email_host" placeholder="Host">
		    			</div>
		    		</div>
		    	</div>
		    	<div class="two fields">
		    		<div class="field">
		    			<label>SMTP</label>
		    			<select class="ui fluid dropdown" name="email_smtp">
		    				<option value="">Select Smtp..</option>
		    				<option value="ssl">SSL</option>
		    				<option value="tls">TLS</option>
		    			</select>
		    		</div>
		    		<div class="field">
		    			<label>Port</label>
		    			<select class="ui fluid dropdown" name="email_port">
		    				<option value="">Select port..</option>
		    				<option value="993">993</option>
		    				<option value="465">465</option>
		    				<option value="587">587</option>
		    			</select>
		    		</div>
		    	</div>
		    	<button type="submit" class="ui button">Update</button>
		    	<div class="ui button" id="test-email" tabindex="0">Test Email</div>
		    	<div class="ui error message"></div>
		    </form>
		</div>
		
		<!-- modal form sucess -->
		<div class="ui basic modal">
			<div class="ui icon header">
				<i class="archive icon"></i>
				The Email Settings was updated successfully.
			</div>
			<div class="actions">
				<div class="ui green ok inverted button">
					<i class="checkmark icon"></i>
					Okay
				</div>
			</div>
		</div>

		<!-- email modal sender -->
		<div class="ui fullscreen modal">
			<i class="close icon"></i>
			<div class="header">
				Let's try!
			</div>
			<div class="content">
				<form class="ui form" id="email_sender">
					<h4 class="ui dividing header">Email Details</h4>
					<div class="field">
						<label>Email</label>
						<input type="text" name="mail_address" placeholder="Enter a test Email..">
					</div>
					<div class="field">
						<label>Message</label>
						<textarea placeholder="Enter a sort message here.." name="mail_message"></textarea>
					</div>
			</div>
			<div class="actions">
				<button type="submit" class="ui green button">Send</button>
			</div>
			</form>
		</div>

        
        <!-- JavaScript -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <!-- Semantic js -->
        <script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>
        <!-- Custom js -->
        <script src="assets/js/main.js"></script>
    </body>
</html>