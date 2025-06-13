from flask import Blueprint, request, jsonify
from app.models.catequista import Catequista

catequista_bp = Blueprint('catequista', __name__)

@catequista_bp.route('/api/catequista', methods=['GET'])
def get_all_catequistas():
    try:
        catequistas = Catequista.get_all()
        return jsonify(catequistas), 200
    except Exception as e:
        print(f"Error in get_all_catequistas: {str(e)}")
        return jsonify({'error': str(e)}), 500

@catequista_bp.route('/api/catequista/<catequista_id>', methods=['GET'])
def get_catequista_by_id(catequista_id):
    try:
        catequista = Catequista.get_by_id(catequista_id)
        if catequista:
            return jsonify(catequista), 200
        else:
            return jsonify({'error': 'Catequista not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@catequista_bp.route('/api/catequista', methods=['POST'])
def create_catequista():
    data = request.get_json()
    catequista = Catequista(data)
    catequista_id, error = catequista.create()
    if catequista_id:
        return jsonify({'message': 'Catequista created', 'id': catequista_id}), 201
    else:
        return jsonify({'error': error}), 400

@catequista_bp.route('/api/catequista/<catequista_id>', methods=['PUT'])
def update_catequista(catequista_id):
    data = request.get_json()
    catequista = Catequista(data)
    success, error = catequista.update(catequista_id)
    if success:
        return jsonify({'message': 'Catequista updated'}), 200
    else:
        return jsonify({'error': error}), 400

@catequista_bp.route('/api/catequista/<catequista_id>', methods=['DELETE'])
def delete_catequista(catequista_id):
    success, error = Catequista.delete(catequista_id)
    if success:
        return jsonify({'message': 'Catequista deleted'}), 200
    else:
        return jsonify({'error': error}), 400