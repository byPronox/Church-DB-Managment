-- =============================================
-- SCRIPT 1: CREACION BDD IGLESIA
-- =============================================


-- Crear base de datos
CREATE DATABASE Iglesia;
GO

USE Iglesia;
GO

-- Tabla Parroquia
CREATE TABLE Parroquia (
    id_Parroquia INT IDENTITY(1,1) PRIMARY KEY,
    Direccion VARCHAR(50) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Nombre VARCHAR(30) NOT NULL
);
GO

-- Tabla Nivel_Catequesis
CREATE TABLE Nivel_Catequesis (
    id_NivelCatequesis INT IDENTITY(1,1) PRIMARY KEY,
    Nombre_Nivel VARCHAR(50) NOT NULL,
    Orden VARCHAR(50) NOT NULL,
    Fecha_Inicio DATE NOT NULL,
    Fecha_Fin DATE NOT NULL,
    Parroquia_id_Parroquia INT NOT NULL,
    FOREIGN KEY (Parroquia_id_Parroquia) REFERENCES Parroquia(id_Parroquia)
);
GO

-- Tabla Persona
CREATE TABLE Persona (
    Id_Persona INT IDENTITY(1,1) PRIMARY KEY,
    Nombres VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    Tipo_Persona VARCHAR(50) NOT NULL,
    Contacto VARCHAR(15) NOT NULL
);
GO

-- Tabla Inscripcion
CREATE TABLE Inscripcion (
    id_Inscripcion INT IDENTITY(1,1) PRIMARY KEY,
    Certificado_Emitido VARCHAR(50) NOT NULL,
    Estado VARCHAR(50) NOT NULL,
    Fecha_Inscripcion DATE NOT NULL,
    Nivel_Catequesis_id_NivelCatequesis INT NOT NULL,
    FOREIGN KEY (Nivel_Catequesis_id_NivelCatequesis) REFERENCES Nivel_Catequesis(id_NivelCatequesis)
);
GO

-- Tabla Catequizando
CREATE TABLE Catequizando (
    id_catequizando INT IDENTITY(1,1) PRIMARY KEY,
    Apellidos VARCHAR(50) NOT NULL,
    Fecha_Nacimiento DATE NOT NULL,
    Fe_Bautismo VARCHAR(50) NOT NULL,
    Estado VARCHAR(50) NOT NULL,
    Nombres VARCHAR(50) NOT NULL,
    Persona_Id_Persona INT NOT NULL,
    Inscripcion_id_Inscripcion INT NOT NULL,
    FOREIGN KEY (Persona_Id_Persona) REFERENCES Persona(Id_Persona),
    FOREIGN KEY (Inscripcion_id_Inscripcion) REFERENCES Inscripcion(id_Inscripcion)
);
GO

-- Tabla Sacramento
CREATE TABLE Sacramento (
    id_Sacramento INT IDENTITY(1,1) PRIMARY KEY,
    Tipo_Sacramento VARCHAR(50) NOT NULL,
    Fecha DATE NOT NULL,
    Lugar VARCHAR(50) NOT NULL,
    Catequizando_id_catequizando INT NOT NULL,
    FOREIGN KEY (Catequizando_id_catequizando) REFERENCES Catequizando(id_catequizando)
);
GO

-- Tabla Catequista
CREATE TABLE Catequista (
    id_Catequista INT IDENTITY(1,1) PRIMARY KEY,
    Apellidos VARCHAR(50) NOT NULL,
    Nombres VARCHAR(50) NOT NULL,
    Rol VARCHAR(50) NOT NULL,
    Contacto VARCHAR(15) NOT NULL,
    Nivel_Catequesis_id_NivelCatequesis INT NOT NULL,
    FOREIGN KEY (Nivel_Catequesis_id_NivelCatequesis) REFERENCES Nivel_Catequesis(id_NivelCatequesis)
);
GO

-- Tabla Asistencia
CREATE TABLE Asistencia (
    id_Asistencia INT IDENTITY(1,1) PRIMARY KEY,
    Fecha DATE NOT NULL,
    Presente BIT NOT NULL,
    Inscripcion_id_Inscripcion INT NOT NULL,
    FOREIGN KEY (Inscripcion_id_Inscripcion) REFERENCES Inscripcion(id_Inscripcion)
);
GO

-- Tabla Evaluacion
CREATE TABLE Evaluacion (
    id_Evaluacion INT IDENTITY(1,1) PRIMARY KEY,
    Calificacion FLOAT NOT NULL,
    Observaciones VARCHAR(50)
);
GO

-- Tabla Evaluacionv1 (relación Evaluacion ↔ Inscripcion)
CREATE TABLE Evaluacionv1 (
    Evaluacion_id_Evaluacion INT NOT NULL,
    Inscripcion_id_Inscripcion INT NOT NULL,
    PRIMARY KEY (Evaluacion_id_Evaluacion, Inscripcion_id_Inscripcion),
    FOREIGN KEY (Evaluacion_id_Evaluacion) REFERENCES Evaluacion(id_Evaluacion),
    FOREIGN KEY (Inscripcion_id_Inscripcion) REFERENCES Inscripcion(id_Inscripcion)
);
GO


-- Insertar parroquias
INSERT INTO Parroquia (Direccion, Telefono, Nombre) VALUES
('Calle Central 123', '0991234567', 'San Juan Bautista'),
('Av. Bolívar 456', '0981112233', 'Nuestra Señora de la Paz'),
('Calle Loja 789', '0966677889', 'San Pedro');
GO

-- Insertar niveles de catequesis
INSERT INTO Nivel_Catequesis (Nombre_Nivel, Orden, Fecha_Inicio, Fecha_Fin, Parroquia_id_Parroquia) VALUES
('Primera Comunión', '1', '2024-01-10', '2024-06-30', 1),
('Confirmación', '2', '2024-02-01', '2024-07-15', 2),
('Post-Confirmación', '3', '2024-03-01', '2024-08-15', 3);
GO

-- Insertar personas
INSERT INTO Persona (Nombres, Apellidos, Tipo_Persona, Contacto) VALUES
('Juan', 'Pérez', 'Catequizando', '0987654321'),
('Lucía', 'Gómez', 'Catequizando', '0911223344'),
('Carlos', 'Vera', 'Catequizando', '0977886655');
GO

-- Insertar inscripciones
INSERT INTO Inscripcion (Certificado_Emitido, Estado, Fecha_Inscripcion, Nivel_Catequesis_id_NivelCatequesis) VALUES
('No', 'Activo', '2024-01-05', 1),
('Sí', 'Finalizado', '2023-03-12', 2),
('No', 'Activo', '2024-01-20', 3);
GO

-- Insertar catequizandos
INSERT INTO Catequizando (Apellidos, Fecha_Nacimiento, Fe_Bautismo, Estado, Nombres, Persona_Id_Persona, Inscripcion_id_Inscripcion) VALUES
('Pérez', '2013-05-20', 'Sí', 'Activo', 'Juan', 1, 1),
('Gómez', '2012-09-10', 'Sí', 'Finalizado', 'Lucía', 2, 2),
('Vera', '2014-01-30', 'No', 'Activo', 'Carlos', 3, 3);
GO

-- Insertar sacramentos
INSERT INTO Sacramento (Tipo_Sacramento, Fecha, Lugar, Catequizando_id_catequizando) VALUES
('Bautismo', '2014-06-15', 'Iglesia Central', 1),
('Bautismo', '2013-07-12', 'Nuestra Señora de la Paz', 2),
('Bautismo', '2015-01-10', 'San Pedro', 3);
GO

-- Insertar catequistas
INSERT INTO Catequista (Apellidos, Nombres, Rol, Contacto, Nivel_Catequesis_id_NivelCatequesis) VALUES
('López', 'María', 'Guía', '0976543210', 1),
('Ramírez', 'José', 'Asistente', '0963344556', 2),
('Suárez', 'Elena', 'Titular', '0951122334', 3);
GO

-- Insertar asistencias
INSERT INTO Asistencia (Fecha, Presente, Inscripcion_id_Inscripcion) VALUES
('2024-01-15', 1, 1),
('2024-01-22', 1, 2),
('2024-03-05', 0, 3);
GO

-- Insertar evaluaciones
INSERT INTO Evaluacion (Calificacion, Observaciones) VALUES
(8.5, 'Buen desempeño'),
(6.0, 'Debe mejorar'),
(9.2, 'Excelente participación');
GO

-- Vincular evaluaciones con inscripciones
INSERT INTO Evaluacionv1 (Evaluacion_id_Evaluacion, Inscripcion_id_Inscripcion) VALUES
(1, 1),
(2, 2),
(3, 3);
GO

------------------------------------------------------
-- OPERACIONES CRUD EJEMPLO -------------------------
------------------------------------------------------

-- CREATE (Insertar una nueva persona)
INSERT INTO Persona (Nombres, Apellidos, Tipo_Persona, Contacto)
VALUES ('Ana', 'Martínez', 'Catequizando', '0998877665');
GO

-- READ (Consultar todas las personas)
SELECT * FROM Persona;
GO

-- UPDATE (Modificar el contacto de la persona 'Ana Martínez')
UPDATE Persona
SET Contacto = '0999999999'
WHERE Nombres = 'Ana' AND Apellidos = 'Martínez';
GO

-- DELETE (Eliminar a 'Ana Martínez')
DELETE FROM Persona
WHERE Nombres = 'Ana' AND Apellidos = 'Martínez';
GO

-- =============================================
-- SCRIPT 2: IMPLEMENTACIÓN DE REGLAS DE NEGOCIO
-- =============================================
-- =============================================
-- PROCEDIMIENTO: Registrar Catequizando
-- =============================================
DROP PROCEDURE IF EXISTS sp_RegistrarCatequizando;
GO
CREATE PROCEDURE sp_RegistrarCatequizando
(
    @Nombres         VARCHAR(50),
    @Apellidos       VARCHAR(50),
    @FechaNacimiento DATE,
    @FeBautismo      VARCHAR(50),
    @Estado          VARCHAR(50),
    @IdPersona       INT,
    @IdInscripcion   INT
)
AS
BEGIN
    IF @FeBautismo IS NULL OR LTRIM(RTRIM(@FeBautismo)) = ''
    BEGIN
        RAISERROR('El catequizando debe presentar fe de bautismo.',16,1);
        RETURN;
    END

    -- Verifica que la persona exista
    IF NOT EXISTS (SELECT 1 FROM Persona WHERE Id_Persona = @IdPersona)
    BEGIN
        RAISERROR('No se encontró la persona.', 16, 1);
        RETURN;
    END

    -- Verifica que la inscripción exista
    IF NOT EXISTS (SELECT 1 FROM Inscripcion WHERE id_Inscripcion = @IdInscripcion)
    BEGIN
        RAISERROR('No se encontró la inscripción.', 16, 1);
        RETURN;
    END

    INSERT INTO Catequizando (Apellidos, Fecha_Nacimiento, Fe_Bautismo, Estado, Nombres, Persona_Id_Persona, Inscripcion_id_Inscripcion)
    VALUES (@Apellidos, @FechaNacimiento, @FeBautismo, @Estado, @Nombres, @IdPersona, @IdInscripcion);
END
GO

-- =============================================
-- PROCEDIMIENTO: Inscribir Catequizando
-- =============================================
DROP PROCEDURE IF EXISTS sp_InscribirCatequizando;
GO
CREATE PROCEDURE sp_InscribirCatequizando
(
    @IdCatequizando     INT,
    @IdNivel            INT,
    @Fecha              DATE,
    @Estado             VARCHAR(20),
    @CertificadoEmitido VARCHAR(50)
)
AS
BEGIN
    -- Verifica si ya está inscrito activamente
    IF EXISTS (
        SELECT 1
        FROM Inscripcion i
        JOIN Catequizando c ON c.Inscripcion_id_Inscripcion = i.id_Inscripcion
        WHERE c.id_catequizando = @IdCatequizando
        AND i.Estado = 'Activo'
    )
    BEGIN
        RAISERROR('El catequizando ya está inscrito en un nivel activo.',16,1);
        RETURN;
    END

    -- Verifica que el nivel exista
    IF NOT EXISTS (SELECT 1 FROM Nivel_Catequesis WHERE id_NivelCatequesis = @IdNivel)
    BEGIN
        RAISERROR('Nivel de catequesis no encontrado.', 16, 1);
        RETURN;
    END

    INSERT INTO Inscripcion (Certificado_Emitido, Estado, Fecha_Inscripcion, Nivel_Catequesis_id_NivelCatequesis)
    VALUES (@CertificadoEmitido, @Estado, @Fecha, @IdNivel);

    DECLARE @NewId INT = SCOPE_IDENTITY();

    UPDATE Catequizando
    SET Inscripcion_id_Inscripcion = @NewId
    WHERE id_catequizando = @IdCatequizando;
END
GO

-- =============================================
-- PROCEDIMIENTO: Registrar Asistencia
-- =============================================
DROP PROCEDURE IF EXISTS sp_RegistrarAsistencia;
GO
CREATE PROCEDURE sp_RegistrarAsistencia
(
    @id_Asistencia               INT,
    @Fecha                       DATE,
    @Presente                    BIT,
    @Inscripcion_Id_Inscripcion  INT
)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Inscripcion WHERE id_Inscripcion = @Inscripcion_Id_Inscripcion)
    BEGIN
        RAISERROR('No existe la inscripción %d.',16,1,@Inscripcion_Id_Inscripcion);
        RETURN;
    END

    INSERT INTO Asistencia (id_Asistencia, Fecha, Presente, Inscripcion_id_Inscripcion)
    VALUES (@id_Asistencia, @Fecha, @Presente, @Inscripcion_Id_Inscripcion);
END
GO

-- =============================================
-- PROCEDIMIENTO: Registrar Evaluación
-- =============================================
DROP PROCEDURE IF EXISTS sp_RegistrarEvaluacion;
GO
CREATE PROCEDURE sp_RegistrarEvaluacion
(
    @IdInscripcion INT,
    @Calificacion  FLOAT,
    @Observaciones VARCHAR(50)
)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Inscripcion WHERE id_Inscripcion = @IdInscripcion)
    BEGIN
        RAISERROR('Inscripción no válida.', 16, 1);
        RETURN;
    END

    INSERT INTO Evaluacion (Calificacion, Observaciones)
    VALUES (@Calificacion, @Observaciones);

    DECLARE @IdEval INT = SCOPE_IDENTITY();

    INSERT INTO Evaluacionv1 (Evaluacion_id_Evaluacion, Inscripcion_id_Inscripcion)
    VALUES (@IdEval, @IdInscripcion);
END
GO

-- =============================================
-- PROCEDIMIENTO: Emitir Certificado
-- =============================================
DROP PROCEDURE IF EXISTS sp_EmitirCertificado;
GO
CREATE PROCEDURE sp_EmitirCertificado
(
    @IdInscripcion INT
)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Inscripcion WHERE id_Inscripcion = @IdInscripcion)
    BEGIN
        RAISERROR('Inscripción no encontrada.', 16, 1);
        RETURN;
    END

    UPDATE Inscripcion
    SET Certificado_Emitido = 'Sí'
    WHERE id_Inscripcion = @IdInscripcion;
END
GO

-- =============================================
-- PROCEDIMIENTO: Asignar Sacramento
-- =============================================
DROP PROCEDURE IF EXISTS sp_AsignarSacramento;
GO
CREATE PROCEDURE sp_AsignarSacramento
(
    @TipoSacramento VARCHAR(50),
    @Fecha          DATE,
    @Lugar          VARCHAR(50),
    @IdCatequizando INT
)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Catequizando WHERE id_catequizando = @IdCatequizando)
    BEGIN
        RAISERROR('Catequizando no encontrado.', 16, 1);
        RETURN;
    END

    INSERT INTO Sacramento (Tipo_Sacramento, Fecha, Lugar, Catequizando_id_catequizando)
    VALUES (@TipoSacramento, @Fecha, @Lugar, @IdCatequizando);
END
GO

-- =============================================
-- FUNCIÓN: ¿Está Aprobado?
-- =============================================
DROP FUNCTION IF EXISTS fn_EstaAprobado;
GO
CREATE FUNCTION fn_EstaAprobado(@IdInscripcion INT)
RETURNS BIT
AS
BEGIN
    DECLARE @Pres INT, @Total INT, @Cal FLOAT, @Res BIT;

    SELECT @Pres = COUNT(*) FROM Asistencia WHERE Inscripcion_id_Inscripcion = @IdInscripcion AND Presente = 1;
    SELECT @Total = COUNT(*) FROM Asistencia WHERE Inscripcion_id_Inscripcion = @IdInscripcion;
    SELECT @Cal = e.Calificacion
    FROM Evaluacionv1 ev
    JOIN Evaluacion e ON ev.Evaluacion_id_Evaluacion = e.id_Evaluacion
    WHERE ev.Inscripcion_id_Inscripcion = @IdInscripcion;

    IF @Total > 0 AND (@Pres * 1.0 / @Total) >= 0.8 AND @Cal >= 7
        SET @Res = 1;
    ELSE
        SET @Res = 0;

    RETURN @Res;
END
GO

-- =============================================
-- TRIGGER: Actualizar Estado a Aprobado
-- =============================================
DROP TRIGGER IF EXISTS trg_ActualizarEstadoAprobado;
GO
CREATE TRIGGER trg_ActualizarEstadoAprobado
ON Evaluacion
AFTER INSERT
AS
BEGIN
    DECLARE @IdIns INT;
    SELECT @IdIns = ev.Inscripcion_id_Inscripcion
    FROM Evaluacionv1 ev
    JOIN inserted i ON ev.Evaluacion_id_Evaluacion = i.id_Evaluacion;

    IF dbo.fn_EstaAprobado(@IdIns) = 1
    BEGIN
        UPDATE Inscripcion
        SET Estado = 'Aprobado'
        WHERE id_Inscripcion = @IdIns;
    END
END
GO


-- =============================================
-- OPERACIONES CRUD PERSONA
-- =============================================

-- =============================================
-- SP: Crear Persona
-- =============================================
DROP PROCEDURE IF EXISTS sp_InsertarPersona;
GO
CREATE PROCEDURE sp_InsertarPersona
    @Nombres        VARCHAR(50),
    @Apellidos      VARCHAR(50),
    @Tipo_Persona   VARCHAR(50),
    @Contacto       VARCHAR(15)
AS
BEGIN
    INSERT INTO Persona (Nombres, Apellidos, Tipo_Persona, Contacto)
    VALUES (@Nombres, @Apellidos, @Tipo_Persona, @Contacto);
END
GO

-- =============================================
-- SP: Consultar Personas
-- =============================================
DROP PROCEDURE IF EXISTS sp_ConsultarPersonas;
GO
CREATE PROCEDURE sp_ConsultarPersonas
AS
BEGIN
    SELECT Id_Persona, Nombres, Apellidos, Tipo_Persona, Contacto
    FROM Persona
    ORDER BY Id_Persona;
END
GO

-- =============================================
-- SP: Actualizar Persona
-- =============================================
DROP PROCEDURE IF EXISTS sp_ActualizarPersona;
GO
CREATE PROCEDURE sp_ActualizarPersona
    @Id_Persona     INT,
    @NuevoContacto  VARCHAR(15)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Persona WHERE Id_Persona = @Id_Persona)
    BEGIN
        RAISERROR('La persona con el ID especificado no existe.', 16, 1);
        RETURN;
    END

    UPDATE Persona
    SET Contacto = @NuevoContacto
    WHERE Id_Persona = @Id_Persona;
END
GO

-- =============================================
-- SP: Eliminar Persona
-- =============================================
DROP PROCEDURE IF EXISTS sp_EliminarPersona;
GO
CREATE PROCEDURE sp_EliminarPersona
    @Id_Persona INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Persona WHERE Id_Persona = @Id_Persona)
    BEGIN
        RAISERROR('La persona con el ID especificado no existe.', 16, 1);
        RETURN;
    END

    DELETE FROM Persona
    WHERE Id_Persona = @Id_Persona;
END
GO



-- =============================================
-- Creacion Usuario python connect
-- =============================================


USE master;
GO


CREATE LOGIN [pythonconect] WITH PASSWORD='UDLA',
DEFAULT_DATABASE=Iglesia;
GO


ALTER SERVER ROLE [sysadmin] ADD MEMBER [pythonconect];
GO

--Crear usuario en la base de datos Iglesia

USE Iglesia;
GO

CREATE USER [pythonconect] FOR LOGIN [pythonconect];
GO

ALTER ROLE [db_owner] ADD MEMBER [pythonconect];
GO

--Conceder permiso de conexión al servidor
USE master;
GO

GRANT CONNECT SQL TO [pythonconect];
GO
