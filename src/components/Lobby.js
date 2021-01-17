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
      <div className="background h-screen w-screen text-white flex items-center justify-center flex-col bg-gray-900">
        <img src="logo.svg" className="h-16"/>
      </div>
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
    <div className="background h-screen w-screen text-white flex items-center justify-center flex-col bg-gray-900">
      <img src="logo-full.svg" className="h-8 mb-8"/>
      <h1 className="text-2xl font-semibold">Welcome to Lobby</h1>
      <p className="mt-1">For joining game confirm that you are ready.</p>
      {!ready
        ? <button className="bg-indigo-600 p-2 w-44 rounded-md mt-8 mb-28 transition duration-100 hover:bg-indigo-700" onClick={() => setReady(true)}>I'm ready</button>
        : (
          <div>
            <button onClick={() => setReady(false)}>I'm not ready</button>
            <p>Waiting for opponent.</p>
          </div>
        )
      }
      <p className="text-sm font-light">Need to re-invite? Send the link of this session to your opponent.</p>
      <div className="flex items-center mt-4 bg-gray-800 text-gray-200 p-2 rounded-lg">
        <p className="text-sm font-semibold">{window.location.href}</p>
        <button onClick={() => copy(window.location.href)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Lobby;
