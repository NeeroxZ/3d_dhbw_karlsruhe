import React, { useState } from 'react';
import { MainScene } from "./scenes/MainScene";
import { Searchbar } from "./components/Searchbar";
import { useRoomSearch } from "./hooks/useRoomSearch";

export default function App() {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [action, setAction] = useState('');
    const [roomOptions, setRoomOptions] = useState([]);

    // Nutzt unseren Custom Hook
    const { searchQuery, setSearchQuery, filteredRooms } = useRoomSearch(roomOptions);

    // Callback vom Modell (DHBWModel), wenn Räume gefunden wurden
    const handleRoomsExtracted = (rooms) => {
        console.log('🏠 Gefundene Räume:', rooms);
        setRoomOptions(rooms.length > 0 ? rooms : ['Keine Räume gefunden']);
        setSelectedRoom(rooms.length > 0 ? rooms[0] : '');
    };

    return (
        <>
            {/* Menü mit Suchfunktion */}
            <Searchbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredRooms={filteredRooms}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                action={action}
                setAction={setAction}
            />

            {/* 3D-Szene */}
            <MainScene
                selectedRoom={selectedRoom}
                action={action}
                onRoomsExtracted={handleRoomsExtracted}
            />
        </>
    );
}
