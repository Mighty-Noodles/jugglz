import { useState, useEffect } from "react";
import Board from "./Board";

import "./index.css";

function TikTakToe({ roomID, lobbyID, leaveRoom, onRoomIDChange, client, onVoiceChange, userID }) {
  const [connecting, setConnecting] = useState(true);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState("");
  const [state, setState] = useState(null);

  useEffect(() => {
    if (roomID) {
      client.joinById(roomID, { lobbyID, userID }).then(r => {
        setRoom(r);
        setConnecting(false);
        console.log(r.sessionId, "joined", r.name);
      }).catch(e => {
        console.log(e);
        setConnecting(false);
        setError("Joining room failed");
      })
      return;
    }

    client.create("tic-tac-toe", { lobbyID, userID }).then(r => {
      setRoom(r);
      onRoomIDChange(r.id);
      setConnecting(false);
      console.log(r.sessionId, "joined", r.name);
    }).catch(e => {
      console.log(e);
      setConnecting(false);
      setError("Room creation failed");
    });
  }, []);

  useEffect(() => {
    if (!room) {
      return;
    }

    room.onStateChange.once((state) => {
      setState({...state});
      console.log("this is the first room state!", state, state.board.toArray());
    });

    room.onStateChange((state) => {
      setState({...state});
      console.log("the room state has been updated:", state, state.board.toArray());
    });

    room.onMessage("voice_connection", (message) => {
      console.log("voice_connection", message);
      onVoiceChange(message);
    });
  }, [room, onVoiceChange]);

  const renderContent = () => {
    if (error) {
      return <h3>{error}</h3>;
    }
    if (connecting) {
      return <h3>Connecting...</h3>;
    }
    if (!state) {
      return <h3>Loading...</h3>;
    }
    if (state.players.$items.size !== 2) {
      return <h3>Waiting for your opponent.</h3>;
    }
    if (state.winner !== undefined && state.winner === room.sessionId) {
      return (
        <div>
          <h3>You win!</h3>
          <p onClick={() => room.send("new_game")}>New Game</p>
        </div>
      );
    }
    if (state.winner !== undefined && state.winner !== room.sessionId) {
      return (
        <div>
          <h3>You lost!</h3>
          <p onClick={() => room.send("new_game")}>New Game</p>
        </div>
      );
    }
    if (state.draw) {
      return (
        <div>
          <h3>Draw!</h3>
          <p onClick={() => room.send("new_game")}>New Game</p>
        </div>
      );
    }
    return <Board onClick={(x,y) => room.send("action", {x,y})} board={state.board} />;
  }

  return (
    <div className="game">
      {renderContent()}
    </div>
  );
}

export default TikTakToe;
