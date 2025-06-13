from flask import Flask
from flask_cors import CORS
from app.routes.catequizando import catequizado_bp
from app.routes.parroquia import parroquia_bp
from app.routes.catequista import catequista_bp  # Import the Catequista blueprint

app = Flask(__name__)
CORS(app)  # Enable CORS for React client requests
app.register_blueprint(catequizado_bp)
app.register_blueprint(parroquia_bp)
app.register_blueprint(catequista_bp)  # Register the Catequista blueprint

if __name__ == '__main__':
    app.run(debug=True)