import React, {useContext, useEffect, useState} from "react";
import { db } from "../firebase-config";
import { onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";

const FirebaseContext = React.createContext()

export function useDB() {
    return useContext(FirebaseContext)
}

export function DBProvider({ children }) {
    const [events, setEvents] = useState([]);

    function removeEventByID(id) {
        remove(ref(db, `/${id}`))
    }

    useEffect(() => {
        requestEvents()
    }, [])

    function requestEvents() {
        onValue(ref(db), snapshot => {
            const data = snapshot.val()
            // sort data if are some
            if(data !== []){
                setEvents(Object.values(data))
            } else {
                setEvents([])
            }
        })
    }
    function updateDatabaseNode(id, name, date, place, timeSince, timeTo) {
        const formData = {
            id,
            name,
            place,
            date: date.split("-").reverse().join("."),
            time: updateTime(timeSince, timeTo)
        }
        try {
            update(ref(db, `/${id}`), formData)
        } catch(err) {
            console.log(err)
        }
    }

    function writeToDatabase(name, place, date, timeSince, timeTo) {
        const uuid = uid()
        var betterDate = date.split("-").reverse().join(".");
        
        const formData = {
            id: uuid,
            name: name,
            place: place,
            date: betterDate,
            time: updateTime(timeSince, timeTo)
        }
        try {
            set(ref(db, `/${uuid}`), formData)
        } catch(err) {
            console.log(err)
        }
        
    }
    
    // checking if data have multiple time values
    const updateTime = (timeSince, timeTo) => {
        var time
        if (timeSince === "" && timeTo === "") {
            time = "Neznámý"
        } else if (timeSince !== "" && timeTo !== "" ) {
            time = timeSince + " - " + timeTo;
        } else {
            time = timeSince
        }
        return time
    }

    const value = {
        requestEvents,
        removeEventByID,
        writeToDatabase,
        updateDatabaseNode,
        events
    }

    return(
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}
