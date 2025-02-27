// src/App.jsx
import React, { useState } from 'react';
import {MainScene} from "./scenes/MainScene";
import {Searchbar} from "./components/Searchbar";


export default function App() {
  const [selectedRoom, setSelectedRoom] = useState('Lade Räume...');
  const [action, setAction] = useState('blink');
  const [roomOptions, setRoomOptions] = useState(['Lade Räume...']);

  // Callback vom Modell (DHBWModel), wenn Räume gefunden wurden
  const handleRoomsExtracted = (rooms) => {
    console.log('🏠 Gefundene Räume:', rooms);
    if (rooms.length > 0) {
      setRoomOptions(rooms);
      setSelectedRoom(rooms[0]);
    } else {
      setRoomOptions(['Keine Räume gefunden']);
      setSelectedRoom('Keine Räume gefunden');
    }
  };

  return (
      <>
        {/* Menü */}
        <Searchbar
            roomOptions={roomOptions}
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
