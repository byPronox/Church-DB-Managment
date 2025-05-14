from app.db import get_connection

class Catequizando:
    def __init__(self, data):
        self.nombres = data.get('nombres')
        self.apellidos = data.get('apellidos')
        self.fecha_nacimiento = data.get('fechaNacimiento')
        self.fe_bautismo = data.get('feBautismo')
        self.estado = data.get('estado')
        self.id_persona = data.get('idPersona')
        self.id_inscripcion = data.get('idInscripcion')

    def registrar(self):
        conn = get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("""
                EXEC sp_RegistrarCatequizando
                    @Nombres = ?,
                    @Apellidos = ?,
                    @FechaNacimiento = ?,
                    @FeBautismo = ?,
                    @Estado = ?,
                    @IdPersona = ?,
                    @IdInscripcion = ?
            """, (self.nombres, self.apellidos, self.fecha_nacimiento, self.fe_bautismo,
                  self.estado, self.id_persona, self.id_inscripcion))
            conn.commit()
            return True, None
        except Exception as e:
            return False, str(e)
        finally:
            cursor.close()
            conn.close()
            
            
            
    def inscribir(self, id_nivel, fecha, estado, certificado_emitido):
        conn = get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("""
                EXEC sp_InscribirCatequizando
                    @IdCatequizando = ?,
                    @IdNivel = ?,
                    @Fecha = ?,
                    @Estado = ?,
                    @CertificadoEmitido = ?
            """, (self.id_persona, id_nivel, fecha, estado, certificado_emitido))
            conn.commit()
            return True, None
        except Exception as e:
            return False, str(e)
        finally:
            cursor.close()
            conn.close()
