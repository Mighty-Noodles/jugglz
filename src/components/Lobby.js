import { useState, useEffect } from "react";
import { Client } from "colyseus.js";
import copy from "copy-text-to-clipboard";

import TikTakToe from './games/TikTakToe';
import Voice from './Voice';

const client = new Client('wss://jugglz-game-server.herokuapp.com');

const getUserID = () => {
  let userID = window.localStorage.getItem("jugglz_userID");

  if (!userID) {
    userID = Math.floor(Math.random()*100000000);
    window.localStorage.setItem("jugglz_userID", userID);
  }

  return userID;
}

function Lobby() {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState("");
  const [ ready, setReady ] = useState(false);
  const [ roomID, setRoomID ] = useState(null);
  const [ game, setGame ] = useState(null);
  const [ voice, setVoice ] = useState(null);

  const userID = getUserID();
  const lobbyID = window.location.pathname?.slice(1) || null;
  let intervalID;

  const checkRoom = () => fetch(`https://jugglz-api.herokuapp.com/lobby/${lobbyID}`)
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        setError("Room is expired.");
        intervalID && clearInterval(intervalID);
        return;
      }
      if (data.room.roomID) {
        intervalID && clearInterval(intervalID);
      }
      if (game !== data.room.game) {
        setGame(data.room.game);
      }
      if (roomID !== data.room.roomID) {
        setRoomID(data.room.roomID);
      }
    })
    .catch(() => setError("Connecting to room failed."));

  useEffect(() => {
    console.log({roomID, game});
    if (game && roomID) {
      return;
    }

    checkRoom();
    intervalID = setInterval(checkRoom, 5000);
  }, [game, roomID]);

  useEffect(() => {
    fetch(`https://jugglz-api.herokuapp.com/lobby/${lobbyID}`)
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          setError("Room is expired.");
        }
      })
      .catch(() => setError("Connecting to room failed."))
      .then(() => setLoading(false));
  }, []);

  const saveRoom = (roomID) => {
    fetch(`https://jugglz-api.herokuapp.com/lobby/${lobbyID}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({roomID})
    })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          setError("Room is expired.");
          return;
        }
        console.log("saveRoom", roomID);
        setRoomID(roomID);
      })
      .catch(() => setError("Connecting to room failed."))
  }

  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  if (error) {
    return (
      <h1>{error}</h1>
    );
  }

  if (lobbyID && game && ready) {
    // if (game === "tik-tak-toe") {
    return (
      <div>
        {voice && <Voice channel={voice.channel} token={voice.token} />}
        <TikTakToe
          client={client}
          roomID={roomID}
          lobbyID={lobbyID}
          onRoomIDChange={saveRoom}
          leaveRoom={() => setReady(false)}
          onVoiceChange={data => setVoice(data)}
          userID={userID}
        />
      </div>
    );
    // }
  }

  return (
    <div>
      <h1>Welcome to Lobby</h1>
      <p>For joining game confirm that you are ready.</p>
      {!ready
        ? <button className="link__button" onClick={() => setReady(true)}>I'm ready</button>
        : (
          <div>
            <button className="link__button" onClick={() => setReady(false)}>I'm not ready</button>
            <p>Waiting for opponent.</p>
          </div>
        )
      }
      <p>Need to re-invite? Send the link of this session to your opponent.</p>
      <p className="link__text">{window.location.href}</p>
      <p>
        <button className="link__button" onClick={() => copy(window.location.href)}>Copy</button>
      </p>
    </div>
  );
}

export default Lobby;
