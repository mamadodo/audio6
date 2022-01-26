import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import axios from "axios";

import episode1 from "../audio/20210806_102244_222_radiohistory_ep0544.mp3";
import episode2 from "../audio/20210430_113621_533_radiohistory_ep0518.mp3";
import episode3 from "../audio/20210424_105237_279_radiohistory_ep0517.mp3";
import episode4 from "../audio/20210424_105226_180_radiohistory_ep0516.mp3";
import episodeImg from "../img/radireki_thumbnail.jpeg";

export const ApiGetEpisodes = () => {
  const dispatch = useDispatch();
  const getEpisodes = useSelector((state) => state.getEpisodes);
  console.log("ApiGetEpisodes通過");
  
  useEffect(() => {
    const getEpisodes = async () => {
      const res = await fetch('https://api.json-generator.com/templates/I5NfzXC17m5f/data?access_token=6a76lvuqp3cwnx944w7p5w2e1mv7v7puos3rn15p');

      const data = await res.json();
      dispatch({
        type: 'GET_POST_DATA',
        payload: data,
      });
    };
    getEpisodes();
  }, [dispatch]);

  for (let i = 0; i < getEpisodes.length; i++) {
    const obj = getEpisodes[i];
    obj.thumbnail = episodeImg;
    if (obj.epiNum === "epi544") {
      obj.src = episode1;
    } else if (obj.epiNum === "epi518") {
      obj.src = episode2;
    } else if (obj.epiNum === "epi517") {
      obj.src = episode3;
    } else if (obj.epiNum === "epi516") {
      obj.src = episode4;
    }
  }
    
    
  console.log(getEpisodes);
  return {getEpisodes};
}
