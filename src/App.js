import React, { useContext } from "react";
import { Router } from "./router/Router";
import { PlayList } from "./components/PlayList";
import { AudioPlayer } from "./components/AudioPlayer";
import { TrackContext } from "./providers/TrackProvider";
import "./App.css";

export const App = () => {
  const { tracks, setTracks } = useContext(TrackContext);
  return (
    <>
      <Router />
      <section className="playlist-sec">
    <h2>プレイリスト</h2>
    {tracks.length > 0 ?
    <PlayList 
      tracks={tracks}
      setTracks={setTracks}
    />
    : <p>プレイリストはまだありません。</p>
    }
    </section>
    {tracks.length > 0 &&
      <AudioPlayer
        tracks={tracks}
        
       />
    }
    </>
  );

};
