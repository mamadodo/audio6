import React from "react";
import { Link } from "react-router-dom";
import programImg from "../img/radireki_thumbnail.jpeg";

export const Top = () => {
  return (
    <>
      <Link to="radiohistory">
      <ul>
        <li className="topChannel__content__list channelItem">
          <div className="channelItem__channelLink">
            <p className="channelItem__channelLink__image"><img src={programImg} alt="ラジレキ～学び直し！日本史総復習編～" /></p>
            <p className="channelItem__channelLink__detail">
              このPodcast番組は、本体のラジレキとは別に日本史を時系列的に学ぶサブチャンネルです。このサブチャンネルの各エピソードは、概要、本編、おさらい、次回予告という４つのパートで構成されています。関連エピソードの詳細は、このサブチャンネルの各エピソードのページや、日本史総復習編noteなどに纏めてあります。各エピソードを聞いて、より興味をもったら、メインチャンネルのラジレキの関連エピソードもぜひ聞いてください！
            </p>
          </div>
        </li>
      </ul>
      </Link>
    </>
  );

};
