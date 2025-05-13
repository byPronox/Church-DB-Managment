from flask import Blueprint, request, jsonify
from app.models.catequizando import Catequizando

catequizado_bp = Blueprint('catequizado', __name__)

@catequizado_bp.route('/api/catequizando/registrar', methods=['POST'])
def registrar_catequizando():
    data = request.get_json()
    try:
        catequizando = Catequizando(data)
        success, error = catequizando.registrar()
        if success:
            return jsonify({'mensaje': 'Catequizando registrado con éxito'}), 201
        else:
            return jsonify({'error': error}), 400
    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({'error': str(e)}), 500