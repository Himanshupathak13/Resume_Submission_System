const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '226392284994-hqhmsll18k0u60d3bbq90uhpgc09qv6d.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04X0QgpntdEN3CgYIARAAGAQSNwF-L9IrZ65zfs-TtTxiSYsdEx01HiuCqoHhtkXjdNtp0FkMiRSZ22oekmQbQGVR62UykcUVdQg'


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

async function sendMail(email,token) {
    

    try {
      const accessToken = await oAuth2Client.getAccessToken()
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'himanshu13pathak@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken
        }
      })
   
      console.log(email);
      console.log(token);
      const mailOptions = {
        from: 'HP 📧 <himanshu13pathak@gmail.com>',
        to: email,
        subject: 'Hello from gmail using API',
        text: 'Hello from Himanshu Pathak',
        html:`
        <p>You requested for password reset</p>
        <h5>click in this <a href="http://localhost:3001/Reset-password/${email}/${token}">Link</a>`
      };

   

      const result = await transport.sendMail(mailOptions)
      return result


        
    } catch (error) {
        return error
    }
}

module.exports={sendMail};