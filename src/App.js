import { useState, useEffect } from "react";
import copy from "copy-text-to-clipboard";
import AgoraRTC from 'agora-rtc-sdk-ng';

import useAgora from './useAgora';
import MediaPlayer from './MediaPlayer';

import './App.css';

const APPID = 'ae3e67a4c6964fb1bf971c27f68a3a20';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

function App() {
  const [ micActive, setMicActive ] = useState(false);
  const [ error, setError ] = useState("");
  const [ channel, setChannel ] = useState("");
  const [ token, setToken ] = useState("");
  const {
    localAudioTrack, leave, join, joinState, remoteUsers
  } = useAgora(client, false);

  useEffect(() => {
    if (window.location.pathname.length < 5 || window.location.pathname[0] !== "/") {
      setError("Unknown room");
      return;
    }

    fetch(`https://jugglz-api.herokuapp.com/room/${window.location.pathname.slice(1)}`)
      .then(response => response.json())
      .then(data => {
        setChannel(data.room.channel);
        setToken(data.room.token);
        join(APPID, data.room.channel, data.room.token)
          .then(() => setMicActive(true));
      })
      .catch(() => setError("Connecting to room failed."))
  }, []);

  const renderContent = () => {
    if (error) {
      return <p>{error}</p>;
    }

    if (remoteUsers.length) {
      return <p className="start">Start Game</p>;
    }

    return (
      <>
        <p>Game will start once Player #2 joins the session.</p>
        <p>Need to re-invite? Send the link of this session to your opponent.</p>
        <p className="link__text">{window.location.href}</p>
        <p>
          <button className="link__button" onClick={() => copy(window.location.href)}>Copy</button>
        </p>
      </>
    );
  };

  return (
    <div className="App">
      <div>
      <h3>Game Session</h3>
        <div className="players">
          <div className="player">
            You
            <span className={!micActive ? "mic" : "mic mic--active"} />
          </div>
          {remoteUsers.map((user, index) => (
            <div className="player">
              {index + 2}
              <span className="mic mic--active" />
              <MediaPlayer audioTrack={user.audioTrack}></MediaPlayer>
            </div>
          ))}
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
