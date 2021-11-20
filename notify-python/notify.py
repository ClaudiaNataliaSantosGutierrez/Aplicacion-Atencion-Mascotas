import os

from flask import Flask, request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from twilio.rest import Client

app = Flask(__name__)


@app.route('/')
def inicio():
    test = os.environ.get('Test')
    #test = os.environ.get('TWILIO_ACCOUNT_SID')
    #test = os.environ.get('TWILIO_AUTH_TOKEN')
    return test


@app.route('/sms')
def sms():
    try:
        account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
        client = Client(account_sid, auth_token)
        contenido = request.args.get('mensaje')
        destino = request.args.get('telefono')
        message = client.messages \
                        .create(
                            body=contenido,
                            from_='+13512477666',
                            to='+57'+destino
                        )
        print(message.sid)
        return "SMS enviado"
    except Exception as e:
        return "Error enviando el mensaje"


@app.route('/mail')
def mail():
    destino = request.args.get('email')
    asunto = request.args.get('asunto')
    mensaje = request.args.get('mensaje')

    message = Mail(
        from_email='claudiasantosgutierrez38@gmail.com',
        to_emails=destino,
        subject=asunto,
        html_content=mensaje)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Correo enviado"
    except Exception as e:
        print(e.message)
        return "Error enviando el correo"


if __name__ == '__main__':
    app.run()
