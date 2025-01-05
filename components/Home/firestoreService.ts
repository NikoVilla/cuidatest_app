import appFirebase from "./../../app/auth/credentials.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

const FirestoreService = {
  /**
   * Guarda signos vitales en la subcolección `signosvital` de un usuario autenticado.
   * @param {Object} data - Datos de los signos vitales a guardar.
   * @param {string | number} data.heartRate - Frecuencia cardíaca.
   * @param {string | number} data.temperature - Temperatura corporal.
   * @param {string | number} data.angularVelocity - Velocidad angular.
   * @param {Object} data.geolocalizacion - Geolocalización.
   * @param {Date} [data.timestamp=new Date()] - Marca de tiempo de los datos.
   * @returns {Promise<void>} Promesa que se resuelve cuando los datos se guardan exitosamente.
   */
  async saveVitalSigns(data: {
    heartRate: string | number;
    temperature: string | number;
    angularVelocity: string | number;
    geolocalizacion: { latitude: number; longitude: number };
    timestamp?: Date;
  }): Promise<void> {
    try {
      // Obtener el usuario autenticado
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error("El usuario no está autenticado o no tiene un correo electrónico válido.");
      }

      const timestamp = data.timestamp instanceof Date ? data.timestamp : new Date();
      const formattedTimestamp = timestamp.toISOString();

      const userRef = doc(db, "Usuarios", user.email);
      const vitalSignsRef = doc(userRef, "signosVital", formattedTimestamp);

      // Guardar datos en Firestore
      await setDoc(vitalSignsRef, {
        heartRate: data.heartRate,
        temperature: data.temperature,
        angularVelocity: data.angularVelocity,
        geolocalizacion: data.geolocalizacion,
        timestamp: timestamp.toISOString(),
      });

      console.log("Signos vitales guardados correctamente:", {
        ...data,
        timestamp: timestamp.toISOString(),
      });
    } catch (error) {
      console.error("Error al guardar signos vitales:", error.message || error);
      throw error;
    }
  },
};

export default FirestoreService;