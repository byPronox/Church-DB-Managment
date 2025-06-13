from flask import Blueprint, request, jsonify
from app.models.parroquia import Parroquia

parroquia_bp = Blueprint('parroquia', __name__)

@parroquia_bp.route('/api/parroquia', methods=['GET'])
def get_all_parroquias():
    try:
        parroquias = Parroquia.get_all()
        return jsonify(parroquias), 200
    except Exception as e:
        print(f"Error in get_all_parroquias: {str(e)}")
        return jsonify({'error': str(e)}), 500

@parroquia_bp.route('/api/parroquia/<parroquia_id>', methods=['GET'])
def get_parroquia_by_id(parroquia_id):
    try:
        parroquia = Parroquia.get_by_id(parroquia_id)
        if parroquia:
            return jsonify(parroquia), 200
        else:
            return jsonify({'error': 'Parroquia not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@parroquia_bp.route('/api/parroquia', methods=['POST'])
def create_parroquia():
    data = request.get_json()
    parroquia = Parroquia(data)
    parroquia_id, error = parroquia.create()
    if parroquia_id:
        return jsonify({'message': 'Parroquia created', 'id': parroquia_id}), 201
    else:
        return jsonify({'error': error}), 400

@parroquia_bp.route('/api/parroquia/<parroquia_id>', methods=['PUT'])
def update_parroquia(parroquia_id):
    data = request.get_json()
    parroquia = Parroquia(data)
    success, error = parroquia.update(parroquia_id)
    if success:
        return jsonify({'message': 'Parroquia updated'}), 200
    else:
        return jsonify({'error': error}), 400

@parroquia_bp.route('/api/parroquia/<parroquia_id>', methods=['DELETE'])
def delete_parroquia(parroquia_id):
    success, error = Parroquia.delete(parroquia_id)
    if success:
        return jsonify({'message': 'Parroquia deleted'}), 200
    else:
        return jsonify({'error': error}), 400