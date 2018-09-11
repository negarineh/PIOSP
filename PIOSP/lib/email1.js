var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var constants = require('../config/constants');

var transporter = nodemailer.createTransport(smtpTransport({
    host: constants.email_smtp_host,
		port: constants.email_smtp_port,
		secure: true, // use TSL
    auth: {
        user: 'your email',
        pass: 'your email'
    }
}));


exports.activate_email = function(user_name, email, acitvate_link) {
	

	var email_data = 
	`<!DOCTYPE html>
	<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	
	<head>
			<title></title>
			<!--[if !mso]><!-- -->
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<!--<![endif]-->
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style type="text/css">
					#outlook a {
							padding: 0;
					}
					
					.ReadMsgBody {
							width: 100%;
					}
					
					.ExternalClass {
							width: 100%;
					}
					
					.ExternalClass * {
							line-height: 100%;
					}
					
					body {
							margin: 0;
							padding: 0;
							-webkit-text-size-adjust: 100%;
							-ms-text-size-adjust: 100%;
					}
					
					table,
					td {
							border-collapse: collapse;
							mso-table-lspace: 0pt;
							mso-table-rspace: 0pt;
					}
					
					img {
							border: 0;
							height: auto;
							line-height: 100%;
							outline: none;
							text-decoration: none;
							-ms-interpolation-mode: bicubic;
					}
					
					p {
							display: block;
							margin: 13px 0;
					}
			</style>
			<!--[if !mso]><!-->
			<style type="text/css">
					@media only screen and (max-width:480px) {
							@-ms-viewport {
									width: 320px;
							}
							@viewport {
									width: 320px;
							}
					}
			</style>
			<!--<![endif]-->
			<!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->
			<!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
			<!--[if !mso]><!-->
			<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
			<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
			<style type="text/css">
					@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
					@import url(https://fonts.googleapis.com/css?family=Cabin);
			</style>
			<!--<![endif]-->
			<style type="text/css">
					@media only screen and (min-width:480px) {
							.mj-column-per-100 {
									width: 100%!important;
							}
					}
			</style>
	</head>
	
	<body style="background: #FFFFFF;">
			<div class="mj-container" style="background-color:#FFFFFF;">
					<!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
					<table role="presentation" cellpadding="0" cellspacing="0" style="background:url(https://topolio.s3-eu-west-1.amazonaws.com/uploads/593807b1018b1/1496845908.jpg) top center / auto repeat;font-size:0px;width:100%;" border="0" background="https://topolio.s3-eu-west-1.amazonaws.com/uploads/593807b1018b1/1496845908.jpg">
							<tbody>
									<tr>
											<td>
													<div style="margin:0px auto;max-width:600px;">
															<!--[if mso | IE]>      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;">        <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://topolio.s3-eu-west-1.amazonaws.com/uploads/593807b1018b1/1496845908.jpg" />        <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">      <![endif]-->
															<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
																	<tbody>
																			<tr>
																					<td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;">
																							<!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:600px;">      <![endif]-->
																							<div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
																									<table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
																											<tbody>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;">
																																	<div style="font-size:1px;line-height:50px;white-space:nowrap;">&#xA0;</div>
																															</td>
																													</tr>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:0px 12px 0px 12px;" align="center">
																																	<div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:center;">
																																			<h1 style="font-family: &apos;Cabin&apos;, sans-serif; color: #FFFFFF; font-size: 44px; line-height: 100%;">Pollinator Insect Online Survey</h1>
																																			<p></p>
																																	</div>
																															</td>
																													</tr>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center">
																																	<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0">
																																			<tbody>
																																					<tr>
																																							<td style="border:none;border-radius:24px;color:#fff;cursor:auto;padding:10px 25px;" align="center" valign="middle" bgcolor="#e85034"><a href="`+constants.host2+`" style="text-decoration:none;background:#e85034;color:#fff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;line-height:120%;text-transform:none;margin:0px;" target="_blank">Survey Main Page</a></td>
																																					</tr>
																																			</tbody>
																																	</table>
																															</td>
																													</tr>
																											</tbody>
																									</table>
																							</div>
																							<!--[if mso | IE]>      </td></tr></table>      <![endif]-->
																					</td>
																			</tr>
																	</tbody>
															</table>
															<!--[if mso | IE]>        </v:textbox>      </v:rect>      <![endif]-->
													</div>
											</td>
									</tr>
							</tbody>
					</table>
					<!--[if mso | IE]>      </td></tr></table>      <![endif]-->
					<!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
					<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" border="0">
							<tbody>
									<tr>
											<td>
													<div style="margin:0px auto;max-width:600px;">
															<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
																	<tbody>
																			<tr>
																					<td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;">
																							<!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:600px;">      <![endif]-->
																							<div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
																									<table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
																											<tbody>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:12px 20px 12px 20px;" align="left">
																																	<div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:left;">
																																			<p><span style="font-size:16px;"><strong><span style="color:#4e5f70;">Hi `+user_name+`,</span></strong>
																																					</span>
																																			</p>
																																	</div>
																															</td>
																													</tr>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:8px 20px 8px 20px;" align="left">
																																	<div style="cursor:auto;color:#000000;font-family:Cabin, sans-serif;font-size:15px;line-height:22px;text-align:left;">
																																			<h2 style="color: #F05D22; line-height: 100%;">Welcome to Pollinator Insects Online Survey</h2>
																																			<p>Your Account Created Successfully, Please Confirm Your Account</p>
																																	</div>
																															</td>
																													</tr>
																											</tbody>
																									</table>
																							</div>
																							<!--[if mso | IE]>      </td></tr></table>      <![endif]-->
																					</td>
																			</tr>
																	</tbody>
															</table>
													</div>
											</td>
									</tr>
							</tbody>
					</table>
					<!--[if mso | IE]>      </td></tr></table>      <![endif]-->
					<!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
					<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" border="0">
							<tbody>
									<tr>
											<td>
													<div style="margin:0px auto;max-width:600px;">
															<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
																	<tbody>
																			<tr>
																					<td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;">
																							<!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:600px;">      <![endif]-->
																							<div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
																									<table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
																											<tbody>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left">
																																	<div style="cursor:auto;color:#000000;font-family:Cabin, sans-serif;font-size:15px;line-height:22px;text-align:left;">
																																			<h2 style="color: #F05D22; line-height: 100%;">Activation</h2>
																																			<p>Click on the button link below to activate your account.</p>
																																	</div>
																															</td>
																													</tr>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:14px 0px 14px 0px;" align="center">
																																	<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0">
																																			<tbody>
																																					<tr>
																																							<td style="border:none;border-radius:24px;color:#fff;cursor:auto;padding:10px 25px;" align="center" valign="middle" bgcolor="#e85034"><a href="`+constants.host+`/confirm?email=`+email+`&active_link=`+acitvate_link+`" style="text-decoration:none;background:#e85034;color:#fff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;line-height:120%;text-transform:none;margin:0px;" >Verify Your Account</a></td>
																																					</tr>
																																			</tbody>
																																	</table>
																															</td>
																													</tr>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left">
																																	<div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:left;">
																																			<p><span style="font-size:14px;">Thanks for your participation,</span></p>
																																			<p><a data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://localhost:3000&amp;source=gmail&amp;ust=1526089655858000&amp;usg=AFQjCNHOPydcdLRE0uXUsL8nN8oOAnbvig" draggable="false" href="`+constants.host2+`" target="_blank">Pollinator Insects Online Survey Team</a></p>
																																	</div>
																															</td>
																													</tr>
																											</tbody>
																									</table>
																							</div>
																							<!--[if mso | IE]>      </td></tr></table>      <![endif]-->
																					</td>
																			</tr>
																	</tbody>
															</table>
													</div>
											</td>
									</tr>
							</tbody>
					</table>
					<!--[if mso | IE]>      </td></tr></table>      <![endif]-->
					<!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
					<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" border="0">
							<tbody>
									<tr>
											<td>
													<div style="margin:0px auto;max-width:600px;">
															<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
																	<tbody>
																			<tr>
																					<td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;">
																							<!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:600px;">      <![endif]-->
																							<div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
																									<table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
																											<tbody>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:20px;padding-right:22px;padding-left:22px;">
																																	<p style="font-size:1px;margin:0px auto;border-top:1px dashed #ACACAC;width:100%;"></p>
																																	<!--[if mso | IE]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="font-size:1px;margin:0px auto;border-top:1px dashed #ACACAC;width:100%;" width="600"><tr><td style="height:0;line-height:0;"> </td></tr></table><![endif]-->
																															</td>
																													</tr>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:10px 25px;" align="center">
																																	<div>
																																			<!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="undefined"><tr><td>      <![endif]-->
																																			<table role="presentation" cellpadding="0" cellspacing="0" style="float:none;display:inline-table;" align="center" border="0">
																																					<tbody>
																																							<tr>
																																									<td style="padding:4px;vertical-align:middle;">
																																											<table role="presentation" cellpadding="0" cellspacing="0" style="background:none;border-radius:3px;width:35px;" border="0">
																																													<tbody>
																																															<tr>
																																																	<td style="vertical-align:middle;width:35px;height:35px;">
																																																			<a href="https://www.facebook.com/PROFILE"><img alt="facebook" height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/outlined/facebook.png" style="display:block;border-radius:3px;" width="35"></a>
																																																	</td>
																																															</tr>
																																													</tbody>
																																											</table>
																																									</td>
																																									<td style="padding:4px 4px 4px 0;vertical-align:middle;">
																																											<a href="https://www.facebook.com/PROFILE" style="text-decoration:none;text-align:left;display:block;color:#333333;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;border-radius:3px;"></a>
																																									</td>
																																							</tr>
																																					</tbody>
																																			</table>
																																			<!--[if mso | IE]>      </td><td>      <![endif]-->
																																			<table role="presentation" cellpadding="0" cellspacing="0" style="float:none;display:inline-table;" align="center" border="0">
																																					<tbody>
																																							<tr>
																																									<td style="padding:4px;vertical-align:middle;">
																																											<table role="presentation" cellpadding="0" cellspacing="0" style="background:none;border-radius:3px;width:35px;" border="0">
																																													<tbody>
																																															<tr>
																																																	<td style="vertical-align:middle;width:35px;height:35px;">
																																																			<a href="https://www.twitter.com/PROFILE"><img alt="twitter" height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/outlined/twitter.png" style="display:block;border-radius:3px;" width="35"></a>
																																																	</td>
																																															</tr>
																																													</tbody>
																																											</table>
																																									</td>
																																									<td style="padding:4px 4px 4px 0;vertical-align:middle;">
																																											<a href="https://www.twitter.com/PROFILE" style="text-decoration:none;text-align:left;display:block;color:#333333;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;border-radius:3px;"></a>
																																									</td>
																																							</tr>
																																					</tbody>
																																			</table>
																																			<!--[if mso | IE]>      </td><td>      <![endif]-->
																																			<table role="presentation" cellpadding="0" cellspacing="0" style="float:none;display:inline-table;" align="center" border="0">
																																					<tbody>
																																							<tr>
																																									<td style="padding:4px;vertical-align:middle;">
																																											<table role="presentation" cellpadding="0" cellspacing="0" style="background:none;border-radius:3px;width:35px;" border="0">
																																													<tbody>
																																															<tr>
																																																	<td style="vertical-align:middle;width:35px;height:35px;">
																																																			<a href="https://plus.google.com/PROFILE"><img alt="google" height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/outlined/google-plus.png" style="display:block;border-radius:3px;" width="35"></a>
																																																	</td>
																																															</tr>
																																													</tbody>
																																											</table>
																																									</td>
																																									<td style="padding:4px 4px 4px 0;vertical-align:middle;">
																																											<a href="https://plus.google.com/PROFILE" style="text-decoration:none;text-align:left;display:block;color:#333333;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;border-radius:3px;"></a>
																																									</td>
																																							</tr>
																																					</tbody>
																																			</table>
																																			<!--[if mso | IE]>      </td></tr></table>      <![endif]-->
																																	</div>
																															</td>
																													</tr>
																													<tr>
																															<td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:10px;padding-right:22px;padding-left:25px;">
																																	<p style="font-size:1px;margin:0px auto;border-top:1px dashed #ACACAC;width:100%;"></p>
																																	<!--[if mso | IE]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="font-size:1px;margin:0px auto;border-top:1px dashed #ACACAC;width:100%;" width="600"><tr><td style="height:0;line-height:0;"> </td></tr></table><![endif]-->
																															</td>
																													</tr>
																											</tbody>
																									</table>
																							</div>
																							<!--[if mso | IE]>      </td></tr></table>      <![endif]-->
																					</td>
																			</tr>
																	</tbody>
															</table>
													</div>
											</td>
									</tr>
							</tbody>
					</table>
					<!--[if mso | IE]>      </td></tr></table>      <![endif]-->
			</div>
	</body>
	
	</html>`;
	
	/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '"'+constants.smtp_from_name+'" <'+constants.smtp_from_eamil+'>', // sender address
	    to: email, // list of receivers
	    subject: 'Pollinator Insects Online Survey Account Acitvation', // Subject line
	    html: email_data
	};
	

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function (error) {
	    if (error) {
	        return console.log(error);
	    }
	    
	});

  
  
};
