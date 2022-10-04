const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL, GOOGLE_REFRESH, GOOGLE_USER} = process.env
const OAuth2 = google.auth.OAuth2;

const sendMail = async(mail, code) => {

    const client = new OAuth2(
        GOOGLE_ID,
        GOOGLE_SECRET,
        GOOGLE_URL
    )

    client.setCredentials({
        refresh_token: GOOGLE_REFRESH
    })

    const accessToken = client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GOOGLE_USER,
            type: 'OAuth2',
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            refreshToken: GOOGLE_REFRESH,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: GOOGLE_USER,
        to: mail,
        subject: 'Verification mail for The Salty Shop',
        html: `
        <div style="border: 1px solid black; background-color: white; width: 100%; height: 100%;">
        <div style="text-align: center;">
            <div style="margin: 20px;">
                <h2 style="color: black;">Hello! You are almost there!</h2>
                <h3>Your email is: ${mail}</h3>
            </div>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <button style="background-color: white; border-radius: 30px; color:black; font-size:15px; padding: 10px; margin: 15px;"><a href='http://localhost:4000/auth/verify/${code}' style="padding-bottom: 10px; color: black; text-decoration: none;">Click to confirm your mail account!</a></button>
            <p>If you received this email by mistake, simply delete it. You won't be confirmed if your don't click the confirmation link above.</p>
        </div>
    </div>
            `
    }

    await transport.sendMail(mailOptions, (error, response) =>{
        if(error){
            console.log(error);
        }else{
            console.log('ok');
        }
    })

}

module.exports = sendMail