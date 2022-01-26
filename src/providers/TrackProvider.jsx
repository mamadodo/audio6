import React, { createContext, useState, useRef } from "react";

export const TrackContext = createContext({});

export const TrackProvider = (props) => {
  const { children } = props;

  const intervalRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  // const [isPlay, setIsPlay] = useState(false); // playing state


  return (
    <TrackContext.Provider
      value={{ 
        intervalRef,
        trackIndex, 
        setTrackIndex,
        tracks,
        setTracks,
        // isPlay,
        // setIsPlay,
       }}>
      {children}
    </TrackContext.Provider>
  );
};
