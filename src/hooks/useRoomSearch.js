import { useState, useMemo } from 'react';

export function useRoomSearch(roomOptions) {
    const [searchQuery, setSearchQuery] = useState('');

    // Optimierte Filterung mit useMemo (verhindert unnötige Neuberechnungen)
    const filteredRooms = useMemo(() => {
        return roomOptions.filter((room) =>
            room.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, roomOptions]);

    return {
        searchQuery,
        setSearchQuery,
        filteredRooms
    };
}
