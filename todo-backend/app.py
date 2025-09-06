from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
from models import init_db
from routes.todos import todos_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(todos_bp, url_prefix="/api")

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
