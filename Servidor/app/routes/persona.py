from flask import Blueprint, request, jsonify
from app.db import get_connection

persona_bp = Blueprint('persona', __name__)

@persona_bp.route('/api/persona', methods=['GET'])
def listar_personas():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("EXEC sp_ConsultarPersonas")
        personas = [
            dict(zip([column[0] for column in cursor.description], row))
            for row in cursor.fetchall()
        ]
        conn.close()
        return jsonify(personas)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@persona_bp.route('/api/persona', methods=['POST'])
def crear_persona():
    data = request.get_json()
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "EXEC sp_InsertarPersona ?, ?, ?, ?",
            data['nombres'], data['apellidos'], data['tipoPersona'], data['contacto']
        )
        conn.commit()
        conn.close()
        return jsonify({'mensaje': 'Persona creada con éxito'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@persona_bp.route('/api/persona/<int:id>', methods=['PUT'])
def actualizar_persona(id):
    data = request.get_json()
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "EXEC sp_ActualizarPersona ?, ?",
            id, data['nuevoContacto']
        )
        conn.commit()
        conn.close()
        return jsonify({'mensaje': 'Persona actualizada con éxito'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@persona_bp.route('/api/persona/<int:id>', methods=['DELETE'])
def eliminar_persona(id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "EXEC sp_EliminarPersona ?",
            id
        )
        conn.commit()
        conn.close()
        return jsonify({'mensaje': 'Persona eliminada con éxito'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500