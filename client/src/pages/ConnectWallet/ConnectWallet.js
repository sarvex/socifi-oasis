import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import globalContext from './../../context/global/globalContext'
import socketContext from '../../context/websocket/socketContext'
import { CS_FETCH_LOBBY_INFO } from '../../pokergame/actions'

const ConnectWallet = () => {
  const { setWalletAddress, setChipsAmount } = useContext(globalContext)
  const { socket } = useContext(socketContext)
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery()

  useEffect(() => {
    const walletAddress = query.get('walletAddress')
    const gameId = query.get('gameId')
    const username = query.get('username')

    console.log('ConnectWallet Mount:', {
      socketStatus: socket?.connected,
      walletAddress,
      gameId,
      username
    })

    if (!socket) {
      setError('Socket not initialized')
      return
    }

    if (!socket.connected) {
      setError('Socket not connected')
      return
    }

    if (!(walletAddress && gameId && username)) {
      setError('Missing required parameters')
      navigate('/')
      return
    }

    setWalletAddress(walletAddress)
    socket.emit(CS_FETCH_LOBBY_INFO, {
      walletAddress,
      socketId: socket.id,
      gameId,
      username
    })

    // Add listener for lobby info response
    socket.on('SC_RECEIVE_LOBBY_INFO', (data) => {
      console.log('Received lobby info:', data)
      navigate('/play')
    })

    return () => {
      socket.off('SC_RECEIVE_LOBBY_INFO')
    }
  }, [socket, socket?.connected])

  if (error) {
    return <div>Error: {error}</div>
  }

  return <div>Loading... Socket Status: {socket?.connected ? 'Connected' : 'Disconnected'}</div>
}

export default ConnectWallet
