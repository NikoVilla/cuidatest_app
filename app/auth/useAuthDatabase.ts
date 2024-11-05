// import { type SQLiteDatabase } from "expo-sqlite"

// // Definición del tipo de datos para el usuario
// export type User = {
//   RUT: number
//   nombres: string
//   apellidos: string
//   fecha_nacimiento: string
//   genero: string
//   celular: number
//   direccion: string
//   correo: string
//   contraseña: string
// }

// export function useUserDatabase(database: SQLiteDatabase) {

//   // Función para registrar un nuevo usuario en la base de datos
//   async function registerUser(data: Omit<User, "contraseña"> & { contraseña: string }) {
//     const userStatement = await database.prepareAsync(`
//       INSERT INTO Usuario (RUT, nombres, apellidos, fecha_nacimiento, genero, celular, direccion, correo)
//       VALUES ($RUT, $nombres, $apellidos, $fecha_nacimiento, $genero, $celular, $direccion, $correo)
//     `)

//     const lockStatement = await database.prepareAsync(`
//       INSERT INTO Lock (RUT, contraseña) VALUES ($RUT, $contraseña)
//     `)

//     try {
//       // Insertar en la tabla Usuario
//       await userStatement.executeAsync({
//         $RUT: data.RUT,
//         $nombres: data.nombres,
//         $apellidos: data.apellidos,
//         $fecha_nacimiento: data.fecha_nacimiento,
//         $genero: data.genero,
//         $celular: data.celular,
//         $direccion: data.direccion,
//         $correo: data.correo,
//       })

//       // Insertar en la tabla Lock
//       await lockStatement.executeAsync({
//         $RUT: data.RUT,
//         $contraseña: data.contraseña,
//       })

//       return { success: true }
//     } catch (error) {
//       throw error
//     } finally {
//       await userStatement.finalizeAsync()
//       await lockStatement.finalizeAsync()
//     }
//   }

//   // Función para consultar un usuario por RUT
//   async function findUserByRut(RUT: number) {
//     try {
//       // Consulta de datos de usuario en la tabla Usuario
//       const userQuery = "SELECT * FROM Usuario WHERE RUT = ?"
//       const userData = await database.getFirstAsync<User>(userQuery, [RUT])

//       if (!userData) {
//         throw new Error("Usuario no encontrado.")
//       }

//       // Consulta de contraseña en la tabla Lock
//       const lockQuery = "SELECT contraseña FROM Lock WHERE RUT = ?"
//       const lockData = await database.getFirstAsync<{ contraseña: string }>(lockQuery, [RUT])

//       return { ...userData, contraseña: lockData?.contraseña }
//     } catch (error) {
//       throw error
//     }
//   }

//   return { registerUser, findUserByRut }
// }
