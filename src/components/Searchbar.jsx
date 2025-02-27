import React from 'react';

export function Searchbar({
                               roomOptions,
                               selectedRoom,
                               setSelectedRoom,
                               action,
                               setAction,
                           }) {
    return (
        <div
            style={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: '#f8f8f8',
                padding: 10,
                zIndex: 9999,
                border: '1px solid #ccc',
            }}
        >
            <h3>Eigenes Menü</h3>

            {/* Räume-Auswahl */}
            <div style={{ marginBottom: '1rem' }}>
                <label>Raum:&nbsp;</label>
                <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                    {roomOptions.map((roomName) => (
                        <option key={roomName} value={roomName}>
                            {roomName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Aktion-Auswahl */}
            <div>
                <label>Aktion:&nbsp;</label>
                <select value={action} onChange={(e) => setAction(e.target.value)}>
                    <option value="blink">Blink</option>
                    <option value="hide">Hide</option>
                </select>
            </div>
        </div>
    );
}
