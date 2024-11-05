import React, { useContext, useState, useEffect, createContext } from "react";
import { getDbConnection } from "./database";
import { Text } from "react-native";
import './database'

const DbContext = createContext();

export function useDbContext() {
    return useContext(DbContext);
}

export function DbContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [db, setDb] = useState(null);

    useEffect(() => {
        let _db = null;
        async function getConnection() {
            _db = await getDbConnection();
            await createUserTable(_db);
            await createLockTable(_db);
            await createULOTable(_db);
            setDb(_db);
            setIsLoading(false);
        }
        getConnection();
        return () => {
            if (_db != null) {
                _db.close();
            }
        };
    }, []);

    if (isLoading) {
        return <Text>Cargando...</Text>;
    }

    return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
}