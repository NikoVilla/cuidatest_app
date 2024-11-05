// import { type SQLiteDatabase } from "expo-sqlite"

// export async function initializeDataBase(database: SQLiteDatabase) {
//     await database.execAsync(`
//         CREATE TABLE IF NOT EXISTS Usuario (
//             RUT INTEGER PRIMARY KEY,
//             nombres TEXT,
//             apellidos TEXT,
//             fecha_nacimiento DATE,
//             genero TEXT,
//             celular INTEGER,
//             direccion TEXT,
//             correo TEXT
//         );
//     `) 

//     await database.execAsync(`
//         CREATE TABLE IF NOT EXISTS Lock (
//             id_lock INTEGER PRIMARY KEY AUTOINCREMENT,
//             RUT INTEGER,
//             contraseña TEXT,
//             FOREIGN KEY (RUT) REFERENCES Usuario (RUT)
//         );
//     `);

//     await database.execAsync(`
//         CREATE TABLE IF NOT EXISTS ULO (
//             RUT INTEGER,
//             id_lock INTEGER,
//             UNIQUE (RUT, id_lock),
//             FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
//             FOREIGN KEY (id_lock) REFERENCES Lock (id_lock)
//         );
//     `);
// }