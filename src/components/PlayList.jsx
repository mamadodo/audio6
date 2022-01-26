import React, { useContext } from "react";
import { TrackContext } from "../providers/TrackProvider";
import { useSelector, useDispatch } from "react-redux";

export const PlayList = (props) => {
  const { tracks, setTracks } = props;
  const { trackIndex, setTrackIndex } = useContext(TrackContext);

  const isPlay = useSelector((state) => state.isPlay);
  const dispatch = useDispatch();

  const isPlayFalse = () => {
    dispatch({ type: "IS_PLAY_FALSE"});
  };

  const isPlayTrue = () => {
    dispatch({ type: "IS_PLAY_TRUE"});
  };


  // delete playlist
  const onClickDeleteEpisode = (e) => {
    console.log("e.currentTarget.id", e.currentTarget.id);
    const newtracks = [...tracks];
    newtracks.splice(e.currentTarget.id, 1);
    setTracks(newtracks);
  }
  
  const onClickTrack = (e) => {
    // console.log("trackボタンクリック");
    const newIndex = e.currentTarget.id;

    if (isPlay) {
      if (Number(newIndex) !== Number(trackIndex)) { // 別のトラックをクリック
        // 再生中のトラックを停止
        // console.log("通過：別トラック")
        const changeTrack = async () => {
          await new Promise((resolve) => {
            // setIsPlay(false); //pause
            isPlayFalse();
            setTimeout(() => {
              resolve(1);
            }, 300);
            const prevTrack = tracks[trackIndex];
            prevTrack.playing = false;
            console.log("prevTrack.playing" , prevTrack.playing);
          });
          // クリックしたトラックを再生
          const currentTrack = tracks[newIndex];
          currentTrack.playing = true;
          // console.log(currentTrack);
          console.log('次のトラック: ' + newIndex);
          setTrackIndex(newIndex);
          // setIsPlay(true);
          isPlayTrue();
        }
        changeTrack();
      } else {
        // console.log("通過：同一トラック")

        // 再生中のトラックを停止
        // setIsPlay(false); //pause
        isPlayFalse();
        const prevTrack = tracks[trackIndex];
        prevTrack.playing = false;
      }
    } else {
      setTrackIndex(e.currentTarget.id);
      // setIsPlay(true);
      isPlayTrue();
      const currentTrack = tracks[e.currentTarget.id];
      currentTrack.playing = true;
    }
  };

  return (
    <>
    <ul className="playlists">
    {tracks.map((track, index) => (

      <li className="playlists-item" key={index}>
              <h2 className="content-ttl">
                {track.title}
              </h2>
        <div className="content-inner2 content-info">
          <span className="date">{track.date}</span>
          {/* <span> / </span>
          <span className="time">{musicTime(track.duration)}</span> */}
        </div>
        <div className="content-listItem playBtn" onClick={onClickTrack} id={index}>
          {track.playing === false ? 
              (<span className="material-icons ico-listen">play_circle_outline</span>) :
              (<span>再生中</span>)
          }
        </div>
        {isPlay === true ? 
          <button className="content-listItem playBtn" disabled onClick={onClickDeleteEpisode} id={index}>
            <span className="material-icons ico-listen">delete</span>
            <span className="play-text listen">削除</span>
        </button> :
        <button className="content-listItem playBtn" onClick={onClickDeleteEpisode} id={index}>
            <span className="material-icons ico-listen">delete</span>
            <span className="play-text listen">削除</span>
        </button>
        }
      </li>
      ))}
    </ul>
    </>
  );
}

