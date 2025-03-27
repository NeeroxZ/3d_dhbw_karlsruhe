import React from "react";

export function Searchbar({
                              searchQuery,
                              setSearchQuery,
                              filteredRooms,
                              selectedRoom,
                              setSelectedRoom,
                              action,
                              setAction,
                          }: any) {
    return (
        <div className="searchbar-container">
            <h3 className="searchbar-title">Eigenes Menü</h3>

            {/* Suchfeld */}
            <div className="searchbar-group">
                <label className="searchbar-label">Raum suchen:</label>
                <input
                    className="searchbar-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Raumnamen eingeben..."
                />
            </div>

            {/* Räume-Auswahl */}
            <div className="searchbar-group">
                <label className="searchbar-label">Raum:</label>
                <select
                    className="searchbar-select"
                    value={selectedRoom?.name || ""}
                    onChange={(e) => {
                        const selected = filteredRooms.find(
                            (r: any) => r.name === e.target.value
                        );
                        setSelectedRoom(selected || null);
                    }}
                    disabled={filteredRooms.length === 0}
                >
                    {filteredRooms.length > 0 ? (
                        filteredRooms
                            .filter(
                                (room: any) =>
                                    !room.name
                                        .toLowerCase()
                                        .includes("würfel")
                            )
                            .map((room: any) => (
                                <option key={room.id} value={room.name}>
                                    {room.fluegel} {room.raum}
                                </option>
                            ))
                    ) : (
                        <option value="">Kein Raum gefunden</option>
                    )}
                </select>
            </div>

            {/* Aktion-Auswahl */}
            <div className="searchbar-group">
                <label className="searchbar-label">Aktion:</label>
                <select
                    className="searchbar-select"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                >
                    <option value="nothing"></option>
                    <option value="blink">Blink</option>
                    <option value="hide">Hide</option>
                    <option value="transparent">Transparent</option>
                </select>
            </div>
        </div>
    );
}