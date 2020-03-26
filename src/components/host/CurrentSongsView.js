import React from "react";
import Parser from "html-react-parser";

export default function CurrentSongsView(props) {
  const max = 50;
  const format = song => {
    if (!song.title) return "";
    let str = song.title;
    if (str.length > max) str = str.substring(0, max - 3) + "...";
    return str;
  };
  return (
    <div className="currentSongView">
      <span>
        {Parser("<b>Playing:</b>&nbsp;&nbsp;" + format(props.activeSong))}
      </span>
      <span>
        {Parser("<b>Next:</b>&nbsp;&nbsp;" + format(props.otherSong))}
      </span>
    </div>
  );
}
