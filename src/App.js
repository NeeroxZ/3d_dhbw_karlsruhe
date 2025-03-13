import React, { useState } from 'react';
import { MainScene } from "./scenes/MainScene";
import { Searchbar } from "./components/Searchbar";
import { useRoomSearch } from "./hooks/useRoomSearch";

export default function App() {
    const [selectedRoom, setSelectedRoom] = useState(null); // Speichert das Raum-Objekt, nicht nur den Namen
    const [action, setAction] = useState('');
    const [roomOptions, setRoomOptions] = useState([]); // Enthält nun komplette Raum-Objekte

    // Nutzt unseren Custom Hook für die Suche
    const { searchQuery, setSearchQuery, filteredRooms } = useRoomSearch(roomOptions);

    // Callback vom Modell (DHBWModel), wenn Räume gefunden wurden
    const handleRoomsExtracted = (rooms) => {
        setRoomOptions(rooms.length > 0 ? rooms : []);
        setSelectedRoom(rooms.length > 0 ? rooms[0] : null); // Direkt erstes Raum-Objekt setzen
    };

    return (
        <>
            {/* Menü mit Suchfunktion */}
            <Searchbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredRooms={filteredRooms} // Enthält jetzt vollständige Raum-Objekte
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                action={action}
                setAction={setAction}
            />

            {/* 3D-Szene */}
            <MainScene
                selectedRoom={selectedRoom?.name} // Nur den Namen an MainScene übergeben
                action={action}
                onRoomsExtracted={handleRoomsExtracted}
            />
        </>
    );
}
