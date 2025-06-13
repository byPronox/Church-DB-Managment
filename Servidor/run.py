from flask import Flask
from flask_cors import CORS
from app.routes.catequizando import catequizado_bp
from app.routes.parroquia import parroquia_bp  # Import the Parroquia blueprint

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir solicitudes desde el cliente React
app.register_blueprint(catequizado_bp)
app.register_blueprint(parroquia_bp)  # Register the Parroquia blueprint

if __name__ == '__main__':
    app.run(debug=True)