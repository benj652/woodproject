from flask import Flask, send_from_directory
from utils import bcrypt
from flask_session import Session
from db import ApplicationConfig, database
from routes import user_bp, prediction_bp
import os

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
database.init_app(app)
server_session = Session(app)
bcrypt.init_app(app)

frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename)

# if running in dev mode, remove /api prefix
app.register_blueprint(user_bp, url_prefix='/api/auth')
app.register_blueprint(prediction_bp, url_prefix='/api/prediction')

with app.app_context():
    database.create_all()

if __name__ == '__main__':
    app.run(debug=True,host='localhost', port=8000)
