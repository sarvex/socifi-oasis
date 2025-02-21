import React, { useState, useEffect, useContext } from 'react'
import SocketContext from './socketContext'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import {
  CS_DISCONNECT,
  CS_FETCH_LOBBY_INFO,
  SC_PLAYERS_UPDATED,
  SC_RECEIVE_LOBBY_INFO,
  SC_TABLES_UPDATED,
} from '../../pokergame/actions'
import globalContext from '../global/globalContext'
import config from '../../clientConfig'

const WebSocketProvider = ({ children }) => {
  const { setTables, setPlayers, setChipsAmount } = useContext(globalContext)
  const navigate = useNavigate()

  const [socket, setSocket] = useState(null)
  const [socketId, setSocketId] = useState(null)

  useEffect(() => {
    window.addEventListener('beforeunload', cleanUp)
    window.addEventListener('beforeclose', cleanUp)
    return () => cleanUp()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
      console.log('socket context')
      const webSocket = socket || connect()

      return () => cleanUp()
    // eslint-disable-next-line
  }, [])

  function cleanUp() {
    window.socket && window.socket.emit(CS_DISCONNECT)
    window.socket && window.socket.close()
    setSocket(null)
    setSocketId(null)
    setPlayers(null)
    setTables(null)
  }

  function connect() {
    try {
      console.log('Attempting to connect to:', config.socketURI);

      const socket = io(config.socketURI, {
        path: '/socket.io',
        transports: ['polling', 'websocket'],
        upgrade: true,
        rememberUpgrade: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        autoConnect: true,
        forceNew: true,
        withCredentials: true
      });

      socket.on('connect', () => {
        console.log('Socket connected successfully:', socket.id);
        setSocket(socket);
        setSocketId(socket.id);
      });

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        // Try to reconnect with polling if websocket fails
        if (socket.io.opts.transports.includes('websocket')) {
          console.log('Falling back to polling transport');
          socket.io.opts.transports = ['polling'];
        }
      });

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        if (reason === 'io server disconnect') {
          // Reconnect if server initiated disconnect
          socket.connect();
        }
      });

      socket.on('reconnect', (attemptNumber) => {
        console.log('Socket reconnected after', attemptNumber, 'attempts');
      });

      socket.on('reconnect_attempt', () => {
        console.log('Attempting to reconnect...');
      });

      socket.on('reconnect_error', (error) => {
        console.error('Reconnection error:', error);
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      registerCallbacks(socket);
      window.socket = socket;
      return socket;
    } catch (error) {
      console.error('Socket connection failed:', error);
      return null;
    }
  }

  function registerCallbacks(socket) {
    socket.on('connect', () => {
      setSocket(socket)
    })

    socket.on(SC_RECEIVE_LOBBY_INFO, ({ tables, players, socketId, amount }) => {
      console.log(SC_RECEIVE_LOBBY_INFO, tables, players, socketId)
      setSocketId(socketId)
      setChipsAmount(amount)
      setTables(tables)
      setPlayers(players)
    })

    socket.on(SC_PLAYERS_UPDATED, (players) => {
      console.log(SC_PLAYERS_UPDATED, players)
      setPlayers(players)
    })

    socket.on(SC_TABLES_UPDATED, (tables) => {
      console.log(SC_TABLES_UPDATED, tables)
      setTables(tables)
    })

  }

  return (
    <SocketContext.Provider value={{ socket, socketId, cleanUp }}>
      {children}
    </SocketContext.Provider>
  )
}

export default WebSocketProvider
