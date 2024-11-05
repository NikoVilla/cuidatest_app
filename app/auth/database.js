import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

const DATABASE_NAME = 'cuidatest.db';

export async function getDbConnection() {
    const db = await openDatabase({ name: DATABASE_NAME, location: 'default' });
    return db;
}

export async function createUserTable(db) {
    const query = `
        CREATE TABLE IF NOT EXISTS Usuario (
            RUT INTEGER PRIMARY KEY,
            nombres TEXT,
            apellidos TEXT,
            fecha_nacimiento DATE,
            genero TEXT,
            celular INTEGER,
            direccion TEXT,
            correo TEXT UNIQUE
        );`;
    return db.executeSql(query);
}

export async function createLockTable(db) {
    const query = `
        CREATE TABLE IF NOT EXISTS Lock (
            id_lock INTEGER PRIMARY KEY AUTOINCREMENT,
            RUT INTEGER,
            contraseña TEXT,
            FOREIGN KEY (RUT) REFERENCES Usuario (RUT)
        );`;
    return db.executeSql(query);
}

export async function createULOTable(db) {
    const query = `
        CREATE TABLE IF NOT EXISTS ULO (
            RUT INTEGER,
            id_lock INTEGER,
            UNIQUE (RUT, id_lock),
            FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
            FOREIGN KEY (id_lock) REFERENCES Lock (id_lock)
        );`;
    return db.executeSql(query);
}

export async function initDataBase() {
    const db = await getDbConnection();
    await createUserTable(db);
    await createLockTable(db);
    await createULOTable(db);
    db.close();
}

export async function insertUser(db, rut, nombres, apellidos, fechaNacimiento, genero, celular, direccion, correo) {
    const insertQuery = `
        INSERT INTO Usuario (RUT, nombres, apellidos, fecha_nacimiento, genero, celular, direccion, correo) 
        VALUES ('${rut}', '${nombres}', '${apellidos}', '${fechaNacimiento}', '${genero}', '${celular}', '${direccion}', '${correo}');
    `;
    return db.executeSql(insertQuery);
}

export async function insertLock(db, rut, contraseña) {
    const insertQuery = `
        INSERT INTO Lock (RUT, contraseña) 
        VALUES ('${rut}', '${contraseña}');
    `;
    return db.executeSql(insertQuery);
}

export async function insertULO(db, rut, id_lock) {
    const insertQuery = `
        INSERT INTO ULO (RUT, id_lock) 
        VALUES ('${rut}', '${id_lock}');
    `;
    return db.executeSql(insertQuery);
}

// Obtener todos los datos de los usuarios
export async function getAllUsers(db) {
    const users = [];
    const results = await db.executeSql('SELECT * FROM Usuario');
    
    results.forEach(function (resultSet) {
        for (let index = 0; index < resultSet.rows.length; index++) {
            users.push(resultSet.rows.item(index));
        }
    });

    return users;
}

// Verificar el RUT y contraseña del usuario para el login
export async function verifyUserLogin(db, rut, contraseña) {
    const query = `
        SELECT Usuario.RUT, Lock.contraseña 
        FROM Usuario 
        INNER JOIN ULO ON Usuario.RUT = ULO.RUT 
        INNER JOIN Lock ON ULO.id_lock = Lock.id_lock 
        WHERE Usuario.RUT = ? AND Lock.contraseña = ?;
    `;
    
    const results = await db.executeSql(query, [rut, contraseña]);
    return results[0].rows.length > 0; // Devuelve `true` si el usuario existe y la contraseña coincide
}
