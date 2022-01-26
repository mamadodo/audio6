import React, { useEffect, useRef, useState, useContext  } from "react";
import { TrackContext } from "../providers/TrackProvider";
import { useSelector, useDispatch } from "react-redux";

export const AudioPlayer = () => {
  // const { tracks } = props;
  const { tracks } = useContext(TrackContext);

  const { intervalRef, trackIndex, setTrackIndex } = useContext(TrackContext);
  const isPlay = useSelector((state) => state.isPlay);
  console.log('isPlay', isPlay);

  const dispatch = useDispatch();

  const isPlayFalse = () => {
    dispatch({ type: "IS_PLAY_FALSE"});
  };

  const isPlayTrue = () => {
    dispatch({ type: "IS_PLAY_TRUE"});
  };

  useEffect(() => {
    setTrackIndex(0);
  }, []);

  const { title, date, duration, thumbnail, epiNum } = tracks[trackIndex];
  
  const trackSrc = tracks[trackIndex].src;

  const musicRef = useRef(new Audio(trackSrc));

  const musicCurrentTime = musicRef.current.currentTime;
  const musicRate = (Math.floor(musicCurrentTime / tracks[trackIndex].duration * 100));
 
  const [timePosition, setTimePosition] = useState(0); // time position

  const speed = [1.0, 1.3, 1.5, 2.0, 0.5, 0.7];
  const [speedIndex, setSpeedIndex] = useState(0);
  const [speedNextIndex, setSpeedNextIndex] = useState(1);
  
  const musicTime = (time) => {
    let hour = (Math.floor(time / 60 / 60)).toString().padStart( 2, '0');
    let minutes = (Math.floor((time / 60) % 60)).toString().padStart( 2, '0');
    let sec = (Math.floor(time % 60)).toString().padStart( 2, '0');
    let convertTime;
    convertTime = hour + ':' + minutes + ':' + sec;
    return convertTime;
  }

  const start = () => {
    if (intervalRef.current !== null) {
      return;
    }
    
    intervalRef.current = setInterval(() => {
      if (musicRef.current.ended) {
        console.log('nextTrack実行 ');
        nextTrack();
      } else {
      setTimePosition(musicRef.current.currentTime);
      // console.log(' 再生トラック/経過時間 ');
      // console.log('trackIndex ' + trackIndex + ' / ' + musicRef.current.currentTime);
      }
    }, [1000]);
  };


  useEffect(() => {
    musicRef.current = new Audio(trackSrc);
  }, [trackSrc]);

  useEffect(() => {
    if(isPlay) {
      musicRef.current.play();
      start();
      console.log('track' + trackIndex + ' start ');
    } else {
      musicRef.current.pause();
      console.log('track' + trackIndex + ' pause ');
      if (intervalRef.current === null) {
        return;
      }
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isPlay]);

  const timeBar = useRef(null);
  let timeBarWidth;
  let timeBarX;

  // play button
  const onClickTogglePlay = () => {
    if (isPlay) {
      // setIsPlay(!isPlay);
      isPlayFalse();
      const playingTrack = tracks[trackIndex];
      playingTrack.playing = false;
      // console.log('isPlay change ' + isPlay);
    } else {
      // setIsPlay(!isPlay);
      isPlayTrue();
      const playingTrack = tracks[trackIndex];
      playingTrack.playing = true;

      console.log('!isPlay change ' + isPlay);
    }
  }

  // prev 15s
  const onClickBack = () => {
    console.log("15s playback");
    musicRef.current.currentTime -= 15;
  }
  
  // next 30s
  const onClickSkip = () => {
    console.log("30s playskip");
    musicRef.current.currentTime += 30;
  }


  // timebar click
  const onClickTime = (e) => {
    timeBarWidth = e.target.getBoundingClientRect().width;
    timeBarX = e.nativeEvent.offsetX;
    console.log('timeBarクリック: ' + timeBarX / timeBarWidth * tracks[trackIndex].duration + '');
    // console.log(e.target.getBoundingClientRect().width);
    // console.log(e.nativeEvent.offsetX);
    musicRef.current.currentTime = (timeBarX / timeBarWidth * tracks[trackIndex].duration);
  }

  // speed change
  const onClickChangeSpeed = () => {
    if (speedIndex === speed.length - 1) {
      setSpeedIndex(0);
      setSpeedNextIndex(speedNextIndex + 1);
    } else {
      setSpeedIndex(speedIndex + 1);
      if (speedNextIndex === speed.length - 1) {
        setSpeedNextIndex(0);
      } else {
        setSpeedNextIndex(speedNextIndex + 1);
      }
    }
    musicRef.current.playbackRate = speed[speedNextIndex];
    console.log(speedIndex);
    console.log(speedNextIndex + 'next');
  }

// next Track
  const nextTrack = () => {
    if(isPlay) { // 次のトラック
      // setIsPlay(false);
      isPlayFalse();
      const playingTrack = tracks[trackIndex];
      playingTrack.playing = false;
      if (trackIndex < tracks.length - 1) {
        setTrackIndex((currentIndex) => Number(currentIndex) + 1);
        const nextTrack = tracks[trackIndex + 1];
        nextTrack.playing = true;
      } else { // 最初のトラックに戻る
        setTrackIndex(0);
        const nextTrack = tracks[0];
        nextTrack.playing = true;
      }
      // setIsPlay(true);
      isPlayTrue();
    }
  };

  return (
    <>
    <div id="app" className="app">
    <div id="audio_thumb" onClick={onClickTogglePlay}>
      <img className="ep_img" src={thumbnail} width="160" height="160" alt={epiNum} />

      {isPlay? 
        (
          <i id="pause_ico" className="material-icons">pause_circle_outline</i>
        ) : (
          <i id="play_ico" className="material-icons">play_circle_outline</i>
        )
      }

    </div>
    <div id="audio_desc">
      <div className="ep-date">{date}</div>
      <div className="ep-title">
        {title}<span className="sp-nodisp"></span>
      </div>
      <div id="timebar">
        <div id="timebar-bg" onClick={onClickTime} ref={timeBar}>
          <div id="timebar-past" style={{width: musicRate + '%'}}>
            <div id="timebar-num">{musicRate + '%'}</div>
          </div>
        </div>
      </div>
      <div>
        <span id="time_disp">
        {musicTime(timePosition)}/
        {musicTime(duration)}
        </span>
        <p className="time_control_area">
          <span>
            <img 
              id="playback" 
              src="https://propo.fm/image/rewind.png" 
              width="23" 
              alt="rewind" 
              onClick={onClickBack}
            />
          </span>
          <span>
            <img 
              id="skip" 
              src="https://propo.fm/image/skip.png" 
              width="23" 
              alt="skip"
              onClick={onClickSkip}
            />
          </span>
          <span id="speed_ctrl" onClick={onClickChangeSpeed}>{speed[speedIndex].toFixed(1)}x</span>
        </p>
      </div>
    </div>
    </div>


  </>

  );
}
