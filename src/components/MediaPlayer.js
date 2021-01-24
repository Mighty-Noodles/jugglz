import { useEffect } from "react";

const MediaPlayer = (props) => {
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
  return null;
}

export default MediaPlayer;
