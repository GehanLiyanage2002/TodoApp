from flask import Flask
from flask_cors import CORS
from models import init_db
from routes.todos import todos_bp

app = Flask(__name__)
CORS(app)

# Register blueprint with /api prefix
app.register_blueprint(todos_bp, url_prefix="/api")

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000)
