import { useState, useEffect, useRef } from 'react';
import socket from '../../socket';
import ACTIONS from '../../socket/actions';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';

import ReactiveButton from 'reactive-button';
import styles from './index.css';

export default function Main() {
  const [state, setState] = useState('idle');
  const navigate = useNavigate();
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
  }, []);

  return (
    <div ref={rootNode}>
      <h1>Available Rooms</h1>

      <ul>
        {rooms.map((roomID) => (
          <li key={roomID}>
            {roomID}
            <ReactiveButton 
            onClick={() => {navigate(`/room/${roomID}`);}}
            style={{ borderRadius: '5px' }}
            rounded
            idleText={'Join Room'}
            />
          </li>
        ))}
      </ul>

      <ReactiveButton
        onClick={() => {navigate(`/room/${v4()}`)}}
        style={{ borderRadius: '5px' }}
        outline
        idleText={'Create Room'}
      />
    </div>
  );
}

