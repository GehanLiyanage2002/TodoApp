from flask import Flask
from flask_cors import CORS
from models import init_db
from routes.todos import todos_bp

app = Flask(__name__)
CORS(app)  # allow requests from frontend
app.register_blueprint(todos_bp, url_prefix="/api")

if __name__ == "__main__":
    init_db()  # initialize database
    app.run(debug=True)
