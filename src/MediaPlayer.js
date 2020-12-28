import React, { useRef, useEffect } from "react";

const MediaPlayer = (props) => {
  const container = useRef(null);

  // useEffect(() => {
  //   if (!container.current) return;
  //   props.videoTrack?.play(container.current);
  //   return () => {
  //     props.videoTrack?.stop();
  //   };
  // }, [container, props.videoTrack]);
  useEffect(() => {
    if (props.audioTrack) {
      props.audioTrack.play();
    }
    return () => {
      if (props.audioTrack) {
        props.audioTrack.stop();
      }
    };
  }, [props.audioTrack]);
  return (
    <div ref={container}  className="video-player"></div>
  );
}

export default MediaPlayer;
