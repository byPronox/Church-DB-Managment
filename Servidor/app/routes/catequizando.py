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


@catequizado_bp.route('/api/catequizando/inscribir', methods=['POST'])
def inscribir_catequizando():
    data = request.get_json()
    try:
        id_catequizando = data.get('idCatequizando')
        id_nivel = data.get('idNivel')
        fecha = data.get('fecha')
        estado = data.get('estado')
        certificado_emitido = data.get('certificadoEmitido')

        catequizando = Catequizando({'idPersona': id_catequizando})
        success, error = catequizando.inscribir(id_nivel, fecha, estado, certificado_emitido)
        if success:
            return jsonify({'mensaje': 'Catequizando inscrito con éxito'}), 201
        else:
            return jsonify({'error': error}), 400
    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({'error': str(e)}), 500
