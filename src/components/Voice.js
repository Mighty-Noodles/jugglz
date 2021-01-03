import { useState, useEffect } from "react";
import AgoraRTC from 'agora-rtc-sdk-ng';

import useAgora from './useAgora';
import MediaPlayer from './MediaPlayer';

import './Voice.css';

const APPID = '9a55f53bdf084e6f941ca3659be2db61';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

function Voice({ channel, token }) {
  const [ error, setError ] = useState("");
  const [ enabled, setEnabled ] = useState(true);
  const {
    localAudioTrack, leave, join, joinState, remoteUsers
  } = useAgora(client, false);

  useEffect(() => {
    if (!channel || !token) {
      setError("Establishing voice communication failed.");
      return;
    }

    join(APPID, channel, token)
      .catch(() => setError("Connecting to voice room failed."));
  }, []);

  if (error) {
    return (
      <div className="voice">
        {error}
      </div>
    );
  }

  return (
    <div className="voice">
      <div className="players">
        <div className="player">
          You
          <span className={localAudioTrack && enabled ? "mic mic--active" : "mic"} />
        </div>
        <div className="player">
          {remoteUsers.length > 0 ? "#2" : "?"}
          <span className={!remoteUsers?.[0]?.hasAudio ? "mic" : "mic mic--active"} />
          {remoteUsers.length > 0 && <MediaPlayer audioTrack={remoteUsers[0].audioTrack}></MediaPlayer>}
        </div>
      </div>
      {localAudioTrack && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
          if(enabled) {
            localAudioTrack.stop();
            localAudioTrack.setEnabled(false);
            setEnabled(false);
          } else {
            localAudioTrack.play();
            localAudioTrack.setEnabled(true);
            setEnabled(true);
          }
        }}>
          {enabled ? "mute" : "unmute"}
        </div>
      )}
    </div>
  );
}

export default Voice;
