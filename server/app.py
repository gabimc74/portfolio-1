import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from flask_cors import CORS
import traceback

# ===== CONFIGURAÇÃO DO APP =====
# Caminho absoluto para a pasta "server"
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")

app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    template_folder=TEMPLATE_DIR
)

app = Flask(__name__, static_folder=STATIC_DIR, template_folder=TEMPLATE_DIR)
CORS(app)  # Para testes locais

# ===== CARREGAR VARIÁVEIS DE AMBIENTE =====
ENV_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(ENV_PATH)
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

print("Email:", EMAIL_ADDRESS)
print("Senha carregada:", "OK" if EMAIL_PASSWORD else "NÃO CARREGADA")

# ===== ROTA: HOME =====
@app.route("/")
def home():
    return render_template("index.html")

# ===== ROTA: ENVIAR EMAIL =====
@app.route("/send_email", methods=["POST"])
def send_email():
    try:
        data = request.get_json()
        name = data.get("name", "").strip()
        sender_email = data.get("email", "").strip()
        phone = data.get("phone", "").strip()
        subject = data.get("subject", "").strip()
        message = data.get("message", "").strip()

        if not all([name, sender_email, subject, message]):
            return jsonify({
                "status": "error",
                "message": "❌ Por favor, preencha todos os campos obrigatórios!"
            }), 400

        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = EMAIL_ADDRESS
        msg["Subject"] = f"Novo contato: {subject}"
        msg.attach(MIMEText(f"""
        Nome: {name}
        Email: {sender_email}
        Telefone: {phone}
        Assunto: {subject}

        Mensagem:
        {message}
        """, "plain"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, msg.as_string())

        return jsonify({
            "status": "success",
            "message": "Email enviado com sucesso!"
        }), 200

    except Exception:
        print(traceback.format_exc())
        return jsonify({
            "status": "error",
            "message": "Ocorreu um erro ao enviar. Tente novamente mais tarde."
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
