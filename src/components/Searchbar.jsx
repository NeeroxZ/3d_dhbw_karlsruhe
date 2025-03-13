import React from 'react';

export function Searchbar({
                              searchQuery,
                              setSearchQuery,
                              filteredRooms,
                              selectedRoom,
                              setSelectedRoom,
                              action,
                              setAction
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

            {/* Suchfeld */}
            <div style={{ marginBottom: '1rem' }}>
                <label>Raum suchen:&nbsp;</label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Raumnamen eingeben..."
                />
            </div>

            {/* Räume-Auswahl */}
            <div style={{ marginBottom: '1rem' }}>
                <label>Raum:&nbsp;</label>
                <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    disabled={filteredRooms.length === 0}
                >
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map((roomName) => (
                            <option key={roomName} value={roomName}>
                                {roomName}
                            </option>
                        ))
                    ) : (
                        <option value="">Kein Raum gefunden</option>
                    )}
                </select>
            </div>

            {/* Aktion-Auswahl */}
            <div>
                <label>Aktion:&nbsp;</label>
                <select value={action} onChange={(e) => setAction(e.target.value)}>
                    <option value="nothing"></option>
                    <option value="blink">Blink</option>
                    <option value="hide">Hide</option>
                    <option value="transparent">Transparent</option>
                </select>
            </div>
        </div>
    );
}
