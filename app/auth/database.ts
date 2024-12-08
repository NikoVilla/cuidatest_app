// import { enablePromise, openDatabase } from "react-native-sqlite-storage";

// enablePromise(true)

// export const connectToDatabase = async () => {
//     return openDatabase(
//       { name: "cuidatest.db", location: "default" },
//       () => {},
//       (error) => {
//         console.error(error)
//         throw Error("Could not connect to database")
//       }
//     )
//   }

//   export const createTables = async (db: SQLiteDatabase) => {
//     const contactsQuery = `
//         CREATE TABLE IF NOT EXISTS Contacts (
//             RUT INTEGER PRIMARY KEY,
//             nombres TEXT,
//             apellidos TEXT,
//             fecha_nacimiento TEXT,
//             genero TEXT,
//             celular INTEGER,
//             direccion TEXT,
//             correo TEXT
//         )
//     `
//     try {
//       await db.executeSql(contactsQuery)
//     } catch (error) {
//       console.error(error)
//       throw Error(`Failed to create tables`)
//     }
//   }

// // export const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
// //   try {
// //     const tableNames: string[] = []
// //     const results = await db.executeSql(
// //       "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
// //     )
// //     results?.forEach((result) => {
// //       for (let index = 0; index < result.rows.length; index++) {
// //         tableNames.push(result.rows.item(index).name)
// //       }
// //     })
// //     return tableNames
// //   } catch (error) {
// //     console.error(error)
// //     throw Error("Failed to get table names from database")
// //   }
// // }

// export const addContact = async (db: SQLiteDatabase, contact: Contact) => {
//   const insertQuery = `
//    INSERT INTO Contacts (RUT, nombres, apellidos, fecha_nacimiento, genero, celular, direccion, correo)
//    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
   
//  `
//   const values = [
//     contact.RUT,
//     contact.nombres,
//     contact.apellidos,
//     contact.fecha_nacimiento,
//     contact.genero,
//     contact.celular,
//     contact.direccion,
//     contact.correo,
//   ]
//   try {
//     await db.executeSql(insertQuery, values)
//     console.log("Contacto agregado exitosamente.")
//   } catch (error) {
//     if (error.message.includes("UNIQUE constraint failed")) {
//       console.error("Error: El RUT, celular o correo ya existe en la base de datos.")
//       throw Error("Contacto duplicado. Verifica los datos ingresados.")
//     } else {
//       console.error("Error inesperado al agregar el contacto:", error)
//       throw Error("Error al agregar el contacto.")
//     }
// }

// export const getContacts = async (db: SQLiteDatabase): Promise<Contact[]> => {
//   try {
//     const contacts: Contact[] = []
//     const results = await db.executeSql("SELECT * FROM Contacts")
//     results?.forEach((result) => {
//       for (let index = 0; index < result.rows.length; index++) {
//         contacts.push(result.rows.item(index))
//       }
//     })
//     return contacts
//   } catch (error) {
//     console.error(error)
//     throw Error("Failed to get Contacts from database")
//   }
// }

// export const updateContact = async (db: SQLiteDatabase, updatedContact: Contact) => {
//   const updateQuery = `
//     UPDATE Contacts
//     SET 
//       nombres = ?, 
//       apellidos = ?, 
//       fecha_nacimiento = ?, 
//       genero = ?, 
//       celular = ?, 
//       direccion = ?, 
//       correo = ?
//     WHERE RUT = ?
//   `
//   const values = [
//     updatedContact.nombres,
//     updatedContact.apellidos,
//     updatedContact.fecha_nacimiento,
//     updatedContact.genero,
//     updatedContact.celular,
//     updatedContact.direccion,
//     updatedContact.correo,
//     updatedContact.RUT, // Usamos RUT como clave primaria para identificar el registro
//   ]
//   try {
//     return db.executeSql(updateQuery, values)
//   } catch (error) {
//     console.error(error)
//     throw Error("Failed to update contact")
//   }
// }

// export const deleteContact = async (db: SQLiteDatabase, contact: Contact) => {
//   const deleteQuery = `
//     DELETE FROM Contacts
//     WHERE id = ?
//   `
//   const values = [contact.id]
//   try {
//     return db.executeSql(deleteQuery, values)
//   } catch (error) {
//     console.error(error)
//     throw Error("Failed to remove contact")
//   }
// }

// export async function createUserTable(db) {
//     const query = `
//         CREATE TABLE IF NOT EXISTS Usuario (
//             RUT INTEGER PRIMARY KEY,
//             nombres TEXT,
//             apellidos TEXT,
//             fecha_nacimiento DATE,
//             genero TEXT,
//             celular INTEGER,
//             direccion TEXT,
//             correo TEXT UNIQUE
//         );`;
//     return db.executeSql(query);
// }

// export async function createLockTable(db) {
//     const query = `
//         CREATE TABLE IF NOT EXISTS Lock (
//             id_lock INTEGER PRIMARY KEY AUTOINCREMENT,
//             RUT INTEGER,
//             contraseña TEXT,
//             FOREIGN KEY (RUT) REFERENCES Usuario (RUT)
//         );`;
//     return db.executeSql(query);
// }

// export async function createULOTable(db) {
//     const query = `
//         CREATE TABLE IF NOT EXISTS ULO (
//             RUT INTEGER,
//             id_lock INTEGER,
//             UNIQUE (RUT, id_lock),
//             FOREIGN KEY (RUT) REFERENCES Usuario (RUT),
//             FOREIGN KEY (id_lock) REFERENCES Lock (id_lock)
//         );`;
//     return db.executeSql(query);
// }

// export async function initDataBase() {
//     const db = await getDbConnection();
//     await createUserTable(db);
//     await createLockTable(db);
//     await createULOTable(db);
//     db.close();
// }

// export async function insertUser(db, rut, nombres, apellidos, fechaNacimiento, genero, celular, direccion, correo) {
//     const insertQuery = `
//         INSERT INTO Usuario (RUT, nombres, apellidos, fecha_nacimiento, genero, celular, direccion, correo) 
//         VALUES ('${rut}', '${nombres}', '${apellidos}', '${fechaNacimiento}', '${genero}', '${celular}', '${direccion}', '${correo}');
//     `;
//     return db.executeSql(insertQuery);
// }

// export async function insertLock(db, rut, contraseña) {
//     const insertQuery = `
//         INSERT INTO Lock (RUT, contraseña) 
//         VALUES ('${rut}', '${contraseña}');
//     `;
//     return db.executeSql(insertQuery);
// }

// export async function insertULO(db, rut, id_lock) {
//     const insertQuery = `
//         INSERT INTO ULO (RUT, id_lock) 
//         VALUES ('${rut}', '${id_lock}');
//     `;
//     return db.executeSql(insertQuery);
// }

// export async function getAllUsers(db) {
//     const users = [];
//     const results = await db.executeSql('SELECT * FROM Usuario');
    
//     results.forEach(function (resultSet) {
//         for (let index = 0; index < resultSet.rows.length; index++) {
//             users.push(resultSet.rows.item(index));
//         }
//     });

//     return users;
// }

// export async function verifyUserLogin(db, rut, contraseña) {
//     const query = `
//         SELECT Usuario.RUT, Lock.contraseña 
//         FROM Usuario 
//         INNER JOIN ULO ON Usuario.RUT = ULO.RUT 
//         INNER JOIN Lock ON ULO.id_lock = Lock.id_lock 
//         WHERE Usuario.RUT = ? AND Lock.contraseña = ?;
//     `;
    
//     const results = await db.executeSql(query, [rut, contraseña]);
//     return results[0].rows.length > 0;
// }
