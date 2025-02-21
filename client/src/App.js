import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import ConnectWallet from './pages/ConnectWallet/ConnectWallet'
import Play from './pages/Play'
import Landing from './pages/Landing'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/connect" element={<ConnectWallet />} />
        <Route
          path="/play"
          element={
            <ProtectedRoute>
              <Play />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App
