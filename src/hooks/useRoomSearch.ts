import { useState, useMemo } from "react";

export interface Room {
    name: string;
    wing?: string;
    floor?: string;
    room?: string; // Raumnummer oder Bezeichnung
    normalizedName?: string;
}

// Funktion zur Normalisierung der Suchanfrage
const normalizeQuery = (query: string | undefined): string => {
    return query?.replace(/[_\-\s]/g, "").toLowerCase() || "";
};

// Hook für die erweiterte Suche
export function useRoomSearch(roomList: Room[]): {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    filteredRooms: Room[];
} {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredRooms = useMemo(() => {
        if (!searchQuery) return roomList;

        const normalizedQuery = normalizeQuery(searchQuery);

        return roomList.filter((room) => {
            // Sicherstellen, dass room existiert und einen Namen hat
            if (!room || !room.name) return false;

            const { wing, floor, room: roomName, normalizedName } = room;

            // Direkte Übereinstimmung mit dem gesamten Namen
            if (normalizedName?.includes(normalizedQuery)) return true;

            // Suche nach Flügel (z. B. "C" findet alle Räume in Flügel C)
            if (wing?.toLowerCase().includes(normalizedQuery)) return true;

            // Suche nach Stockwerk (z. B. "3" findet alle Räume im 3. Stock)
            if (floor?.toLowerCase().includes(normalizedQuery)) return true;

            // Suche nach der Raumnummer oder Bezeichnung (z. B. "305" oder "Umkleide")
            if (roomName?.toLowerCase().includes(normalizedQuery)) return true;

            // Falls "C3" gesucht wird, muss es alle Räume in Flügel C, Stockwerk 3 finden
            if (
                normalizedQuery.length === 2 &&
                normalizedQuery[0] === wing?.toLowerCase() &&
                normalizedQuery[1] === floor?.toLowerCase()
            ) {
                return true;
            }

            return false;
        });
    }, [searchQuery, roomList]);

    return {
        searchQuery,
        setSearchQuery,
        filteredRooms,
    };
}
