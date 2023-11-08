'use client';

import { createContext, useContext, useState } from "react";

export const TrackContext = createContext<ITrackContext | null>(null)

export const TrackContextProvider = ({ children }: { children: React.ReactNode }) => {

    const initValue = {
        _id: "653780cdee9a5c8798c20046",
        title: "Sau Cơn Mưa",
        description: "Elvis Presley",
        category: "CHILL",
        imgUrl: "chill1.png",
        trackUrl: "CHILL.mp3",
        countLike: 13,
        countPlay: 997,
        uploader: {
            _id: "653780cdee9a5c8798c2003b",
            email: "admin@gmail.com",
            name: "I'm admin",
            role: "ADMIN",
            type: "SYSTEM"
        },
        isDeleted: false,
        createdAt: "2023-10-24T08:31:09.799Z",
        updatedAt: "2023-10-24T08:31:09.799Z",
        isPlaying: false,
    }
    const [currentTrack, setCurrentTrack] = useState<IShareTrack>(initValue);

    return (
        <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </TrackContext.Provider>
    )
};

export const useTrackContext = (): ITrackContext | null => useContext(TrackContext);