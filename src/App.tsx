import React, {JSX, useState} from 'react';
import { Searchbar } from "./components/Searchbar";
import { useRoomSearch } from "./hooks/useRoomSearch";
import {MainScene} from "./scenes/MainScene";
import {Room} from "./hooks/useRooms"; // oder aus dem entsprechenden Pfad

export default function App(): JSX.Element {

    // Speichert das Raum-Objekt, nicht nur den Namen
    const [selectedRoom, setSelectedRoom] = useState<Room | null>();
    const [action, setAction] = useState<string>('');
    // Enthält nun komplette Raum-Objekte
    const [roomOptions, setRoomOptions] = useState<Room[]>([]);

    // Nutzt unseren Custom Hook für die Suche
    const { searchQuery, setSearchQuery, filteredRooms } = useRoomSearch(roomOptions);

    // Callback vom Modell (DHBWModel), wenn Räume gefunden wurden
    const handleRoomsExtracted = (rooms: Room[]): void => {
        setRoomOptions(rooms.length > 0 ? rooms : []);
        setSelectedRoom(rooms.length > 0 ? rooms[0] : null); // Direkt erstes Raum-Objekt setzen
    };

    // @ts-ignore
    // @ts-ignore
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
                selectedRoom={selectedRoom?.name ?? ""} // Falls kein Raum ausgewählt, übergebe einen leeren String
                action={action}
                onRoomsExtracted={handleRoomsExtracted}
            />
        </>
    );
}
