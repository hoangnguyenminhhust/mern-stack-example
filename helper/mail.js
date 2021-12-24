const nodemailer = require("nodemailer");
const {
    mailServerConfig
} = require("../config/index")

async function sendOtp(otp, targetMail) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: mailServerConfig.mailHost,
        port: mailServerConfig.mailPort,
        secure: false,
        auth: {
            user: mailServerConfig.mailUserName,
            pass: mailServerConfig.mailPassword,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: mailServerConfig.mailFullName,
        to: targetMail,
        subject: "Xin đây là tin nhắn tự động thay đổi mật khẩu của bạn",
        text: `Xin đây là tin nhắn tự động thay đổi mật khẩu của bạn`,
        html: `<!DOCTYPE html>
            <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="vi-VN">
            <head>
                <title></title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                <style>
                    * {
                        box-sizing: border-box
                    }
            
                    body {
                        margin: 0;
                        padding: 0
                    }
            
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: inherit !important
                    }
            
                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none
                    }
            
                    p {
                        line-height: inherit
                    }
            
                    @media (max-width:635px) {
                        .icons-inner {
                            text-align: center
                        }
            
                        .icons-inner td {
                            margin: 0 auto
                        }
            
                        .row-content {
                            width: 100% !important
                        }
            
                        .image_block img.big {
                            width: auto !important
                        }
            
                        .stack .column {
                            width: 100%;
                            display: block
                        }
                    }
                </style>
            </head>
            
            <body style="background-color:#f8f8f9;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
                <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="mso-table-lspace:0;mso-table-rspace:0;background-color:#f8f8f9">
                    <tbody>
                        <tr>
                            <td>
                                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                    role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#1aa19c">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                    cellspacing="0" role="presentation"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;color:#000;background-color:#1aa19c;width:615px"
                                                    width="615">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column" width="100%"
                                                                style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                                <table class="divider_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                    <tr>
                                                                        <td>
                                                                            <div align="center">
                                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                                    role="presentation" width="100%"
                                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                                    <tr>
                                                                                        <td class="divider_inner"
                                                                                            style="font-size:1px;line-height:1px;border-top:4px solid #1aa19c">
                                                                                            <span>&#8202;</span></td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                    role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                    cellspacing="0" role="presentation"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:615px"
                                                    width="615">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column" width="100%"
                                                                style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                                <table class="empty_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                    <tr>
                                                                        <td>
                                                                            <div></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                    role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                    cellspacing="0" role="presentation"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#000;width:615px"
                                                    width="615">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column" width="100%"
                                                                style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                                <table class="image_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                    <tr>
                                                                        <td style="width:100%;padding-right:0;padding-left:0">
                                                                            <div align="center" style="line-height:10px">
                                                                                <a href="www.example.com" target="_blank"
                                                                                    style="outline:none" tabindex="-1"><img
                                                                                        class="big"
                                                                                        src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4036/___passwordreset.gif"
                                                                                        style="display:block;height:auto;border:0;width:615px;max-width:100%"
                                                                                        width="615" alt="Image of lock &amp; key."
                                                                                        title="Image of lock &amp; key."></a></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="divider_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                    <tr>
                                                                        <td style="padding-top:30px">
                                                                            <div align="center">
                                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                                    role="presentation" width="100%"
                                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                                    <tr>
                                                                                        <td class="divider_inner"
                                                                                            style="font-size:1px;line-height:1px;border-top:0 solid #bbb">
                                                                                            <span>&#8202;</span></td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                                    <tr>
                                                                        <td
                                                                            style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px">
                                                                            <div style="font-family:Arial,sans-serif">
                                                                                <div
                                                                                    style="font-size:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:14.399999999999999px;color:#555;line-height:1.2">
                                                                                    <p
                                                                                        style="margin:0;font-size:16px;text-align:center">
                                                                                        <span
                                                                                            style="font-size:30px;color:#2b303a;"><strong>OTP
                                                                                                RESET PASSWORD</strong></span></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                                    <tr>
                                                                        <td
                                                                            style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px">
                                                                            <div style="font-family:sans-serif">
                                                                                <div
                                                                                    style="font-size:12px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;mso-line-height-alt:18px;color:#555;line-height:1.5">
                                                                                    <p
                                                                                        style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:22.5px">
                                                                                        <span
                                                                                            style="color:#808389;font-size:15px;">Xin
                                                                                            Chào , Chào mừng đến với công ty vận tải
                                                                                            logistic tự hào là số 1 nền tảng việt
                                                                                            nam</span></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block" width="100%" border="0" cellpadding="20"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                                    <tr>
                                                                        <td>
                                                                            <div style="font-family:sans-serif">
                                                                                <div
                                                                                    style="font-size:12px;mso-line-height-alt:24px;color:#555;line-height:2;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif">
                                                                                    <p
                                                                                        style="margin:0;font-size:12px;text-align:center;letter-spacing:4px">
                                                                                        <strong><span
                                                                                                style="font-size:22px;">${otp}</span></strong>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                    role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                    cellspacing="0" role="presentation"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;color:#000;background-color:#410125;width:615px"
                                                    width="615">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column" width="100%"
                                                                style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                                <table class="social_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                    <tr>
                                                                        <td
                                                                            style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:28px;text-align:center">
                                                                            <table class="social-table" width="208px" border="0"
                                                                                cellpadding="0" cellspacing="0" role="presentation"
                                                                                align="center"
                                                                                style="mso-table-lspace:0;mso-table-rspace:0">
                                                                                <tr>
                                                                                    <td style="padding:0 10px 0 10px"><a
                                                                                            href="https://www.facebook.com/"
                                                                                            target="_blank"><img
                                                                                                src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/facebook@2x.png"
                                                                                                width="32" height="32"
                                                                                                alt="Facebook" title="Facebook"
                                                                                                style="display:block;height:auto;border:0"></a>
                                                                                    </td>
                                                                                    <td style="padding:0 10px 0 10px">
                                                                                        <a href="https://twitter.com/"
                                                                                            target="_blank"><img
                                                                                                src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/twitter@2x.png"
                                                                                                width="32" height="32" alt="Twitter"
                                                                                                title="Twitter"
                                                                                                style="display:block;height:auto;border:0"></a>
                                                                                    </td>
                                                                                    <td style="padding:0 10px 0 10px"><a
                                                                                            href="https://instagram.com/"
                                                                                            target="_blank"><img
                                                                                                src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/instagram@2x.png"
                                                                                                width="32" height="32"
                                                                                                alt="Instagram" title="Instagram"
                                                                                                style="display:block;height:auto;border:0"></a>
                                                                                    </td>
                                                                                    <td style="padding:0 10px 0 10px"><a
                                                                                            href="https://www.linkedin.com/"
                                                                                            target="_blank"><img
                                                                                                src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/linkedin@2x.png"
                                                                                                width="32" height="32"
                                                                                                alt="LinkedIn" title="LinkedIn"
                                                                                                style="display:block;height:auto;border:0"></a>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="divider_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                    <tr>
                                                                        <td
                                                                            style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px">
                                                                            <div align="center">
                                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                                    role="presentation" width="100%"
                                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                                    <tr>
                                                                                        <td class="divider_inner"
                                                                                            style="font-size:1px;line-height:1px;border-top:1px solid #555961">
                                                                                            <span>&#8202;</span></td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                                    <tr>
                                                                        <td
                                                                            style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px">
                                                                            <div style="font-family:sans-serif">
                                                                                <div
                                                                                    style="font-size:12px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;mso-line-height-alt:14.399999999999999px;color:#555;line-height:1.2">
                                                                                    <p
                                                                                        style="margin:0;font-size:14px;text-align:center">
                                                                                        <span
                                                                                            style="color:#95979c;font-size:12px;">Copyright
                                                                                            © 2021</span></p>
                                                                                    <p
                                                                                        style="margin:0;font-size:14px;text-align:center">
                                                                                        <span
                                                                                            style="color:#95979c;font-size:12px;">Want
                                                                                            to stop receiving these emails?</span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                    role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                    cellspacing="0" role="presentation"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:615px"
                                                    width="615">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column" width="100%"
                                                                style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                                <table class="icons_block" width="100%" border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace:0;mso-table-rspace:0">
                                                                    <tr>
                                                                        <td
                                                                            style="color:#9d9d9d;font-family:inherit;font-size:15px;padding-bottom:5px;padding-top:5px;text-align:center">
                                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                                role="presentation"
                                                                                style="mso-table-lspace:0;mso-table-rspace:0">
                                                                                <tr>
                                                                                    <td style="text-align:center">
                                                                                        <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                                                        <!--[if !vml]><!-->
                                                                                        <table class="icons-inner"
                                                                                            style="mso-table-lspace:0;mso-table-rspace:0;display:inline-block;margin-right:-4px;padding-left:0;padding-right:0"
                                                                                            cellpadding="0" cellspacing="0"
                                                                                            role="presentation">
                                                                                            <!--<![endif]-->
                                                                                            <tr>
                                                                                                <td
                                                                                                    style="text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:6px">
                                                                                                    <a
                                                                                                        href="https://www.designedwithbee.com/"><img
                                                                                                            class="icon"
                                                                                                            alt="Designed with BEE"
                                                                                                            src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/53601_510656/Signature/bee.png"
                                                                                                            height="32" width="34"
                                                                                                            align="center"
                                                                                                            style="display:block;height:auto;border:0"></a>
                                                                                                </td>
                                                                                                <td
                                                                                                    style="font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;font-size:15px;color:#9d9d9d;vertical-align:middle;letter-spacing:undefined;text-align:center">
                                                                                                    <a href="https://www.designedwithbee.com/"
                                                                                                        style="color:#9d9d9d;text-decoration:none;">Designed
                                                                                                        with BEE</a></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table><!-- End -->
            </body>
            
            </html>`, // html body
    });
    return info.messageId;
}

module.exports = {
    sendOtp
}