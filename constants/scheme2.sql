CREATE DATABASE cuidatest2;

USE cuidatest2;

-- Tabla Usuario
CREATE TABLE Usuario (
    RUT VARCHAR(9) UNIQUE NOT NULL PRIMARY KEY,
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    fecha_nacimiento DATE,
    genero VARCHAR(50),
    celular VARCHAR(12),
    direccion TEXT,
    correo VARCHAR(255)
);

-- Tabla Lock
CREATE TABLE Lock (
    id_lock INTEGER PRIMARY KEY AUTOINCREMENT,
    RUT VARCHAR(9),
    contraseña TEXT,
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT)
);

-- Tabla Dispositivo
CREATE TABLE Dispositivo (
    id_dispositivo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    estado TEXT,
    bateria INTEGER
);

-- Tabla Contacto de Emergencia
CREATE TABLE ContactoEmergencia (
    id_contacto INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_completo TEXT,
    celular VARCHAR(12),
    direccion TEXT,
    relacion TEXT,
    correo VARCHAR(255),
    tipo_alerta TEXT,
    RUT VARCHAR(9),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT)
);

-- Tabla Condición
CREATE TABLE Condicion (
    id_condicion INTEGER PRIMARY KEY AUTOINCREMENT,
    text_cond TEXT,
    RUT VARCHAR(9),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT)
);

-- Tabla Medicamento
CREATE TABLE Medicamento (
    id_medicamento INTEGER PRIMARY KEY AUTOINCREMENT,
    text_med TEXT,
    RUT VARCHAR(9),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT)
);

-- Tabla Alergia
CREATE TABLE Alergia (
    id_alergia INTEGER PRIMARY KEY AUTOINCREMENT,
    text_aler TEXT,
    RUT VARCHAR(9),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT)
);

-- Tabla Frecuencia
CREATE TABLE Frecuencia (
    id_frecuencia INTEGER PRIMARY KEY AUTOINCREMENT,
    dato STRING,
    fecha DATE,
    rango TEXT,
    estado TEXT
);

-- Tabla Saturación (Spo2)
CREATE TABLE Saturacion (
    id_spo2 INTEGER PRIMARY KEY AUTOINCREMENT,
    dato STRING,
    fecha DATE,
    rango TEXT,
    estado TEXT
);

-- Tabla Temperatura
CREATE TABLE Temperatura (
    id_temp INTEGER PRIMARY KEY AUTOINCREMENT,
    dato STRING,
    fecha DATE,
    rango TEXT,
    estado TEXT
);

-- Tabla Giroscopio
CREATE TABLE Giroscopio (
    id_giro INTEGER PRIMARY KEY AUTOINCREMENT,
    dato STRING,
    fecha DATE,
    rango TEXT,
    estado TEXT
);

-- Tabla intermedia SignoVital
CREATE TABLE SignoVital (
    RUT VARCHAR(9),
    id_frecuencia INTEGER,
    id_spo2 INTEGER,
    id_temp INTEGER,
    id_giro INTEGER,
    PRIMARY KEY (RUT, id_frecuencia, id_spo2, id_temp, id_giro),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
    FOREIGN KEY (id_frecuencia) REFERENCES Frecuencia (id_frecuencia),
    FOREIGN KEY (id_spo2) REFERENCES Saturacion (id_spo2),
    FOREIGN KEY (id_temp) REFERENCES Temperatura (id_temp),
    FOREIGN KEY (id_giro) REFERENCES Giroscopio (id_giro)
);

-- Tabla intermedia Usuario-Dispositivo
CREATE TABLE UDI (
    RUT VARCHAR(9),
    id_dispositivo INTEGER,
    UNIQUE (RUT, id_dispositivo),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
    FOREIGN KEY (id_dispositivo) REFERENCES Dispositivo (id_dispositivo)
);

-- Tabla intermedia Usuario-Lock 
CREATE TABLE ULO (
    RUT VARCHAR(9),
    id_lock INTEGER,
    UNIQUE (RUT, id_lock),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
    FOREIGN KEY (id_lock) REFERENCES Lock (id_lock)
);

-- Tabla intermedia Usuario-ContactoEmergencia
CREATE TABLE UEM (
    RUT VARCHAR(9),
    id_contacto INTEGER,
    UNIQUE (RUT, id_contacto),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
    FOREIGN KEY (id_contacto) REFERENCES ContactoEmergencia (id_contacto)
);

-- Crear tabla intermedia Usuario-Condicion 
CREATE TABLE UCO (
    RUT VARCHAR(9),
    id_condicion INTEGER,
    UNIQUE (RUT, id_condicion),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
    FOREIGN KEY (id_condicion) REFERENCES Condicion (id_condicion)
);

-- Crear tabla intermedia Usuario-Medicamento 
CREATE TABLE UME (
    RUT VARCHAR(9),
    id_medicamento INTEGER,
    UNIQUE (RUT, id_medicamento),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
    FOREIGN KEY (id_medicamento) REFERENCES Medicamento (id_medicamento)
);

-- Crear tabla intermedia Usuario-Alergia
CREATE TABLE UAL (
    RUT VARCHAR(9),
    id_alergia INTEGER,
    UNIQUE (RUT, id_alergia),
    FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
    FOREIGN KEY (id_alergia) REFERENCES Alergia (id_alergia)
);
