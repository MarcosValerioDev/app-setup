const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(email,username, hash){
    const msg = {
        to: `${email}`,
        from: 'rafaelduaibesapp@gmail.com', // Use the email address or domain you verified above
        subject: 'RECUPERAÇÃO DE SENHA SETUP',
        text: 'Clique no link para recuperar sua senha.',
        html: `<div style="display:flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; background-color:  #B7B7AA; width: 100%; height: 100vh; margin:0px; padding:0px"><span class="b" style="display: block; padding: 6px;  font-family: sans-serif;"><br><br>Clique no botão abaixo para, recuperar criar uma nova senha.</span><br> <a href="https://www.appsetup.netlify.app/recoversenha?email=${email}&name=${username}&hash=${hash}" style="border-radius: 6px 10px; border:none; outline: none; cursor: pointer; display: block; padding: 6px 10px; text-decoration: none;  background-color: rgb(7, 78, 172); color:rgb(216, 221, 226); display: inline-block; font-family: sans-serif;"> RECUEPRAR SENHA </a></div>`,
      };

    sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    });
}

module.exports = {sendEmail}