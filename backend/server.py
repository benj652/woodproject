from flask import Flask
from utils import bcrypt
from flask_session import Session
from db import ApplicationConfig, database
from routes import user_bp, prediction_bp

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
database.init_app(app)
server_session = Session(app)
bcrypt.init_app(app)

app.register_blueprint(user_bp, url_prefix='/auth')
app.register_blueprint(prediction_bp, url_prefix='/prediction')

with app.app_context():
    database.create_all()

if __name__ == '__main__':
    app.run(debug=True,host='localhost', port=8000)
