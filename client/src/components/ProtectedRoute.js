import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import socketContext from '../context/websocket/socketContext'
import globalContext from '../context/global/globalContext'

const ProtectedRoute = ({ children }) => {
  const { socket } = useContext(socketContext)
  const { walletAddress } = useContext(globalContext)

  if (!socket?.connected || !walletAddress) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
