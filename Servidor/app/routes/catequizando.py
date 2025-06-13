from flask import Blueprint, request, jsonify
from app.models.catequizando import Catequizando

catequizado_bp = Blueprint('catequizado', __name__)


@catequizado_bp.route('/api/catequizando', methods=['GET'])
def get_all_catequizandos():
    try:
        catequizandos = Catequizando.get_all()
        return jsonify(catequizandos), 200
    except Exception as e:
        print(f"Error in get_all_catequizandos: {str(e)}")  # Log the error
        return jsonify({'error': str(e)}), 500

@catequizado_bp.route('/api/catequizando/<catequizando_id>', methods=['GET'])
def get_catequizando_by_id(catequizando_id):
    try:
        catequizando = Catequizando.get_by_id(catequizando_id)
        if catequizando:
            return jsonify(catequizando), 200
        else:
            return jsonify({'error': 'Catequizando not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@catequizado_bp.route('/api/catequizando', methods=['POST'])
def create_catequizando():
    data = request.get_json()
    catequizando = Catequizando(data)
    catequizando_id, error = catequizando.create()
    if catequizando_id:
        return jsonify({'message': 'Catequizando created', 'id': catequizando_id}), 201
    else:
        return jsonify({'error': error}), 400

@catequizado_bp.route('/api/catequizando/<catequizando_id>', methods=['PUT'])
def update_catequizando(catequizando_id):
    data = request.get_json()
    catequizando = Catequizando(data)
    success, error = catequizando.update(catequizando_id)
    if success:
        return jsonify({'message': 'Catequizando updated'}), 200
    else:
        return jsonify({'error': error}), 400

@catequizado_bp.route('/api/catequizando/<catequizando_id>', methods=['DELETE'])
def delete_catequizando(catequizando_id):
    success, error = Catequizando.delete(catequizando_id)
    if success:
        return jsonify({'message': 'Catequizando deleted'}), 200
    else:
        return jsonify({'error': error}), 400